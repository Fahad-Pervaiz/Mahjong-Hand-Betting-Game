import { TILE_COPIES, createBaseTileTypes } from '../tileCatalog'

/**
 * Create a full deck of tile instances.
 * Each copy gets a stable id and copyIndex, while value is resolved at runtime.
 */
export function buildDeck() {
  const types = createBaseTileTypes()
  const deck = []
  types.forEach((type) => {
    for (let i = 0; i < TILE_COPIES; i += 1) {
      deck.push({
        id: `${type.key}-${i}`,
        key: type.key,
        name: type.name || null,
        category: type.category,
        suit: type.suit || null,
        rank: type.rank || null,
        displayName: type.displayName,
        copyIndex: i,
      })
    }
  })
  return deck
}

