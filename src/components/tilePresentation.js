const WIND_SYMBOLS = {
  east: '東',
  south: '南',
  west: '西',
  north: '北',
}

const DRAGON_SYMBOLS = {
  red: '中',
  green: '發',
  white: '白',
}

export function getTilePresentation(tile) {
  const safeName =
    tile.name ||
    (typeof tile.displayName === 'string'
      ? tile.displayName.split(' ')[0].toLowerCase()
      : 'unknown')

  if (tile.category === 'number') {
    return {
      symbol: String(tile.rank),
      subLabel: tile.suit,
      tone: tile.suit,
      kind: 'number',
    }
  }

  if (tile.category === 'wind') {
    return {
      symbol: WIND_SYMBOLS[safeName] || safeName.charAt(0).toUpperCase(),
      subLabel: `${safeName} wind`,
      tone: 'wind',
      kind: 'honor',
    }
  }

  return {
    symbol: DRAGON_SYMBOLS[safeName] || safeName.charAt(0).toUpperCase(),
    subLabel: `${safeName} dragon`,
    tone: safeName,
    kind: 'honor',
  }
}

