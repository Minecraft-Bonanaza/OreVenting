// Reduce vanilla ore vein SIZE by 60% (same frequency, smaller veins)
// Iron (Crimsite), Copper (Veridium), Gold (Ochrum)

WorldgenEvents.remove(event => {
  event.removeFeatureById('underground_ores', [
    'minecraft:ore_iron_upper',
    'minecraft:ore_iron_middle',
    'minecraft:ore_copper',
    'minecraft:ore_copper_large',
    'minecraft:ore_gold',
    'minecraft:ore_gold_lower'
  ])
})

WorldgenEvents.add(event => {
  // Iron upper: size 9 → 4, count stays 90
  event.addOre(ore => {
    ore.id = 'kubejs:ore_iron_upper_reduced'
    ore.biomes = '#minecraft:is_overworld'
    ore.size = 4
    ore.count = 60
    ore.squared = true
    ore.triangleHeight = {min: 80, max: 384}
    ore.addTarget('#minecraft:iron_ore_replaceables', 'minecraft:iron_ore')
    ore.addTarget('#minecraft:deepslate_ore_replaceables', 'minecraft:deepslate_iron_ore')
  })
  // Iron middle: size 9 → 4, count stays 10
  event.addOre(ore => {
    ore.id = 'kubejs:ore_iron_middle_reduced'
    ore.biomes = '#minecraft:is_overworld'
    ore.size = 4
    ore.count = 8
    ore.squared = true
    ore.triangleHeight = {min: -24, max: 56}
    ore.addTarget('#minecraft:iron_ore_replaceables', 'minecraft:iron_ore')
    ore.addTarget('#minecraft:deepslate_ore_replaceables', 'minecraft:deepslate_iron_ore')
  })

  // Copper: size 10 → 4, count stays 16
  event.addOre(ore => {
    ore.id = 'kubejs:ore_copper_reduced'
    ore.biomes = '#minecraft:is_overworld'
    ore.size = 4
    ore.count = 12
    ore.squared = true
    ore.triangleHeight = {min: -16, max: 112}
    ore.addTarget('#minecraft:stone_ore_replaceables', 'minecraft:copper_ore')
    ore.addTarget('#minecraft:deepslate_ore_replaceables', 'minecraft:deepslate_copper_ore')
  })

  // Gold: size 9 → 4, count stays 4
  event.addOre(ore => {
    ore.id = 'kubejs:ore_gold_reduced'
    ore.biomes = '#minecraft:is_overworld'
    ore.size = 4
    ore.count = 4
    ore.squared = true
    ore.triangleHeight = {min: -64, max: 32}
    ore.addTarget('#minecraft:stone_ore_replaceables', 'minecraft:gold_ore')
    ore.addTarget('#minecraft:deepslate_ore_replaceables', 'minecraft:deepslate_gold_ore')
  })
  // Gold lower: size 9 → 4, count stays ~1
  event.addOre(ore => {
    ore.id = 'kubejs:ore_gold_lower_reduced'
    ore.biomes = '#minecraft:is_overworld'
    ore.size = 4
    ore.count = [0, 1]
    ore.squared = true
    ore.uniformHeight = {min: -64, max: -48}
    ore.addTarget('#minecraft:stone_ore_replaceables', 'minecraft:gold_ore')
    ore.addTarget('#minecraft:deepslate_ore_replaceables', 'minecraft:deepslate_gold_ore')
  })
})
