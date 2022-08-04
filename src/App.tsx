import { FC } from "react"
import { Squares } from "./components/Squares"

const App: FC = () => {
  return (
    <div className="flex h-screen items-center justify-center bg-page bg-cover p-8">
      <div className="flex aspect-square w-full max-w-[75vh] items-center justify-center rounded-md border border-gray-400 border-opacity-30 bg-gradient-to-tl from-orange-200 to-orange-100 shadow-xl sm:my-32">
        <div className="flex aspect-square w-full items-center justify-center bg-board bg-cover">
          <div className="relative aspect-square w-[88.88%]">
            <Squares />
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
