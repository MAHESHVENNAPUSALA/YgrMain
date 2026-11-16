with open(r"D:\YgrMain\YgrMain\frontend\src\App.jsx", "r", encoding="utf-8") as f:
    text = f.read()

# Add import
target_import = "const JoiningLetters = lazy(() => import('./hrm/pages/JoiningLetters'));"
replacement_import = "const JoiningLetters = lazy(() => import('./hrm/pages/JoiningLetters'));\nconst RelievingLetters = lazy(() => import('./hrm/pages/RelievingLetters'));"

if target_import in text:
    text = text.replace(target_import, replacement_import)
    print("Added RelievingLetters import to App.jsx")
else:
    print("WARNING: target_import not found in App.jsx!")

# Add route
target_route = '<Route path="joining-letters" element={<JoiningLetters />} />'
replacement_route = '<Route path="joining-letters" element={<JoiningLetters />} />\n              <Route path="relieving-letters" element={<RelievingLetters />} />'

if target_route in text:
    text = text.replace(target_route, replacement_route)
    print("Added /relieving-letters route to App.jsx")
else:
    print("WARNING: target_route not found in App.jsx!")

with open(r"D:\YgrMain\YgrMain\frontend\src\App.jsx", "w", encoding="utf-8") as f:
    f.write(text)

print("Saved App.jsx")

