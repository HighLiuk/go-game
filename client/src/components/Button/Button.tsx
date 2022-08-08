import { FC, PropsWithChildren } from "react"

type Props = {
  action: () => void
}

const Button: FC<PropsWithChildren<Props>> = ({ action, children }) => {
  return (
    <button
      className="duration-400 fixed top-8 left-16 rounded border-2 bg-blue-600 px-4 py-1 text-lg font-semibold uppercase text-blue-50 transition hover:-rotate-6 hover:scale-110 hover:border-blue-600 hover:bg-blue-50 hover:text-blue-600"
      onClick={action}
    >
      {children}
    </button>
  )
}

export default Button
