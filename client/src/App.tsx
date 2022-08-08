import { FC } from "react"
import { Board } from "./components/Board"
import { Button } from "./components/Button"
import useLocalStore from "./store/local"

const App: FC = () => {
  const { newGame } = useLocalStore()

  return (
    <>
      <Button action={newGame}>New Game</Button>
      <Board />
    </>
  )
}

export default App
