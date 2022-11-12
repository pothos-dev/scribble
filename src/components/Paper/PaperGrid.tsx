import { range } from "lodash"

export function PaperGrid({
  width,
  height,
}: {
  width: number
  height: number
}) {
  const squareSize = 7.5
  const ml = 7.5
  const mr = 7.5
  const mt = 12
  const mb = 7.5

  return (
    <g>
      {range(ml, width - mr, squareSize).map(x =>
        range(mt, height - mb, squareSize).map(y => (
          <rect
            key={`${x},${y}`}
            x={x}
            y={y}
            width={squareSize}
            height={squareSize}
            stroke="#ddd"
            fill="transparent"
            strokeWidth="0.2"
          />
        ))
      )}
    </g>
  )
}
