// QWERTY Adjacency Map
const keyboardNeighbors = {
    'q': '12wa', 'w': 'qase32', 'e': 'wsdr43', 'r': 'edft54', 't': 'rfgy65', 'y': 'tghu76', 'u': 'yhji87', 'i': 'ujko98', 'o': 'iklp09', 'p': 'ol[-0',
    'a': 'qwsz', 's': 'qweadzx', 'd': 'wersfxc', 'f': 'ertdgcv', 'g': 'rtyfhvb', 'h': 'tyugjbn', 'j': 'yuihkmn', 'k': 'uiojlm,', 'l': 'iopk;.,',
    'z': 'asx', 'x': 'zsdc', 'c': 'xdfv', 'v': 'cfgb', 'b': 'vghn', 'n': 'bhjm', 'm': 'njk,',
    ' ': 'vbnm' 
};

function addTypos(text, errorRate) {
    // Force lowercase as per your workflow
    text = text.toLowerCase();
    let result = "";
    let i = 0;

    while (i < text.length) {
        let char = text[i];
        
        // Roll the dice (0.0 to 1.0)
        // If random number is greater than errorRate, no error happens.
        if (Math.random() > errorRate) {
            result += char;
            i++;
            continue;
        }

        // If we are here, an error occurs. Determine TYPE.
        // Logic: Generate random 0-1 and check cumulative weights.
        // Neighbor: 0.45 | Swap: 0.25 | Skip: 0.20 | Double: 0.10
        let typeRoll = Math.random();
        let errorType = "";

        if (typeRoll < 0.45) {
            errorType = 'neighbor';
        } else if (typeRoll < 0.70) { // 0.45 + 0.25
            errorType = 'swap';
        } else if (typeRoll < 0.90) { // 0.70 + 0.20
            errorType = 'skip';
        } else {
            errorType = 'double';
        }

        // Execute Error
        if (errorType === 'neighbor') {
            if (keyboardNeighbors[char]) {
                const neighbors = keyboardNeighbors[char];
                const randomNeighbor = neighbors.charAt(Math.floor(Math.random() * neighbors.length));
                result += randomNeighbor;
            } else {
                result += char; // No neighbor found (symbols), keep char
            }
            i++;

        } else if (errorType === 'swap') {
            if (i < text.length - 1) {
                result += text[i + 1];
                result += char;
                i += 2; // Skip next char because we pulled it forward
            } else {
                result += char;
                i++;
            }

        } else if (errorType === 'skip') {
            // Do nothing, effectively deleting the char
            i++;

        } else if (errorType === 'double') {
            result += char + char;
            i++;
        }
    }

    return result;
}

// DOM Elements
const inputText = document.getElementById('inputText');
const outputText = document.getElementById('outputText');
const generateBtn = document.getElementById('generateBtn');
const copyBtn = document.getElementById('copyBtn');
const errorRateInput = document.getElementById('errorRate');

// Event Listeners
generateBtn.addEventListener('click', () => {
    const text = inputText.value;
    const rate = parseFloat(errorRateInput.value);
    
    if (!text) return;

    const messyText = addTypos(text, rate);
    outputText.value = messyText;
});

copyBtn.addEventListener('click', () => {
    outputText.select();
    document.execCommand('copy');
    
    // visual feedback
    const originalText = copyBtn.innerText;
    copyBtn.innerText = "Copied!";
    setTimeout(() => {
        copyBtn.innerText = originalText;
    }, 1500);
});
