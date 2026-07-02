#!/usr/bin/env python3
"""사이트 전문 검색 인덱스 생성 → assets/search-index.js.

gen-tree.py처럼 페이지(index.html)를 훑어 <h1> 제목 + 본문 텍스트(스크립트/스타일 제거)를
window.SEARCH_INDEX = [{p, t, x}]로 저장. assets/search.js가 이를 읽어 상단 검색창 제공.
콘텐츠 수정 후 gen-tree.py와 함께 재실행할 것.
"""
import html
import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parent
SKIP_DIRS = {"assets", "figures", "data", "scripts"}

def visible_text(src: str) -> str:
    src = re.sub(r"<script\b.*?</script>", " ", src, flags=re.S | re.I)
    src = re.sub(r"<style\b.*?</style>", " ", src, flags=re.S | re.I)
    src = re.sub(r"<head\b.*?</head>", " ", src, flags=re.S | re.I)
    src = re.sub(r"<[^>]+>", " ", src)
    src = html.unescape(src)
    return re.sub(r"\s+", " ", src).strip()

pages = []
for f in sorted(ROOT.rglob("index.html")):
    rel = f.relative_to(ROOT)
    if any(part in SKIP_DIRS for part in rel.parts):
        continue
    src = f.read_text(errors="ignore")
    m = re.search(r"<h1>(.*?)</h1>", src, flags=re.S)
    title = re.sub(r"<[^>]+>", "", m.group(1)).strip() if m else str(rel)
    pages.append({"p": str(rel), "t": html.unescape(title), "x": visible_text(src)})

out = ROOT / "assets" / "search-index.js"
out.write_text("window.SEARCH_INDEX = " + json.dumps(pages, ensure_ascii=False) + ";\n")
print(f"wrote {out.relative_to(ROOT)} — {len(pages)} pages")
