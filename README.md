# Minecraft Modpack - NeoForge 1.21.1

## Target
- NeoForge 1.21.1
- Biome-dependent ore scarcity via KubeJS
- Molten Vents biome-locked via datapack
- FTB Quests progression

## Installation

### Prerequisites
- Minecraft 1.21.1 with NeoForge
- [Create](https://modrinth.com/mod/create) 6.0+
- [Create: Molten Vents](https://modrinth.com/mod/create-molten-vents) 2.1.1+
- [KubeJS](https://modrinth.com/mod/kubejs) 2101.x (for server scripts)
- [Open Loader](https://modrinth.com/mod/open-loader) (recommended) or manual copy

### Option A: Open Loader (recommended)
Copy the datapack folder into Open Loader's config directory:
```
cp -r datapack/custom_vents/ <instance>/config/openloader/data/custom_vents/
```
Datapacks load automatically on every world create and world load. No per-world setup needed.

### Option B: Per-world
Copy into an existing world's datapacks folder:
```
cp -r datapack/custom_vents/ <instance>/saves/<world>/datapacks/custom_vents/
```

### Option C: Global (1.20.2+)
Copy to the global datapacks folder (auto-included in new worlds only):
```
cp -r datapack/custom_vents/ <instance>/datapacks/custom_vents/
```

### KubeJS Scripts
Copy server scripts to your instance:
```
cp kubejs/server_scripts/* <instance>/kubejs/server_scripts/
```

### Verify
1. Load a world and run `/datapack list` — should show `[file/custom_vents]`
2. Run `/vents` in chat to see vent types and rarities
3. Generate new chunks in a vent biome to test spawning

> **Note:** Vent and ore changes only affect newly generated chunks. Already-explored areas keep their original generation.

---

## Datapack: custom_vents

Overrides Create: Molten Vents biome placement. Disables the default "all vents everywhere" modifier and replaces with biome-locked placement per vent type.

### Vent Assignment

| Category | Vent | Resource | Biomes | Rarity (chance) |
|----------|------|----------|--------|:---------------:|
| Hot/Dry | Crimsite | Iron | Desert, badlands, savanna variants | 1/250 |
| Hot/Dry | Scorchia | Quartz/Blaze | Same as above | 1/250 |
| Cold/Frozen | Scoria | Gunpowder (30%) | Snowy plains, ice spikes, frozen cliffs, glacial chasm, etc. | 1/200 |
| Mountains | Ochrum | Gold | All mountain peaks, slopes, windswept, volcanic | 1/200 |
| Ocean | Asurine | Zinc → Brass | All ocean biomes | 1/300 |
| Ocean | Veridium | Copper | All ocean biomes | 1/300 |

### World Coverage (volume-based, no double-counting)

| Category | % of Surface |
|----------|:------------:|
| Hot/Dry | 15.6% |
| Cold/Frozen | 12.8% |
| Mountains | 9.4% |
| Ocean | 38.2% |
| **Vent-free** (forest, taiga, plains, jungle, swamp) | **~24%** |

### File Structure
```
datapack/custom_vents/
├── pack.mcmeta
└── data/
    ├── molten_vents/
    │   ├── neoforge/biome_modifier/
    │   │   └── add_vents_overworld.json       ← disables original (targets empty tag)
    │   ├── tags/worldgen/biome/
    │   │   └── none.json                      ← empty biome tag
    │   └── worldgen/placed_feature/
    │       ├── crimsite_vent.json             ← chance: 250
    │       ├── scorchia_vent.json             ← chance: 250
    │       ├── scoria_vent.json               ← chance: 200
    │       ├── ochrum_vent.json               ← chance: 200
    │       ├── aquatic_asurine_vent.json      ← chance: 300
    │       ├── aquatic_veridium_vent.json     ← chance: 300
    │       ├── aquatic_crimsite_vent.json     ← chance: 250
    │       ├── aquatic_scorchia_vent.json     ← chance: 250
    │       ├── aquatic_scoria_vent.json       ← chance: 200
    │       └── aquatic_ochrum_vent.json       ← chance: 200
    ├── minecraft/
    │   └── worldgen/
    │       ├── configured_feature/            ← ore vein size overrides
    │       │   ├── ore_iron_upper.json        ← size: 4 (vanilla 9)
    │       │   ├── ore_iron_middle.json       ← size: 4 (vanilla 9)
    │       │   ├── ore_gold.json              ← size: 4 (vanilla 9)
    │       │   ├── ore_gold_lower.json        ← size: 4 (vanilla 9)
    │       │   ├── ore_copper.json            ← size: 4 (vanilla 10)
    │       │   └── ore_copper_large.json      ← size: 4 (vanilla 20)
    │       └── placed_feature/                ← ore spawn count overrides
    │           ├── ore_iron_upper.json        ← count: 60 (vanilla 90)
    │           ├── ore_copper.json            ← count: 12 (vanilla 16)
    │           └── ore_copper_large.json      ← count: 12 (vanilla 16)
    ├── create/
    │   └── worldgen/
    │       ├── configured_feature/
    │       │   └── zinc_ore.json              ← size: 6 (default 12)
    │       └── placed_feature/
    │           └── zinc_ore.json              ← count: 6 (default 8)
    └── custom_vents/
        └── neoforge/biome_modifier/
            ├── add_crimsite_vents.json        ← Hot/Dry biomes
            ├── add_scorchia_vents.json        ← Hot/Dry biomes
            ├── add_scoria_vents.json          ← Cold/Frozen biomes
            ├── add_ochrum_vents.json          ← Mountain biomes
            ├── add_asurine_vents.json         ← Ocean biomes (aquatic only)
            └── add_veridium_vents.json        ← Ocean biomes (aquatic only)
```

### How It Works
1. `add_vents_overworld.json` overrides the mod's default → targets empty `#molten_vents:none` tag → no vents from original modifier
2. Six new biome modifiers whitelist specific biomes per vent type
3. Placed_feature overrides change rarity from default (1000/690) to category-appropriate values
4. Vent structure/shape/depth unchanged (mod defaults: land Y80-100 shaft, aquatic Y20-35 shaft)

### Design Decisions
- Mountains get priority over temperature (frozen mountain = Mountains category, not Frozen)
- Ocean vents use aquatic variant only (no land vents in ocean)
- Rarity compensates for biome coverage (rare biomes get lower chance = more common within)
- No vents in forests, taigas, plains, jungles, swamps — these are "safe zones"

---

## KubeJS Scripts

### ore_reduction (datapack)
Reduces vanilla ore vein **size** and **spawn count** via configured_feature and placed_feature overrides. Pushes players toward vents for bulk resources.

| Ore | Vanilla Size | New Size | Vanilla Count | New Count |
|-----|:------------:|:--------:|:-------------:|:---------:|
| Iron (upper) | 9 | 4 | 90 | 60 |
| Iron (middle) | 9 | 4 | 10 | — |
| Copper | 10 | 4 | 16 | 12 |
| Copper (large) | 20 | 4 | 16 | 12 |
| Gold | 9 | 4 | 4 | — |
| Gold (lower) | 9 | 4 | 1 | — |
| Create Zinc | 12 | 6 | 8 | 6 |

(— = unchanged from vanilla)

### scoria_crushing.js
Overrides Create's Scoria crushing recipe:
- **Removed:** 1 flint (100%) + 1 flint (30%) + 1 gunpowder (10%)
- **New:** 1 gunpowder (30% chance)

---

## Reference Data

Extracted from mod JARs for analysis:
- `reference/molten_vents_extracted/` — worldgen JSONs, biome modifiers
- `reference/terralith_extracted/` — biome tags, multi_noise table, noise_settings
- `reference/Terralith_1.21.x_v2.5.8.jar` — source JAR
- `reference/molten_vents-1.21.1-2.1.1.jar` — source JAR

### Key Findings
- Terralith uses 1,713 multi_noise entries across 148 biomes
- Biome coverage determined by 5D parameter volume (temp × humidity × continentalness × erosion × weirdness)
- Biome patch size depends on noise frequency (not configurable without forking Terralith)
- Tectonic controls terrain shape (height/width) but not biome distribution
- World height capped at Y 320 (min -64, height 384) — cannot safely increase without breaking Terralith

---

## Releases

Releases are automated via GitHub Actions. When you push a version tag, two zips are built and attached to a GitHub Release page.

### Creating a release
```bash
git tag v1.0.0
git push origin v1.0.0
```

### What gets packaged

| Zip | Contents | Install location |
|-----|----------|-----------------|
| `OreVenting-datapack-v*.zip` | `custom_vents/` folder | `<instance>/saves/<world>/datapacks/` |
| `OreVenting-kubejs-v*.zip` | `server_scripts/` folder | `<instance>/kubejs/` |

### Versioning
- `v<major>.<minor>.<patch>`
- Major: breaking changes (new mod requirements)
- Minor: new features (new vent type, new biome)
- Patch: tuning (rarity, recipe adjustments)

---

## Mods
- Create (+ Aero, Molten Vents, Crafts & Additions, Enchantment Industry, Propulsion, Addictives, and more)
- Terralith + Tectonic (worldgen)
- The Aether
- Twilight Forest
- Mowzie's Mobs
- Alex's Mobs
- Epic Fight
- CBC (Create Big Cannons) + Military Supplement
- KubeJS (scripting)
- Spice of Life: Classic Edition
- Jaden's Nether Expansion
- YUNG's Better Nether Fortresses
- Eternal Nether
- FTB Quests
- Village Bounties
- Project MMO
- Quark
