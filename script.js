// QWERTY Adjacency Map
const keyboardNeighbors = {
    'q': '12wa', 'w': 'qase32', 'e': 'wsdr43', 'r': 'edft54', 't': 'rfgy65', 'y': 'tghu76', 'u': 'yhji87', 'i': 'ujko98', 'o': 'iklp09', 'p': 'ol[-0',
    'a': 'qwsz', 's': 'qweadzx', 'd': 'wersfxc', 'f': 'ertdgcv', 'g': 'rtyfhvb', 'h': 'tyugjbn', 'j': 'yuihkmn', 'k': 'uiojlm,', 'l': 'iopk;.,',
    'z': 'asx', 'x': 'zsdc', 'c': 'xdfv', 'v': 'cfgb', 'b': 'vghn', 'n': 'bhjm', 'm': 'njk,',
    ' ': 'vbnm' 
};

function addTypos(text, errorRate, forceLower) {
    if (forceLower) {
        text = text.toLowerCase();
    }

    let result = "";
    let i = 0;

    while (i < text.length) {
        let char = text[i];
        
        // Roll the dice
        if (Math.random() > errorRate) {
            result += char;
            i++;
            continue;
        }

        // Determine TYPE
        let typeRoll = Math.random();
        let errorType = "";

        if (typeRoll < 0.45) { errorType = 'neighbor'; } 
        else if (typeRoll < 0.70) { errorType = 'swap'; } 
        else if (typeRoll < 0.90) { errorType = 'skip'; } 
        else { errorType = 'double'; }

        // Execute Error
        if (errorType === 'neighbor') {
            // We always look up using lowercase char, because our map is lowercase
            // but we might need to decide case for the result later? 
            // For now, neighbors return as defined in map (lowercase) which is realistic for misses.
            const lowerChar = char.toLowerCase();
            
            if (keyboardNeighbors[lowerChar]) {
                const neighbors = keyboardNeighbors[lowerChar];
                const randomNeighbor = neighbors.charAt(Math.floor(Math.random() * neighbors.length));
                result += randomNeighbor;
            } else {
                result += char; 
            }
            i++;

        } else if (errorType === 'swap') {
            if (i < text.length - 1) {
                result += text[i + 1];
                result += char;
                i += 2; 
            } else {
                result += char;
                i++;
            }

        } else if (errorType === 'skip') {
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
const forceLowerInput = document.getElementById('forceLower');

// Event Listeners
generateBtn.addEventListener('click', () => {
    const text = inputText.value;
    const rate = parseFloat(errorRateInput.value);
    const forceLower = forceLowerInput.checked;
    
    if (!text) return;

    const messyText = addTypos(text, rate, forceLower);
    outputText.value = messyText;
});

copyBtn.addEventListener('click', () => {
    outputText.select();
    document.execCommand('copy');
    
    const originalText = copyBtn.innerText;
    copyBtn.innerText = "Copied!";
    setTimeout(() => {
        copyBtn.innerText = originalText;
    }, 1500);
});
