import create from "zustand"
import { persist } from "zustand/middleware"
import client from "../client"
import useGameStore from "./game"

interface LocalState {
  matchId: string | null
  newGame: () => Promise<void>
}

interface Data {
  matchId: string
}

const useLocalStore = create<LocalState>()(
  persist((set) => ({
    matchId: null,
    async newGame() {
      const { newGame } = useGameStore.getState()
      const { data } = await client.get<Data>("/")
      const { matchId } = data

      set({ matchId })
      newGame()
    },
  }))
)

export default useLocalStore
