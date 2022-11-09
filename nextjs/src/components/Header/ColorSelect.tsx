import { last, range } from "lodash"
import { hsl } from "color"
import { useEffect } from "react"
import classNames from "classnames"
import { useSettings } from "~/lib/Settings"
import { useUIState } from "~/lib/UIState"

export function ColorSelect() {
  const toggle = useUIState(s => s.toggleColorSelectMode)

  const color = useSettings(s => s.color)
  const setColor = useSettings(s => s.setColor)

  useEffect(() => {
    document.addEventListener("click", toggle)
    return () => document.removeEventListener("click", toggle)
  }, [])

  return (
    <div className="absolute top-2 -left-40 bg-slate-900 rounded flex flex-row p-2">
      {useColorCols().map((col, colIndex) => (
        <div key={colIndex} className="flex flex-col">
          {col.map(buttonColor => (
            <button
              key={buttonColor}
              className={classNames(
                "w-8 h-8 rounded-full m-1 border-2 border-transparent",
                buttonColor === color && "border-slate-300"
              )}
              style={{ backgroundColor: buttonColor }}
              onClick={() => setColor(buttonColor)}
            />
          ))}
        </div>
      ))}
    </div>
  )
}

function useColorCols() {
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

  return colorCols
}
