import create from "zustand"
import { immer } from "zustand/middleware/immer"

interface GameState {
  isBlackTurn: boolean
  pass: () => void
}

const useGameStore = create<GameState>()(
  immer((set) => ({
    isBlackTurn: true,
    pass() {
      set((state) => {
        state.isBlackTurn = !state.isBlackTurn
      })
    },
  }))
)

export default useGameStore
