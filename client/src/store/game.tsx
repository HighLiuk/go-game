import create from "zustand"
import { immer } from "zustand/middleware/immer"
import Board, { coordinate, Space } from "../services/board"

interface GameState {
  isBlackTurn: boolean
  board: Board
  move: (x: number, y: number, color: "black" | "white") => void
  space: (x: number, y: number) => "black" | "white" | undefined
}

const useGameStore = create<GameState>()(
  immer((set, get) => ({
    isBlackTurn: true,
    board: new Board(9),
    move(x, y, color) {
      set((state) => {
        state.board.move(
          coordinate(x, y),
          color === "black" ? Space.BLACK : Space.WHITE
        )
        state.isBlackTurn = !state.isBlackTurn
      })
    },
    space(x, y) {
      const color = get().board.moves.get(coordinate(x, y))

      if (color === Space.BLACK) return "black"
      if (color === Space.WHITE) return "white"
      return color
    },
  }))
)

export default useGameStore
