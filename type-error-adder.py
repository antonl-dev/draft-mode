import random
import argparse
import sys
import os

def get_keyboard_neighbors():
    """
    Defines the physical layout of a US QWERTY keyboard.
    Keys map to their immediate physical neighbors.
    """
    return {
        'q': '12wa', 'w': 'qase32', 'e': 'wsdr43', 'r': 'edft54', 't': 'rfgy65', 'y': 'tghu76', 'u': 'yhji87', 'i': 'ujko98', 'o': 'iklp09', 'p': 'ol[-0',
        'a': 'qwsz', 's': 'qweadzx', 'd': 'wersfxc', 'f': 'ertdgcv', 'g': 'rtyfhvb', 'h': 'tyugjbn', 'j': 'yuihkmn', 'k': 'uiojlm,', 'l': 'iopk;.,',
        'z': 'asx', 'x': 'zsdc', 'c': 'xdfv', 'v': 'cfgb', 'b': 'vghn', 'n': 'bhjm', 'm': 'njk,',
        ' ': 'vbnm' 
    }

def realistic_typo_generator(text, error_rate):
    """
    Introduces realistic typing errors into a string based on QWERTY adjacency.
    """
    # Force lowercase to match the key map (and the aesthetic you wanted)
    text = text.lower()
    neighbors = get_keyboard_neighbors()
    
    result = []
    i = 0
    
    while i < len(text):
        char = text[i]
        
        # Roll the dice
        if random.random() > error_rate:
            result.append(char)
            i += 1
            continue
            
        # Determine error type
        # Weights: Neighbor(45%), Swap(25%), Skip(20%), Double(10%)
        error_type = random.choices(
            ['neighbor', 'swap', 'skip', 'double'], 
            weights=[0.45, 0.25, 0.20, 0.10], 
            k=1
        )[0]

        if error_type == 'neighbor':
            if char in neighbors:
                typo = random.choice(neighbors[char])
                result.append(typo)
            else:
                result.append(char)
            i += 1

        elif error_type == 'swap':
            if i < len(text) - 1:
                result.append(text[i+1])
                result.append(char)
                i += 2 
            else:
                result.append(char)
                i += 1

        elif error_type == 'skip':
            i += 1

        elif error_type == 'double':
            result.append(char)
            result.append(char)
            i += 1

    return "".join(result)

def main():
    parser = argparse.ArgumentParser(description="Add realistic 'human' typing errors to text.")
    
    group = parser.add_mutually_exclusive_group(required=True)
    group.add_argument('--text', type=str, help="The string text to process")
    group.add_argument('--file', type=str, help="Path to a text file to process")
    
    parser.add_argument('--rate', type=float, default=0.05, help="Error rate between 0.0 and 1.0 (default: 0.05)")

    args = parser.parse_args()

    input_text = ""

    # Handle Input
    if args.text:
        input_text = args.text
    elif args.file:
        if not os.path.exists(args.file):
            print(f"Error: File '{args.file}' not found.")
            sys.exit(1)
        with open(args.file, 'r', encoding='utf-8') as f:
            input_text = f.read()

    # Process
    output_text = realistic_typo_generator(input_text, args.rate)
    
    # Output
    print(output_text)

if __name__ == "__main__":
    main()
