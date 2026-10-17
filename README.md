# INTRODUCTION

The eyes are a cryptographic puzzle in the videogame Noita. This repository is a contained effort to analyze a specific subset of findings that come after previous corpus of knowledge produced by the community. Please read the community docs if you need further information.

-The Emerald Tablet: https://docs.google.com/spreadsheets/d/1Aih_3v9BMbVI-MQQgWP51HTTplgRwXi2jRKYgyhPMao/edit?gid=0#gid=0

## SOURCE DATA

This is observed information obtained directly from the source material.


### THE MESSAGES

The eye messages are pictographical rows of eye glyphs with 5 directions: center (0), up (1), right (2), down (3), and left (4) with a datamined value (5) for linefeeds. They are originally presented as staggered triangles that start downwards, then upwards, and so on. They wrap every 26 trigrams. They are transcribed using the TD1 zigzag rectify convention to produce a meaningful set. There are a total of 9 messages (East-1..5, West-1..4) with varying lengths (99–137). See the "data" folder in this repository for the source material, and "visualizations" for the isomorphic blocks.

- They can only be seen when playing without any mods enabled (bypassable).
- The position of the messages changes based on the world seed, but not their contents.
- They showcase an 83-symbol trigram alphabet, using base-5 digits (0–4); 3 digits form a trigram.
- digit1 ∈ {0,1,2} work freely (75 combos); digit1=3 restricted to exactly 8 combos (`300–304, 310–312`); digit1=4 never occurs.
- No immediate repeat of a trigram occurs anywhere in the corpus. All 83 symbols appear at least once.
- The messages display whole repeated blocks of content (commonly referred as isomorphs) which split and rejoin at different points.
- Trigram counts: East-1: 99 · West-1: 103 · East-2: 118 · West-2: 102 · East-3: 137 · West-3: 124 · East-4: 119 · West-4: 120 · East-5: 114


### THE MAGICK RING

The magick ring is a specific symbol that shows up when important things happen. It shows up in the trailer, in boss spawns, in the earthquake spell, and in the 33 orb ending, to name a few. It can be found in the game files as animated_emitter_large.png with a green overlay, and it is available at the assets folder of this repository.

It is composed of a central symbol, a text ring, 3 rings of what can be seen as binary symbols 1 and 0, and an outer fifth text ring. The image itself has uneven properties, and the symbols themselves are not perfect renders mirrored among each other either.

