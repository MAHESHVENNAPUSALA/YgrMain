with open(r"D:\YgrMain\YgrMain\Backend\hr\serializers.py", "r", encoding="utf-8") as f:
    text = f.read()

idx = text.find("class JoiningLetterSerializer")
if idx != -1:
    print("=== JoiningLetterSerializer ===")
    print(text[idx:idx+1500])
else:
    print("JoiningLetterSerializer not found in serializers.py")
    idx2 = text.find("JoiningLetter")
    print("JoiningLetter occurrences:", idx2)

