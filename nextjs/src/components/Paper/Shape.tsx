import { PolyLine } from "~/components/Paper/PolyLine"
import { Shape } from "~/types"

export function Shape({ shape }: { shape: Shape }) {
  if (shape.type == "polyline") {
    return <PolyLine {...shape} />
  }

  if (shape.type == "select") {
    return (
      <rect
        x={shape.boundingRect[0][0]}
        y={shape.boundingRect[0][1]}
        width={shape.boundingRect[1][0] - shape.boundingRect[0][0]}
        height={shape.boundingRect[1][1] - shape.boundingRect[0][1]}
        fill="none"
        stroke="black"
        strokeWidth="0.2"
        strokeDasharray="2,2"
      />
    )
  }

  return null
}
