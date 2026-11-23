from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import unquote, urljoin, urlsplit
from zipfile import ZipFile

ROOT = Path(__file__).resolve().parents[1]
DIST = ROOT / "docs" / ".vitepress" / "dist"
BASE = "/copilot-studio-field-guide/"
ORIGIN = "https://jinssi.github.io"


class Page(HTMLParser):
    def __init__(self, path):
        super().__init__()
        self.ids = set()
        self.links = set()
        self.feed(path.read_text(encoding="utf-8"))

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if "id" in attrs:
            self.ids.add(attrs["id"])
        for key in ("href", "src"):
            if attrs.get(key):
                self.links.add(attrs[key])
        if tag == "img" and "alt" not in attrs:
            raise ValueError(f"Missing image alt attribute: {attrs.get('src')}")


pages = {p.relative_to(DIST).as_posix(): Page(p) for p in DIST.rglob("*.html")}
if "index.html" not in pages or "three/handoff.html" not in pages:
    raise SystemExit("Build the complete course before checking the site.")
errors = []
for name, page in pages.items():
    for link in page.links:
        url = urlsplit(urljoin(ORIGIN + BASE + name, link))
        if (url.scheme, url.netloc) != ("https", "jinssi.github.io"):
            continue
        if not url.path.startswith(BASE):
            errors.append(f"{name}: escaped project site base: {link}")
            continue
        local = unquote(url.path[len(BASE):])
        if not local or local.endswith("/"):
            local += "index.html"
        if not (DIST / local).is_file():
            errors.append(f"{name}: missing {link}")
        elif url.fragment and local in pages and unquote(url.fragment) not in pages[local].ids:
            errors.append(f"{name}: missing anchor {link}")
for image in (DIST / "shots").glob("*.png"):
    if not image.read_bytes().startswith(b"\x89PNG\r\n\x1a\n"):
        errors.append(f"{image.name}: not a PNG (possibly a Git LFS pointer)")
with ZipFile(DIST / "downloads" / "lantern-workbench.zip") as kit:
    if kit.testzip() or "lantern-workbench/.gitignore" not in kit.namelist():
        errors.append("Learner kit is corrupt or missing hidden starter files.")
if errors:
    raise SystemExit("\n".join(sorted(set(errors))))
print(f"Verified {len(pages)} rendered pages, their internal links and anchors, screenshot PNGs and learner ZIP.")