**Cardinal points**: 3 o'clock is the ring's only point of genuine physical alignment. This is also mathematically forced for rings 2 and 5 (17, 32 don't divide evenly by 4, they are forced into cardinality by authored design). The full five-ring column at 3 o'clock reads `M,0,0,0,m`, case-folding to a palindrome. I chose this as a reading convention, but it is worth to note that these artifacts share a specific quadrant, the lower right side of the image.

**Physical rings**, read anchored at 3 o'clock = position 0, read clockwise:
0. `inverted ɰ` — singular center symbol. 
1. `MAGICKMAGICKMAGICKMAGICK` — 24 chars, MAGICK × 4.
2. `01111011101110111` — 17 chars.
3. `01010101010101010101` — 20 chars.
4. `000000000000000000000000`, 24 chars.
5. `m[gap]kmgickmgickmgickmgickmgickmgick` — 32 uniform content characters plus one physically real, oversized terminator feature (~1.6× an ordinary symbol). **What the gap signifies beyond its own existence and size is unknown.**


### HEART RING (heart_effect.png)

A simpler yet similar ring, with a circle divided by a cross, generating four quadrants. Around it, a ring of symbols of the same kind as the ring. Starting to read from 3 o clock, reads MCKMGICKMGICKMGICK.


### VICTORY ROOM (boss_victoryroom_visual.png)

This is a partial render of the victory room of the game. It holds the "basic win" of the game, among other symbols. It has two, large, detailed hands which are not perfect mirrors of each other. The room itself is also not perfectly mirrored. At the bottom, we see the altar. 

The altar is composed of 4 segments, forming a stack with steps. From the bottom up:
-The lower, widest base stone. Seems to have multiple staircases and markings
-The second, similar to the first, containing steps and markings
-The third seems like a ring of multiple uneven circles. There are 32 marks that seem to taper towards the ends. Half are leaning to the left, half lean to the right. 
-The fourth has a smaller staircase, inscribed with the 18[ɰ]81 in the center of it. 
-A fifth element can be considered. The player is meant to stand right on top of the altar, and sacrifice themselves to finish the game.

## ANALYSIS

These are my personal observations about the puzzle as a whole and its components. 

### THE MESSAGES

This is a puzzle designed to be solved, not a pure cryptographic system. It is a trick problem. I do not expect this to be broken by pure bruteforce without quantum computation or sheer luck. Reverse engineering a cipher method does not make it any easier to solve: we all know how SHA-512 works; doesnt make it any easier to "solve". My first instinct was to reproduce a model that would generate the trigram properties, but this might be impossible, or pointless, since we may be facing a pair of one-way transforms.

I have a hunch that the cessation cipher quest was a hint of what needs to be done. The nature of its operations remind of both the ring and the eyes. Maybe its their way of spoiling part of the solution in spirit. The game repeatedly teases the dataminer. All the data should exist inside the game boundaries. That apparently doesnt fully exclude steganography, since the information is "technically present".

Another small change of perspective was to look at this as a topographical problem. Spatial, instead of purely mathematical. There is a non trivial chance this is a set of mid-process strings. If linked to the ring, maybe we have to "keep ticking the clock forward" to produce coherent output.

I still distrust the seed based spawn mechanics. They may hide something. Even the mirroring and labeling themselves are suspect to revision. If they are dimensionally locked pairs, there may be something about that parity related to the verbs on the puzzle (rotate, shift, etc).


### THE RING

The ring is one of the few things that has not been linked to any specific quest, where other symbols have. We have a case for this being the lead we are missing.

Theban is a very well known trick for witches and wiccas to "cipher" their writings. If we consider the "theban" reference as a tease, we can assume they are hinting at the ring as being a form of transcript. It is located at the heart of the ring. We start from natural language, and we transform it until its mangled.

The green layer that defines the render of the magick circle may also hide something. It follows a perfect render instruction, yet the fact the image is not perfectly centered or mirrored may be a hint. It is a 340x344 image, where the smaller version is a square. The green layer follows G = clamp(v + (v >> 4), 0, 255), v = floor(dist) - 1.

My running theory is **that this is a transcript chart**. It has an input (either the central symbol or the MAGICK keyword), and the output (the mgick ring 5). The rings can then be considered instruction sets for how to perform the MAGICK -> mgick transformation. I include the heart ring as a secondary, reinforcing hint of its properties. It goes from MAGICK/MGICK to MCK. This can be either two different instances, or a transform that is layered as MAGICK -> mgick -> mck. There is a recurring topic of irregular, staggered treatment across the whole puzzle.


### MATHEMATICAL MODELS

If this is a process, then a compression step is real and necessary for the ring-letters artifact: dropping one letter (A) is required; tiling the full 6-letter word produces the wrong string. The *set* of dropped letters is closed; the *order* of removal is proven unrecoverable from any final-state evidence.

Observations on the center symbol: it is a single glyph, resembling a mirrored Theban symbol ɰ, visually composed of a joined 3 and 1 with rotations. The 3 is rotated 90 degrees, the 1 is rotated 180 degrees and mirrored horizontally. Both symbols are "joined at the bottoms". A horizontal mirror of the symbol can be seen scribbled at The Work altar of the game, in between 18[ɰ]81 looking symbols. Below it, uneven circles that split in halves, 16 to the left, 16 to the right. See boss_victoryroom_visual.png for reference. The center symbol itself is a 1+3, reminds you of 0111. 

The center ɰ symbol can also be seen at The Work, flipped; so can the symbols under it as they flip midway. There is something here about truth being "twisted backwards". The peaks that form when you project the unfolded image may be signaling step counts, relevant measurements, etc. See visualizations/magick_ring/full_unwrap_straight.png

We know there are necessary operations to see coherent behavior. The staggered trigram read is the clearest instance, and its not a hypothesis, it is the basis of the whole analysis. I refer to that method, posted by The_Duck1, as "TD1" for short. This hints at verbs, or types of operations that are needed to be performed. The ring also shares some of this. Same with the cessation quest.

The verbs that it hints: RESAMPLE, ROTATE, FIT, are native to circles — rotation, tiling, subsampling are the only things you can do to a loop besides cut it.
TERMINATE is categorically different: it’s a cut, the one operation that changes topology (loop → segment), not just content. The alphabet trie and branch-tree are tree-shaped, not circle-shaped. 

- Bounded enumeration with ordered (prefix) truncation 
- Near-even partition of a count across fixed slots (Ring 2)
- Item reduction (keep first, keep last M−1, MAGICK → MGICK/MCK)
- Small-magnitude cyclic permutation (ring letters, message headers)
- Dual-track alternating interleave, fixed per-track direction (the TD1 transcript method) 


#### TOY MODEL (toy_model.py)

Since I am not mathematically well versed, I got some help from the AI overlords.

The `toy_model.py` holds the function definitions referenced throughout — `bucket_assign(n,m) = [i*m//n for i in range(n)]`, `rotate(seq,shift) = seq[shift:]+seq[:shift]`, `fit(unit,container) = divmod(container,len(unit))` tiling complete copies plus a prefix-truncated remainder, and `terminate(content,marker,at)` appending a marker. **Note: `bucket_assign` is the zero-error-offset member of the Bresenham/DDA line-drawing family** — not a bespoke formula. The "error offset" that family exposes is a real, nameable free parameter, not an absence of explanation.

Given the corpus is one artifact per phenomenon, exact-formula claims are mostly underdetermined. A more defensible layer is the *type* of transformation each artifact requires, independent of which specific rule instantiates it.

- Ring 2's content-digit count (13) partitions into 4 near-equal groups, `{3,3,3,4}` — this multiset-level claim needs no rule beyond "distribute evenly," and matches the physically counted ring. Which slot gets the 4 is a separate, unresolved question.

- FIT's floor division is arithmetically forced: every non-floor rounding method against the 83-symbol alphabet target produces an invalid remainder.

- FIT structurally excludes progressive drift by construction — no stage feeds its own prior output back in.

- Ring 2 read clockwise from the anchor gives `[4,3,3,3]` directly, zero free parameters, no reversal needed — matches `bucket_assign(13,4)`'s raw order exactly.

- FIT's prefix-truncation rule makes two independent, correct, falsifiable predictions from one call (`divmod(83,5)=(16,3)`): the digit3-restriction set `{0,1,2}` (not `{2,3,4}`, which suffix-truncation predicts), and the digit1=3→digit2∈{0,1} cutoff (suffix would restrict a different pair entirely). Both match real data. This is the single strongest-typed claim in the corpus.


#### GAPS — not derived; fitted, tautological, or underdetermined

- **ROTATE's magnitude (=1) is a tautological readout in both confirmed uses**, not independent confirmation: message headers already have `231,010` at index 1–2 regardless of any rule.
- **Cardinal-alignment formula** ("phase-cycle length divides 4") is underdetermined by sample size — only 4 informative data points, too few to distinguish from cruder rules like "period ≤ 4."
- **The wrap count (N=26)** has no internal derivation, separate from the now-fully-derivable row-length mechanics around it. The numeric coincidence 26=2×13 is not privileged over chance.
- **Whether message generation carries state across row-wrap boundaries** is underdetermined by construction for one specific hypothesis (alternation parity, unfalsifiable because N=26 is even) — a broader class of per-row transforms was tested directly and found negative (flat digit1 distribution).
- **Hidden exact-match blocks**: the *pattern* of which pairs carry them, and their exact positions/lengths. What remains unexplained is the *generating mechanism* for those specific positions and lengths, and whether the multiple blocks within one pair (e.g. East-4/East-5's three) are connected to each other at all.
- **Notably absent as a type anywhere in the corpus**: carried state across a boundary, content-dependent mid-stream branching (the tree fully resolves before the first wrap), keyed/additive transforms (a ~40-combination cipher sweep found nothing), and anything beyond one-step-back self-reference. The corpus is best described as a **stateless, forward-only sequence of independently-typed local operations**, with one open exception: at the two simultaneous 3-way forks (§1, branch tree), one pair out of the three resulting messages shares additional exact-match content later on, while the third does not. For East-1/West-1 this is 2 separate blocks; for East-4/East-5 it is 3 separate blocks. Whether these blocks within a pair are one connected phenomenon or independent unrelated matches is not established — in particular, there is no basis yet for claiming the first block causes, predicts, or is otherwise connected to the second or third. This is recorded as a located, descriptive fact, not a mechanism. 
- **Whether message generation carries state across row-wrap boundaries** is underdetermined by construction for one specific hypothesis (alternation parity, unfalsifiable because N=26 is even). We observe one small isomorph crossing the wrap boundary.
- **TERMINATE as a formal pipeline stage.** Hard part: the ring 5 gap's ~1.6× size is a closed physical measurement, and `32 mod 5 = 2` forces *some* cycle-reset to occur (no gap width consistent with the measured size lets "keep tiling KMGIC" predict the correct next symbol). Soft part: that this reset is best modeled as a discrete, named `terminate()` stage with marker semantics — rather than simply "the cycle resets here, by an unspecified mechanism." The ratio measurement supports the former; nothing supports the latter beyond convenience.
- **TERMINATE's end-vs-start placement.** Physically indistinguishable on a closed loop regardless of how well the gap's existence and size are established.


### OTHER LEADS

I checked several files in case they were hiding something, just for good measure, but found nothing myself:

-background_cave_02.png
-the "eye" files in data\biome_impl\caves\*.png
-noise_triangular.png and perlin in the shaders folder

The eyes do have peculiar properties, pixelwise. Not fully explored.

Other than that, I have not found other hard linked files besides the magick ring and the heart ring in this pass. Worth checking exhaustively.

Bear in mind, you should always analyze these things with original source material. Anything compressed or distorted by web uploads may destroy the original properties. You can decompile the assets very easily. Follow the modding guide.

## DISCLAIMER
AI was used to develop scripts for analysis and bruteforce methods.
All assets belong to Nolla Games.
All content here is free to use and distribute.