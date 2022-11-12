import { ReactNode } from "react"
import classNames from "classnames"

export function HeaderButton({
  active,
  onClick,
  children,
}: {
  active?: boolean
  onClick(): void
  children: ReactNode
}) {
  return (
    <button
      className={classNames(
        "flex flex-col items-center justify-center",
        "border-2 border-transparent rounded",
        "bg-slate-600 p-1 w-10 h-10",
        active && "border-slate-300"
      )}
      onClick={onClick}
    >
      {children}
    </button>
  )
}
