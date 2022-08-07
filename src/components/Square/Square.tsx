import { FC } from "react"
import useGameStore from "../../store/game"
import { cn } from "../../utils"
import { Stone } from "../Stone"

type Props = {
  x: number
  y: number
}

const Square: FC<Props> = ({ x, y }) => {
  const { isBlackTurn, move, space } = useGameStore()
  const color = space(x, y)

  function placeStone() {
    const color = isBlackTurn ? "black" : "white"

    try {
      move(x, y, color)
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <>
      {!color ? (
        <div
          className={cn([
            "absolute aspect-square w-[10%] -translate-x-1/2 -translate-y-1/2 cursor-pointer rounded-full opacity-30",
            isBlackTurn ? "hover:bg-black" : "hover:bg-white",
          ])}
          style={{
            top: `${12.5 * y}%`,
            left: `${12.5 * x}%`,
          }}
          onClick={placeStone}
        ></div>
      ) : (
        <Stone color={color} x={x} y={y} />
      )}
    </>
  )
}

export default Square
