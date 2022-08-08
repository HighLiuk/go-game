import { FC } from "react"
import { Board } from "./components/Board"
import { Button } from "./components/Button"
import useGameStore from "./store/game"

const App: FC = () => {
  const { newGame } = useGameStore()

  return (
    <>
      <Button action={newGame}>New Game</Button>
      <Board />
    </>
  )
}

export default App
