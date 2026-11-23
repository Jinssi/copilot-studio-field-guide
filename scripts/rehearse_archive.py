"""Exercise the downloaded workbench in disposable Git repositories, without a tenant."""

import json
import os
from pathlib import Path
from shutil import copyfile, which
from subprocess import run
import sys
from tempfile import TemporaryDirectory
from zipfile import ZipFile

ROOT = Path(__file__).resolve().parents[1]
ARCHIVE = Path(sys.argv[1]) if len(sys.argv) > 1 else ROOT / "docs/.vitepress/dist/downloads/lantern-workbench.zip"
NPM = which("npm.cmd" if os.name == "nt" else "npm")
if not NPM:
    raise SystemExit("npm is required.")
ENV = dict(os.environ, GIT_AUTHOR_NAME="Lab verifier", GIT_COMMITTER_NAME="Lab verifier",
           GIT_AUTHOR_EMAIL="lab@example.invalid", GIT_COMMITTER_EMAIL="lab@example.invalid")
REVIEWER = Path(".github/agents/studio-reviewer.agent.md")
RECEIPT = Path(".github/agent-sources/studio-reviewer.source.json")
TRAILER = "Co-authored-by: Copilot <223556219+Copilot@users.noreply.github.com>"


def command(cwd, *args):
    result = run(args, cwd=cwd, env=ENV, capture_output=True, text=True)
    if result.returncode:
        raise RuntimeError(f"{args}: {result.stdout}\n{result.stderr}")
    return result.stdout.strip()


def commit(cwd, message):
    command(cwd, "git", "add", "-A")
    command(cwd, "git", "commit", "-m", message, "-m", TRAILER)
    return command(cwd, "git", "rev-parse", "HEAD")


def adopt(cwd, catalog, pin):
    command(cwd, "node", "tools/stage-reviewer.mjs", catalog, pin)
    (cwd / RECEIPT.parent).mkdir(parents=True, exist_ok=True)
    copyfile(cwd / "incoming" / REVIEWER.name, cwd / REVIEWER)
    copyfile(cwd / "incoming" / RECEIPT.name, cwd / RECEIPT)


def expect_pin(cwd, pin):
    actual = json.loads((cwd / RECEIPT).read_text(encoding="utf-8"))["commit"]
    if actual != pin:
        raise ValueError(f"{cwd.name} expected pin {pin}, found {actual}")


with TemporaryDirectory(prefix="lantern-rehearsal-") as tmp:
    parent = Path(tmp)
    bench, catalog, annex = (parent / n for n in ("lantern-workbench", "desk-agent-library", "lantern-annex"))
    with ZipFile(ARCHIVE) as package:
        package.extractall(parent)
    command(bench, NPM, "ci", "--ignore-scripts", "--no-audit", "--no-fund")
    command(bench, NPM, "run", "check", "--", "baseline")
    command(bench, "git", "init", "-b", "main")
    commit(bench, "Synthetic workbench baseline")
    command(bench, "git", "switch", "-c", "desk/pickup")
    topic = bench / "practice/topics/DeskPickup.mcs.yml"
    topic.write_bytes(topic.read_bytes().replace(b"North Counter", b"Map Room"))
    command(bench, NPM, "run", "check", "--", "location")
    commit(bench, "Move pickup")
    copyfile(bench / "references/DeskPickup.finished.yml", topic)
    (bench / REVIEWER.parent).mkdir(parents=True)
    for profile in (bench / "references").glob("*.agent.md"):
        copyfile(profile, bench / REVIEWER.parent / profile.name)
    for stage in ("ready", "profiles"):
        command(bench, NPM, "run", "check", "--", stage)
    commit(bench, "Review topic with project agents")
    command(bench, "git", "init", "-b", "main", catalog)
    (catalog / "agents").mkdir()
    source = catalog / "agents" / REVIEWER.name
    copyfile(bench / REVIEWER, source)
    pin1 = commit(catalog, "Catalog the reviewer")
    adopt(bench, catalog, pin1)
    commit(bench, "Pin catalog reviewer")
    command(bench, "git", "clone", "--no-hardlinks", "--branch", "desk/pickup", ".", annex)
    source.write_bytes(source.read_bytes() + b"\nEnd with a runtime evidence line.\n")
    pin2 = commit(catalog, "Add evidence instruction")
    adopt(annex, catalog, pin2)
    pilot = commit(annex, "Pilot the updated reviewer")
    expect_pin(bench, pin1)
    expect_pin(annex, pin2)
    command(annex, "git", "revert", "--no-edit", pilot)
    expect_pin(annex, pin1)
    if (annex / REVIEWER).read_bytes() != (bench / REVIEWER).read_bytes():
        raise ValueError("The reverted consumer profile differs from the original on disk.")
    if command(annex, "git", "status", "--short"):
        raise ValueError("Rollback left the pilot worktree dirty.")
print("PASS: extracted kit, all four checks, independent pins, and a byte-identical consumer rollback. No tenant called.")
