import { last, range } from "lodash"
import { hsl } from "color"
import { useEffect } from "react"
import { Color, ColorSelectMode } from "~/stores"
import { useHookstate } from "@hookstate/core"
import classNames from "classnames"

const colorCols: string[][] = []

colorCols.push([])
for (const lightness of range(0, 100, 20)) {
  last(colorCols)!.push(hsl(0, 0, lightness).hex())
}

for (const hue of range(0, 360, 36)) {
  colorCols.push([])
  for (const lightness of range(20, 90, 15)) {
    last(colorCols)!.push(hsl(hue, 100, lightness).hex())
  }
}

export function ColorSelect() {
  useEffect(() => {
    function onClick() {
      ColorSelectMode.set(false)
    }
    document.addEventListener("click", onClick)
    return () => document.removeEventListener("click", onClick)
  }, [])

  const activeColor = useHookstate(Color).get()

  return (
    <div className="absolute top-2 -left-40 bg-slate-900 rounded flex flex-row p-2">
      {colorCols.map((col, colIndex) => (
        <div key={colIndex} className="flex flex-col">
          {col.map(color => (
            <button
              key={color}
              className={classNames(
                "w-8 h-8 rounded-full m-1 border-2 border-transparent",
                color === activeColor && "border-slate-300"
              )}
              style={{ backgroundColor: color }}
              onClick={() => Color.set(color)}
            />
          ))}
        </div>
      ))}
    </div>
  )
}
