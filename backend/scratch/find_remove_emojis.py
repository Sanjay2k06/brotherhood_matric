import os
import re
import traceback

# Regex matching common emoji blocks
emoji_pattern = re.compile(
    r'[\U00010000-\U0010FFFF]|[\u2600-\u27BF]',
    re.UNICODE
)

def remove_emojis_from_file(file_path):
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        matches = emoji_pattern.findall(content)
        if matches:
            match_reprs = [repr(m) for m in set(matches)]
            # Use raw ASCII printable output to avoid console issues
            print(f"Found {len(matches)} emojis in {os.path.basename(file_path)}")
            
            cleaned_content = emoji_pattern.sub('', content)
            with open(file_path, 'w', encoding='utf-8') as f:
                f.write(cleaned_content)
            return len(matches)
    except Exception as e:
        print(f"Error processing {file_path}")
        traceback.print_exc()
    return 0

def scan_and_clean_frontend(directory):
    total_removed = 0
    for root, dirs, files in os.walk(directory):
        for file in files:
            if file.endswith(('.ts', '.tsx', '.css', '.html')):
                path = os.path.join(root, file)
                total_removed += remove_emojis_from_file(path)
    print(f"\nCompleted! Removed a total of {total_removed} emoji characters across the frontend codebase.")

if __name__ == "__main__":
    scan_and_clean_frontend(r"c:\Users\sanjay\OneDrive\Desktop\New folder\brotherhood\brotherHood\frontend\src")
