import re

with open('src/website/pages/Home.jsx', 'r', encoding='utf-8') as f:
    content = f.read()

match = re.search(r'const rawHTML = "(.*?)";\n', content, re.DOTALL)
if match:
    with open('scratch_home_raw.html', 'w', encoding='utf-8') as out:
        out.write(match.group(1).encode('utf-8').decode('unicode_escape'))
    print("Extracted successfully.")
else:
    print("Regex failed.")
