import { Point } from "~/types"

export function PolyLine({
  points,
  color = "black",
  thickness = 1,
}: {
  points: Point[]
  color?: string
  thickness?: number
}) {
  return (
    <polyline
      points={points.map(([x, y]) => `${x},${y}`).join(" ")}
      stroke={color}
      fill="none"
      stroke-width={thickness}
      strokeLinejoin="round"
      strokeLinecap="round"
    />
  )
}
