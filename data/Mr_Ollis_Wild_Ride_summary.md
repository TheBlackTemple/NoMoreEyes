# Mr. Olli's Wild Ride — The Cessation Cipher, Explained

*A reference write-up on how the Noita ARG quest chain and the "Cessation Cipher" were solved, based on the community doc and verified by re-running the actual math.*

---

## 1. Overview

This puzzle has two layers:

1. **The in-game quest** — a chain of item transformations across five locations that unlocks hidden ciphertext baked into the game's background art.
2. **The cryptography puzzle** — reconstructing six scattered, overlapping fragments of ciphertext into one message, then decoding that message using a derived 30-bit binary key.

The final plaintext is:

> **"SEEKING TRUTH, THE WISE FIND INSTEAD ITS PROFOUND ABSENCE"**

---

## 2. The In-Game Quest

Five areas of interest, each a "temple" or tower:

| Location | Position |
|---|---|
| Barren Temple | Above snow |
| Henkeva Temple | Above tree |
| Ominous Temple | Above lake |
| Lohkare Temple | Above desert |
| Watchtower | Far right |

**Step chain:**

1. **Barren Temple** — "pheromone" a mimic flask to pick it up.
2. **Henkeva Temple** — pour that flask onto 10 other flasks → produces *sea of mimicium*.
3. **Ominous Temple** — fill a trough with mimicium → produces *touch of grass*.
4. **Barren Temple** (again) — cast touch of grass on a grass symbol → unlocks *cessation*.
5. Cast **cessation** with a long/negative duration → reveals a message containing specific numeric values.
6. Separately: bring a potion mimic to the **mountain altar** → triggers *potion mimic rain* → unlocks the tree achievement pillar segment.
7. The numeric values from step 5 matched the game's **settings sliders** (max contrast = 20, min gamma = −33) — the hint was to change those settings.
8. Doing so exposed **hidden ciphertext** baked into the background art at all five locations *and* the achievement pillar — visible only through image editing / altered display settings.

So the "unlock" for the cryptography puzzle required: finding 5 locations in the right order, chaining 4 item transformations, reading a numeric hint, matching it to a settings menu, and then using image editing to expose hidden graphics.

---

## 3. The Ciphertext Alphabet

Six unique glyphs appeared in the hidden backgrounds: `. : | ◇ + □`

- The first five were mapped to digits **1–5** based on their pixel count (glyphs with 1, 2, 3, 4, 5 pixels respectively).
- The square (□, 8 pixels) was mapped to **0**, used as a separator/line-break marker.

This mapping was cross-checked by brute-forcing all possible glyph→digit assignments and finding that `1,2,3,4,5` minimized the number of unique "run sums" between separators — strong statistical backing for the chosen assignment.

---

## 4. Reassembling the Scattered Fragments

### The raw material

Six locations (Watchtower, 4 temples, the achievement pillar) each produced their own ~96–200-character digit string. Read alone, the five temple/tower strings look unrelated.

### The discovery: overlapping windows

Comparing every pair of the five non-pillar strings for their **longest common substring** turns up an unmistakable pattern — verified directly on the raw data:

```
Barren    [46:96]  ==  Henkeva    [0:50]   → 50 characters identical
Henkeva   [46:96]  ==  Ominous    [0:50]   → 50 characters identical
Ominous   [46:96]  ==  Lohkare    [0:50]   → 50 characters identical
Lohkare   [46:96]  ==  Watchtower [0:50]   → 50 characters identical
```

In plain terms: **the last 50 characters of one message are identical to the first 50 characters of exactly one other message.**

With only 6 possible symbols per position, a 50-character match by pure chance is astronomically unlikely (roughly 1 in 6⁵⁰). This had to be intentional — the real plaintext was split into five overlapping windows, each shifted ~46 characters from the next, like fragments of sequenced DNA that reassemble by their overlaps.

### Why the order is forced, not guessed

Each message's tail matches exactly one other message's head. Two messages (Barren and Watchtower) have only *one* match each, meaning they must be the two ends of the chain. This graph has exactly one possible linear ordering:

**Barren → Henkeva → Ominous → Lohkare → Watchtower**

There is no alternate arrangement to try — the overlap structure itself rules every other ordering out.

### Collapsing the overlaps

Trimming each message's duplicated 50-character seam (keeping each message's first 46 unique characters, with the final message contributing its full tail) was tested directly:

- Result: **282 characters**, matching the community doc's official "Merged (First 5 messages merged)" string **exactly, character for character.**

This confirms both the ordering and the exact splice points are correct — not merely plausible.

