import { FC } from "react"
import { cn } from "../../utils"

type Props = {
  color: "black" | "white"
  x: number
  y: number
}

const Stone: FC<Props> = ({ color, x, y }) => {
  return (
    <div
      className={cn([
        "absolute aspect-square w-[10%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br shadow",
        color === "black"
          ? "from-gray-700 to-black"
          : "from-gray-50 to-gray-300",
      ])}
      style={{
        top: `${12.5 * y}%`,
        left: `${12.5 * x}%`,
      }}
    ></div>
  )
}

export default Stone
