# DEFRAG — BUILD SPEC v1.0

## Locked Decisions Recap (Do Not Revisit)

* **Visual system**

  * Void-black / charcoal base
  * **Single accent hue** (electric-cyan) with **intensity + phase modulation**
  * **Iridescence reserved ONLY** for:

    * user input
    * titles / PDF text
    * snap-to-form / lock moments
* **State derivation**

  * 100% engine-computed
  * No self-report
* **Board**

  * Infinite logical grid
  * Finite rendered radius with LOD
* **Identity**

  * Geometry + motion
  * No avatars
* **Primary metaphor**

  * Dance floor / coupled oscillators
* **Platform**

  * Web + iOS parity
  * iOS supports bump / proximity

---

# 1. AESTHETIC SYSTEM — RENDERING CONTRACT

### Rendering layers (bottom → top)

1. **Void**

   * Pure black background
   * Subtle noise grain (static, very low alpha)

2. **Floor grid**

   * Checkerboard lines only
   * No fill color
   * Perspective warp at distance

3. **Mandala geometry**

   * White / off-white base stroke
   * Cyan modulation via shader uniforms

4. **Interaction highlights**

   * Cyan → iridescent → cyan decay

### Shader parameters (global)

```glsl
uniform float u_coherence;     // 0..1
uniform float u_tension;       // unbounded, normalized per frame
uniform float u_velocity;      // time-derivative of coherence
uniform float u_userInput;     // 0 or 1
uniform float u_iridescence;   // 0..1 (rare)
```

**Rule:**
If `u_userInput == 0`, `u_iridescence MUST == 0`.

---

# 2. COLLECTIVE MESH — FIELD PHYSICS

### Tile model

```ts
Tile {
  id: UUID
  position: vec2   // grid coordinates
  state: SCATTER | FORMATION | MANDALA | PARKED
  coherence: float // 0..1
  tension: float
  phase: float     // oscillator phase
}
```

### Neighbor coupling (per frame)

```ts
for tile in visibleTiles:
  neighbors = getNeighbors(tile, radius=R)
  tile.phase += Σ coupling(tile, neighbor)
```

* Coupling strength decays with distance
* Parked tiles introduce **drag**, not force
* High coherence tiles stabilize neighbors

This yields:

* Clusters
* Standing waves
* Local interference
  without explicit “relationships”.

---

# 3. CAMERA SYSTEM — SPLINE-BASED COGNITIVE CONTROL

### Camera is NOT free-fly

It is **bounded by meaning**.

### Modes (continuous blending)

```ts
CameraMode {
  FLOOR        // default
  VORTEX
  AXIS
  SPIRAL_TIME
}
```

### Each mode defines:

```ts
CameraProfile {
  positionSpline
  lookAtSpline
  rollRange
  zoomRange
}
```

### Input mapping

* Pinch → zoom along spline
* Drag → move within mode’s allowed manifold
* No abrupt jumps

**Important:**
Camera transitions encode *insight*, not navigation.

---

# 4. SPIRAL TIMELINE — DATA + GEOMETRY

### Helix equation

```math
x = r(t) * cos(t)
y = r(t) * sin(t)
z = k * t
```

Where:

* `r(t)` = emotional mass
* `k` = integration velocity

### Timeline node

```ts
EventNode {
  t: float
  coherenceAtEvent
  natalContext
  metadata
}
```

### Interaction

* Push forward → future probability
* Pull back → resolved memory
* Selecting node:

  * temporarily aligns mandala phase
  * reveals context overlays (non-verbal first)

---

# 5. DAILY READ — SYNTHESIS DELIVERY

### Selection logic

* Engine identifies **highest friction vector**
* Maps to one **protocol cue** (PDF-derived)

### Presentation order

1. Mandala perturbation (felt)
2. Brief text overlay (PDF copy)
3. Dissolve

### Constraint

* One per day
* No archive
* No feed

This keeps insight **embodied**, not informational.

---

# 6. CURRICULUM ENGINE (3–7 DAY)

### Curriculum object

```ts
Curriculum {
  id
  days: DayProtocol[]
  unlocks: Capability[]
}
```

### Day protocol

```ts
DayProtocol {
  targetState
  constraints
  completionCondition
}
```

### Completion

* Achieved by **state transition**, not task list
* Ends with **Take a Bow** ritual

### Stripe gating

* Capabilities unlocked post-checkout
* No content preview clutter

---

# 7. FAMILY SYSTEM — BOWEN PHYSICS

### Family cluster

```ts
FamilyCluster {
  members: Tile[]
  generationalDepth
}
```

### Rules

* Parent-child phase coupling persists
* Historical tension creates latent drag
* One member stabilizing reduces system noise

### Visualization

* No labels
* No “roles”
* Only:

  * distance
  * tension vectors (on demand)
  * coherence bleed

---

# 8. IDENTITY & ANONYMITY — VISUAL ONLY

### Default

* No name
* No label

### Optional user marking

* Initials engraved into tile corner
* Only visible on **user tile**
* Cyan highlight only on interaction

All other users:

* Anonymous mandalas
* No persistent identifiers

---

# 9. GHOST GRID — COLLECTIVE PRESENCE

### Rendering

* Far-field spirals
* Alpha < 0.1
* No interaction unless user initiates

### Ping interaction

```ts
Ping {
  originTile
  rippleRadius
  decayTime
}
```

### Visual

* Iridescent crest
* Cyan tail
* Full decay to baseline

No response required.
No reciprocity pressure.

---

# 10. TILE INTERACTION — ANALYSIS OVERLAYS

### On select

* Tile elevates
* Surroundings dim (not disappear)

### Overlays (stacked)

1. Natal geometry (wireframe)
2. Relational vectors
3. Gift ↔ Shadow cube

### Cube interaction

* Slide = continuous deformation
* No discrete “good/bad”
* Geometry shows cost of extremes

---

# 11. SENSORY FEEDBACK — SOMATIC TRUTH

### Audio

* Generated tones tied to coherence
* No melodies
* Silence is allowed

### Haptics (iOS)

```ts
if state == SCATTER → staccato
if state == FORMATION → slow heavy pulse
if state == MANDALA → smooth low-frequency purr
```

Haptics must *never* contradict visuals.

---

# 12. CLOSURE — THE BOW (NON-OPTIONAL)

### Trigger

* State stabilizes above threshold

### Sequence

1. Prompt appears (PDF text)
2. User performs bow gesture
3. Mandala collapses → golden wave
4. Floor clears

### Reason

Prevents:

* rumination
* open loops
* emotional residue

---

# BUILD ORDER (RECOMMENDED)

### Sprint 1

* Mandala shader
* Tile coupling
* Floor rendering
* Camera FLOOR + VORTEX

### Sprint 2

* Spiral timeline
* Daily read delivery
* Ghost Grid

### Sprint 3

* Curriculum engine
* Family overlay
* Tile overlays

### Sprint 4

* iOS bump share
* Haptics
* Closure ritual polish
