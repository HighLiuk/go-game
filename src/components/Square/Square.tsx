import { FC, useState } from "react"
import { Stone } from "../Stone"

type Props = {
  x: number
  y: number
}

const Square: FC<Props> = ({ x, y }) => {
  const [isEmpty, setIsEmpty] = useState(true)

  return (
    <>
      {isEmpty ? (
        <div
          className="absolute aspect-square w-[10%] -translate-x-1/2 -translate-y-1/2 cursor-pointer rounded-full opacity-30 hover:bg-white"
          style={{
            top: `${12.5 * y}%`,
            left: `${12.5 * x}%`,
          }}
          onClick={() => setIsEmpty(false)}
        ></div>
      ) : (
        <Stone color="white" x={x} y={y} />
      )}
    </>
  )
}

export default Square
