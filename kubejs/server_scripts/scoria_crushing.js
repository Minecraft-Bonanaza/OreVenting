// Override Scoria crushing recipe: gunpowder at 30% chance only
// KubeJS 7 (NeoForge 1.21.1) API
ServerEvents.recipes(event => {
  event.remove({ id: 'create:crushing/scoria' })
  event.recipes.create.crushing([
    CreateItem.of('minecraft:gunpowder', 0.3)
  ], 'create:scoria').processingTime(200)
})
