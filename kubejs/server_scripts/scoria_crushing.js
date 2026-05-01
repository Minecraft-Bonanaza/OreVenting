// Override Scoria crushing recipe: gunpowder at 30% chance only
ServerEvents.recipes(event => {
  event.remove({ id: 'create:crushing/scoria' })
  event.recipes.create.crushing([
    Item.of('minecraft:gunpowder').withChance(0.3)
  ], 'create:scoria').processingTime(200)
})
