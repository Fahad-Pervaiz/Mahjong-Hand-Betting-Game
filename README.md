<<<<<<< HEAD
# Mahjong Hand Betting Game

## Project Overview
Mahjong Hand Betting Game is a web-based mini-game where the player predicts whether the next Mahjong hand total will be higher or lower than the current one. The app includes a polished game UI, dynamic tile-value rules for honor tiles, round history tracking, and a persistent top-5 leaderboard.

## Features
- Landing page with game intro and leaderboard
- New Game flow with immediate hand initialization
- Betting actions: **Bet Higher** / **Bet Lower**
- Current hand total display
- Draw pile and discard pile counters
- Dynamic Wind/Dragon tile values (range 0–10)
- Round history with previous and next hand totals
- Game-over conditions for tile thresholds and draw-pile exhaustion
- Top-5 leaderboard persisted in localStorage

## Tech Stack
- React
- JavaScript (no TypeScript)
- Vite
- React Router
- PropTypes
- Plain CSS (theme tokens + component classes)

## Setup Instructions
```bash
# 1) Clone repository
git clone <your-repo-url>
cd <your-repo-folder>

# 2) Install dependencies
npm install

# 3) Run development server
npm run dev

# 4) Build for production
npm run build
```

## Project Structure
- `src/app` - app router and browser storage helpers
- `src/pages` - route-level screens (`LandingPage`, `GamePage`, `SummaryPage`)
- `src/components` - reusable UI components (tiles, buttons, panels, history, leaderboard)
- `src/features/game` - game config, reducer, actions, and engine logic
- `src/features/game/engine` - pure functions for deck, draw, compare, scoring, and game-over checks
- `src/styles` - global styles, theme/layout styles, and animations

## Assumptions
- 3-tile hands are used for each round
- Simplified Mahjong deck includes numbers, winds, and dragons (4 copies each tile type)
- Score model is `+1` win, `0` loss, `0` tie
- On draw-pile exhaustion, reshuffle flow follows configured limits
- Tie rounds do not change score or dynamic tile values

## Technical Approach
- Centralized gameplay state is managed with `useReducer`
- Actions drive state transitions (start game, resolve round, leaderboard updates)
- Core game rules are separated from UI in pure engine functions
- UI is composed from reusable components for tiles, controls, stats, and history
- Leaderboard and last summary persistence are handled with localStorage helpers

## Handwritten vs AI-Assisted Work
This project’s implementation, integration, debugging, and final validation were handled manually by the developer. AI was used selectively for support tasks such as brainstorming, planning, UI/content refinement, and documentation assistance. All AI-assisted suggestions were reviewed, adapted, and validated before inclusion.

## Future Improvements
- Add optional player names for leaderboard entries
- Add configurable scoring modes and additional bet types
- Add a resumable in-progress session state
- Add lightweight sound/feedback options with accessibility controls
=======
# Mahjong-Hand-Betting-Game
>>>>>>> 117be083254a4875ff1d9f7814a92472baff2511
