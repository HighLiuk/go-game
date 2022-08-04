import { FC } from "react"
import Square from "../Square/Square"

const nineTimes = [0, 1, 2, 3, 4, 5, 6, 7, 8]

const Squares: FC = () => {
  return (
    <>
      {nineTimes.map((x) => {
        return nineTimes.map((y) => {
          return <Square key={`${x}${y}`} x={x} y={y} />
        })
      })}
    </>
  )
}

export default Squares