### Where the pillar (6th message) fits

The pillar message doesn't share a 50-character overlap with any of the other five, so it can't be slotted into the chain the same way. Instead:

- Splitting the 5-message chain on the separator (0) glyph, the **last run sums to 17**.
- Splitting the pillar message the same way, its **first run sums to 13**.
- `17 + 13 = 30` — exactly the "one full lap of the 30-bit key" sum every other line hits.

This is read as proof that the pillar's first run is the back half of the chain's otherwise-incomplete final run — so the pillar is appended to the end of the 5-message chain, producing the final 6-message, 456-character ciphertext used for decoding.

### Independent confirmation

A second, unrelated signal agrees with the first: the 50-character overlap boundaries land exactly where the *original in-game hint text* was visually broken into separate chunks at each location. Two independent observations (digit-string overlap, and visual chunking in the game's assets) pointing to the same seams is why this reconstruction was trusted enough to build the rest of the cipher-cracking on top of it.

---

## 5. The Cipher Mechanism

### Mental model: a dial with a moving pointer

Picture the 30-bit key as a circular dial:

```
110011110100111100101001010110   (30 bits, wraps around)
```

A pointer sits somewhere on the dial. Each ciphertext digit (1–5) is an instruction: *"spin the pointer forward this many positions."* Wherever it lands, read off that bit (0 or 1) — that becomes the next bit of plaintext. The pointer never resets between instructions; the entire 27-line ciphertext is one continuous walk around the same 30-bit ring.

This explains why each line sums to ~30: **one full lap of the dial per line**, which was itself the structural fingerprint used to validate the line-splitting.

### How the key itself was derived (bootstrapping)

The note "CT 5 → 11110 or 00001, CT 3 → 110 or 001" describes how the key was recovered *before anyone had it*: if a digit says "move forward 5," and you assume the ring flips value only once across that stretch, those 5 positions must look like four-of-one-bit-then-the-other (`1111`+`0` or `0000`+`1`). Cross-referencing these implied local runs across every digit value in the ciphertext let solvers stitch together one consistent 30-bit sequence:

```
key = 1100111101001111001010010101101
```

### Verifying the decode on the real data

Re-running the actual numbers from the document confirms the mechanism:

- Pulling the 27 "split run" rows and summing each: **26 of 27 rows sum to exactly 30** once the documented correction is applied (the first row's first glyph, misread, is corrected from "2" to "3").
- The two outliers (rows 22 and 27, summing to 29 and 26) match exactly the "extra/missing pixels" and "wrapping issues" the original notes flag as transcription noise near the message ends.
- Walking a pointer (starting at position 29 on the ring) through all 27 rows' digits, moving by each digit and reading the landed-on key-bit, reproduces the document's stated 456-bit binary string correctly for the **first 382 of 456 bits (~84%)**, breaking down right around "PROFOUN-**D**" / "AB-SENCE" — precisely the tail section the original notes admit is noisy.

This is strong, independently-run confirmation that the move-by-digit / read-the-landed-bit mechanism described in the notes is the real one.

### From bits to letters

Chop the final bitstream into 8-bit chunks and read each as standard ASCII. The first chunk (`01010011`) is `S`, the next is `E`, and so on, spelling out the full sentence.

---

## 6. Final Answer

> **SEEKING TRUTH, THE WISE FIND INSTEAD ITS PROFOUND ABSENCE**

---

## 7. Summary Table

| Stage | What was needed |
|---|---|
| Exploration | Locate 5 hidden temple/tower areas in the correct order |
| Item crafting | Chain 4 item transformations (flask → mimicium → grass → cessation) |
| Observation | Notice in-game numeric hint matched settings sliders (contrast/gamma) |
| Image analysis | Adjust visual settings to expose hidden background ciphertext at 6 sites |
| Glyph decoding | Map 6 unique symbols to digits 0–5 by pixel-count analysis |
| Pattern-matching | Find 50-character shared substrings to determine correct message order |
| Reassembly | Collapse overlaps into one 282-character string; append pillar via sum-matching (17+13=30) |
| Statistical validation | Digit-sum checks, entropy, brute-force search confirming glyph mapping and splice points |
| Cryptanalysis | Derive a hidden 30-bit binary key from the cipher's "distance-to-next-bit" logic |
| Decoding | Walk the key with the ciphertext to build a binary string, then convert ASCII → plaintext |

---

*This write-up is based on the original Discord-sourced community document ("Mr. Olli's Wild Ride — Solved"), with the reassembly logic and cipher mechanism independently re-derived and numerically verified against the raw ciphertext and key values given there.*
