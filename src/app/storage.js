const LEADERBOARD_KEY = 'mahjong-hand-betting-leaderboard'
const LAST_SUMMARY_KEY = 'mahjong-hand-betting-last-summary'

// Read top scores from the browser (persists between page refreshes).
export function loadLeaderboard() {
  try {
    const raw = window.localStorage.getItem(LEADERBOARD_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

// Save leaderboard after a game ends.
export function saveLeaderboard(entries) {
  try {
    window.localStorage.setItem(LEADERBOARD_KEY, JSON.stringify(entries))
  } catch {
    // ignore
  }
}

// Summary is used by SummaryPage if route state is missing.
export function loadLastSummary() {
  try {
    const raw = window.localStorage.getItem(LAST_SUMMARY_KEY)
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

export function saveLastSummary(summary) {
  try {
    window.localStorage.setItem(LAST_SUMMARY_KEY, JSON.stringify(summary))
  } catch {
    // ignore
  }
}

