# draft-mode

**turn polished ai text into realistic, human-generated drafts.**

this tool introduces "biomechanical" typing errors into clean text.
unlike other tools that add random noise (e.g., swapping 'z' with 'm'), 
`draft-mode` simulates the physical constraints of typing on a qwerty keyboard

it is perfect for making ai-generated feedback, engineering notes, or student look authentic.

## features

- **biomechanical error logic:**
  - **fat finger (45%):** hits keys physically adjacent on a qwerty keyboard (e.g., 'r' instead of 'e').
  - **transposition (25%):** swaps sequential letters due to fast typing (e.g., "locig" vs "logic").
  - **omission (20%):** simulates weak key presses (skips letters).
  - **double tap (10%):** simulates key bounce.

- **web interface:**
  - dark/light mode (auto-detects system pref, remembers choice).
  - adjustable error percentage (0% to 100%).
  - "force lowercase" toggle for that casual chat aesthetic.
  - one-click copy to clipboard.

- **cli support:** includes a python script for command-line processing.

## live demo

**[https://antonl-dev.github.io/draft-mode]**

---

## usage (web)

1. clone the repo:
   ```bash
   git clone https://github.com/antonl-dev/draft-mode.git
   ```
2. open `index.html` in any web browser.
3. paste your text, adjust the percentage (3% is recommended for realistic typos), and click **humanize**.

---

## usage (python cli)

you can use the python script for automation or batch processing.

```bash
# basic usage (defaults to 5% error rate)
python3 type-error-adder.py --text "the simulation environment is unstable"

# specify error rate (0.0 to 1.0)
python3 type-error-adder.py --text "Debugging the controller logic" --rate 0.03

# process a text file
python3 type-error-adder.py --file my_draft.txt
```

## how it works

the algorithm iterates through the input string and rolls a die based on your `error rate`. 
if an error occurs, it selects a type based on realistic human probabilities:

1. **neighbor map:** 
	the script contains a full adjacency map of the us qwerty layout.
	it knows that 'g' is surrounded by 'r, t, y, f, h, v, b'.

2. **case handling:**
	by default, it forces the text to lowercase to simulate casual, rapid typing, 
	but this can be toggled off in the web interface.

## license

[MIT License](https://opensource.org/license/mit)
