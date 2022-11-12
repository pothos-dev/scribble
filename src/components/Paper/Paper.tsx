import { PaperGrid } from "~/components/Paper/PaperGrid"
import { Shape } from "~/components/Paper/Shape"
import { useTouchInteraction } from "~/hooks/useTouchInteraction"
import { useShapesManager } from "~/state/ShapesManager"

export function Paper({
  width = 210,
  height = 297,
}: {
  width?: number
  height?: number
}) {
  const shapes = useShapesManager(s => s.shapes)

  return (
    <svg
      width={`${width}mm`}
      height={`${height}mm`}
      viewBox={`0 0 ${width} ${height}`}
      className="bg-slate-100 shadow-lg cursor-crosshair touch-none"
      {...useTouchInteraction()}
    >
      <g className="pointer-events-none">
        <PaperGrid width={width} height={height} />

        {shapes.map((shape, i) => (
          <Shape key={i} shape={shape} />
        ))}
      </g>
    </svg>
  )
}
