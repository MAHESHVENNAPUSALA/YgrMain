import os

frontend_dir = r"D:\YgrMain\YgrMain\frontend\src"

print("=== FRONTEND DIRECTORY STRUCTURE ===")
for root, dirs, files in os.walk(frontend_dir):
    rel = os.path.relpath(root, frontend_dir)
    jsx_files = [f for f in files if f.endswith(('.jsx', '.js', '.tsx', '.ts'))]
    if jsx_files:
        print(f"{rel}: {len(jsx_files)} files -> {', '.join(jsx_files[:8])}")

