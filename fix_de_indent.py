import re

file_path = r"C:/Users/Devron/Downloads/KrantosWeb/app/src/data/translations.ts"

with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Split content into before-de, de-section, and after-de
# Find where "  de: {" starts (properly indented de)
match = re.search(r'\n(  de: \{)', content)

if match:
    de_start = match.start() + 1  # +1 to skip the newline
    
    # Find the end of de object by counting braces
    brace_count = 0
    de_end = de_start
    in_string = False
    escape = False
    
    for i, c in enumerate(content[de_start:], start=de_start):
        if escape:
            escape = False
            continue
        if c == '\\':
            escape = True
            continue
        if c == "'" and not in_string:
            in_string = True
            continue
        if c == "'" and in_string:
            in_string = False
            continue
        if in_string:
            continue
            
        if c == '{':
            brace_count += 1
        elif c == '}':
            brace_count -= 1
            if brace_count == 0:
                de_end = i + 1
                break
    
    print(f"de section: {de_start} to {de_end}")
    
    # Extract the de section
    de_section = content[de_start:de_end]
    
    # Split into lines and fix indentation
    lines = de_section.split('\n')
    fixed_lines = []
    level = 1  # Start at level 1 (de is inside translations at level 1)
    
    for idx, line in enumerate(lines):
        stripped = line.strip()
        
        if not stripped:
            fixed_lines.append('')
            continue
        
        if stripped.startswith('//'):
            fixed_lines.append('  ' * (level + 1) + stripped)
            continue
        
        # Handle closing braces - decrease level first
        temp_level = level
        close_before = 0
        for ch in stripped:
            if ch == '}':
                close_before += 1
            else:
                break
        
        if close_before > 0:
            temp_level = max(1, level - close_before)
        
        # Build the fixed line with correct indentation
        # Level 1 = de object = 2 spaces
        # Level 2 = properties of de (nav, home, etc.) = 4 spaces
        # Level 3 = properties inside those = 6 spaces
        # etc.
        indent = '  ' * (temp_level + 1)  # +1 because de itself is at level 1
        fixed_lines.append(indent + stripped)
        
        # Update level after the line
        if close_before > 0:
            level = temp_level
        
        # Count braces for level adjustment
        opens = stripped.count('{')
        closes = stripped.count('}')
        level += (opens - closes)
        if level < 1:
            level = 1
    
    # Reconstruct content
    before_de = content[:de_start]
    after_de = content[de_end:]
    
    fixed_de = '\n'.join(fixed_lines)
    new_content = before_de + fixed_de + after_de
    
    with open(file_path, 'w', encoding='utf-8', newline='') as f:
        f.write(new_content)
    
    print("Fixed German section indentation (v4)")
else:
    print("Could not find properly indented de: section marker")
