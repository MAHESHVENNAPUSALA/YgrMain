with open(r"D:\YgrMain\YgrMain\Backend\hr\models.py", "r", encoding="utf-8") as f:
    text = f.read()

print("File total lines:", len(text.splitlines()))

# Find where JoiningLetter is
j_idx = text.find("class JoiningLetter")
print("JoiningLetter found at character:", j_idx)
# Find end of JoiningLetter
j_end = text.find("\nclass ", j_idx + 10)
print("Next class after JoiningLetter:", text[j_end:j_end+50] if j_end != -1 else "End of file")

