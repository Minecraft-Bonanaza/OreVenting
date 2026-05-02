// /custom_vent — shows what vents spawn in your current biome
ServerEvents.basicCommand('custom_vent', event => {
  const biome = String(event.player.block.biomeId)

  const hot = ['minecraft:desert','minecraft:badlands','minecraft:eroded_badlands','minecraft:wooded_badlands','terralith:ancient_sands','terralith:bryce_canyon','terralith:desert_canyon','terralith:desert_oasis','terralith:desert_spires','terralith:granite_cliffs','terralith:lush_desert','terralith:red_oasis','terralith:sandstone_valley','terralith:savanna_badlands','terralith:white_mesa','terralith:gravel_desert','terralith:arid_highlands','terralith:brushland','terralith:fractured_savanna','terralith:hot_shrubland','terralith:warped_mesa']
  const cold = ['minecraft:snowy_plains','minecraft:ice_spikes','terralith:cold_shrubland','terralith:frozen_cliffs','terralith:glacial_chasm','terralith:skylands_winter','terralith:snowy_badlands','terralith:snowy_cherry_grove','terralith:wintry_forest','terralith:wintry_lowlands','terralith:shield_clearing','terralith:ice_marsh','terralith:alpha_islands_winter','terralith:siberian_grove','terralith:siberian_taiga','terralith:snowy_maple_forest','terralith:snowy_shield']
  const mountain = ['minecraft:stony_peaks','minecraft:jagged_peaks','minecraft:frozen_peaks','minecraft:stony_shore','minecraft:meadow','minecraft:snowy_slopes','minecraft:grove','minecraft:windswept_hills','minecraft:windswept_gravelly_hills','minecraft:windswept_forest','terralith:alpine_grove','terralith:ashen_savanna','terralith:caldera','terralith:emerald_peaks','terralith:painted_mountains','terralith:rocky_mountains','terralith:savanna_slopes','terralith:scarlet_mountains','terralith:volcanic_crater','terralith:volcanic_peaks','terralith:blooming_plateau','terralith:forested_highlands','terralith:white_cliffs','terralith:yellowstone','terralith:yosemite_cliffs','terralith:yosemite_lowlands','terralith:alpine_highlands','terralith:basalt_cliffs','terralith:haze_mountain','terralith:highlands','terralith:jungle_mountains','terralith:stony_spires','terralith:temperate_highlands','terralith:windswept_spires']
  const ocean = ['minecraft:ocean','minecraft:deep_ocean','minecraft:warm_ocean','minecraft:lukewarm_ocean','minecraft:deep_lukewarm_ocean','minecraft:cold_ocean','minecraft:deep_cold_ocean','minecraft:frozen_ocean','minecraft:deep_frozen_ocean','terralith:deep_warm_ocean','terralith:alpha_islands','terralith:gravel_beach','terralith:mirage_isles']

  const vents = []
  if (hot.includes(biome)) {
    vents.push('§6Crimsite Vent§r (1/1500)')
    vents.push('§4Scorchia Vent§r (1/2000)')
  }
  if (cold.includes(biome)) {
    vents.push('§8Scoria Vent§r (1/900)')
  }
  if (mountain.includes(biome)) {
    vents.push('§eOchrum Vent§r (1/900)')
  }
  if (ocean.includes(biome)) {
    vents.push('§bAsurine Vent§r (1/800)')
    vents.push('§2Veridium Vent§r (1/800)')
  }

  if (vents.length === 0) {
    event.player.tell('§7No vents spawn in §e' + biome)
  } else {
    event.player.tell('§aVents in §e' + biome + '§a:')
    vents.forEach(v => event.player.tell(' §8- ' + v))
  }
})
