from pathlib import Path
from zipfile import ZIP_DEFLATED, ZipFile, ZipInfo

ROOT = Path(__file__).resolve().parents[1]
START = ROOT / "lab-kit" / "starter"
OUT = ROOT / "docs" / "public" / "downloads" / "lantern-workbench.zip"

# An allowlist keeps local notes, installed dependencies and tenant files out of the public kit.
starter_files = [
    ".gitignore", "README.md", "desk-policy.md", "evidence.md", "test-cards.md",
    "practice/topics/DeskPickup.mcs.yml", "tools/check.mjs", "tools/stage-reviewer.mjs",
    "package.json", "package-lock.json",
]
files = {name: START / name for name in starter_files}
for role in ("author", "reviewer"):
    profile = f"studio-{role}.agent.md"
    files[f"references/{profile}"] = ROOT / ".github" / "agents" / profile
files["references/DeskPickup.finished.yml"] = ROOT / "lab-kit" / "answers" / "DeskPickup.mcs.yml"
files["LICENSE.txt"] = ROOT / "LICENSE"
OUT.parent.mkdir(parents=True, exist_ok=True)
with ZipFile(OUT, "w") as archive:
    for name, path in sorted(files.items()):
        entry = ZipInfo(f"lantern-workbench/{name}", date_time=(2026, 1, 1, 0, 0, 0))
        entry.external_attr = 0o100644 << 16
        archive.writestr(entry, path.read_bytes(), compress_type=ZIP_DEFLATED)
print(f"Packed {len(files)} files into {OUT.name}")
