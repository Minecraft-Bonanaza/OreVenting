// Reduce vanilla ore vein SIZE by 60% (same frequency, smaller veins)
// KubeJS 7 (NeoForge 1.21.1) API

ServerEvents.worldgenRemove(event => {
  event.removeFeatureById('underground_ores', [
    'minecraft:ore_iron_upper',
    'minecraft:ore_iron_middle',
    'minecraft:ore_copper',
    'minecraft:ore_copper_large',
    'minecraft:ore_gold',
    'minecraft:ore_gold_lower'
  ])
})

ServerEvents.worldgenAdd(event => {
  event.addOre(ore => {
    ore.id = 'kubejs:ore_iron_upper_reduced'
    ore.biomes('#minecraft:is_overworld')
    ore.size(4)
    ore.count(60)
    ore.squared()
    ore.triangleHeight(80, 384)
    ore.addTarget('#minecraft:iron_ore_replaceables', 'minecraft:iron_ore')
    ore.addTarget('#minecraft:deepslate_ore_replaceables', 'minecraft:deepslate_iron_ore')
  })

  event.addOre(ore => {
    ore.id = 'kubejs:ore_iron_middle_reduced'
    ore.biomes('#minecraft:is_overworld')
    ore.size(4)
    ore.count(8)
    ore.squared()
    ore.triangleHeight(-24, 56)
    ore.addTarget('#minecraft:iron_ore_replaceables', 'minecraft:iron_ore')
    ore.addTarget('#minecraft:deepslate_ore_replaceables', 'minecraft:deepslate_iron_ore')
  })

  event.addOre(ore => {
    ore.id = 'kubejs:ore_copper_reduced'
    ore.biomes('#minecraft:is_overworld')
    ore.size(4)
    ore.count(12)
    ore.squared()
    ore.triangleHeight(-16, 112)
    ore.addTarget('#minecraft:stone_ore_replaceables', 'minecraft:copper_ore')
    ore.addTarget('#minecraft:deepslate_ore_replaceables', 'minecraft:deepslate_copper_ore')
  })

  event.addOre(ore => {
    ore.id = 'kubejs:ore_gold_reduced'
    ore.biomes('#minecraft:is_overworld')
    ore.size(4)
    ore.count(4)
    ore.squared()
    ore.triangleHeight(-64, 32)
    ore.addTarget('#minecraft:stone_ore_replaceables', 'minecraft:gold_ore')
    ore.addTarget('#minecraft:deepslate_ore_replaceables', 'minecraft:deepslate_gold_ore')
  })

  event.addOre(ore => {
    ore.id = 'kubejs:ore_gold_lower_reduced'
    ore.biomes('#minecraft:is_overworld')
    ore.size(4)
    ore.count(1)
    ore.squared()
    ore.uniformHeight(-64, -48)
    ore.addTarget('#minecraft:stone_ore_replaceables', 'minecraft:gold_ore')
    ore.addTarget('#minecraft:deepslate_ore_replaceables', 'minecraft:deepslate_gold_ore')
  })
})
