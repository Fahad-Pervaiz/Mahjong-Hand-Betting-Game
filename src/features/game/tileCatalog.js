export const SUITS = ['bamboo', 'characters', 'dots']
export const RANKS = [1, 2, 3, 4, 5, 6, 7, 8, 9]

export const WINDS = ['east', 'south', 'west', 'north']
export const DRAGONS = ['red', 'green', 'white']

export const TILE_COPIES = 4

export function buildTileTypeKey({ category, suit, rank, name }) {
  if (category === 'number') {
    return `${suit}-${rank}`
  }
  if (category === 'wind') {
    return `${name}-wind`
  }
  if (category === 'dragon') {
    return `${name}-dragon`
  }
  return 'unknown'
}

export function createBaseTileTypes() {
  const tiles = []

  SUITS.forEach((suit) => {
    RANKS.forEach((rank) => {
      tiles.push({
        category: 'number',
        suit,
        rank,
        name: `${rank} ${suit}`,
      })
    })
  })

  WINDS.forEach((name) => {
    tiles.push({
      category: 'wind',
      name,
    })
  })

  DRAGONS.forEach((name) => {
    tiles.push({
      category: 'dragon',
      name,
    })
  })

  return tiles.map((t) => ({
    ...t,
    key: buildTileTypeKey(t),
    displayName:
      t.category === 'number'
        ? `${t.rank} ${capitalize(t.suit)}`
        : formatHonorName(t),
  }))
}

function formatHonorName(tile) {
  if (tile.category === 'wind') {
    return `${capitalize(tile.name)} Wind`
  }
  if (tile.category === 'dragon') {
    return `${capitalize(tile.name)} Dragon`
  }
  return tile.name
}

function capitalize(s) {
  return s.charAt(0).toUpperCase() + s.slice(1)
}

