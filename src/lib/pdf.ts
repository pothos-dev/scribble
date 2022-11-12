import type { Shape } from "~/types"
import jsPDF from "jspdf"
import { range } from "lodash"
import { shapesManager } from "~/state/ShapesManager"

export async function downloadAsPdf() {
  const pdf = new jsPDF({})

  drawGrid(pdf)

  shapesManager().shapes.forEach(shape => {
    drawShape(pdf, shape)
  })

  window.open(pdf.output("bloburl"))
}

function drawGrid(pdf: jsPDF) {
  const width = pdf.internal.pageSize.getWidth()
  const height = pdf.internal.pageSize.getHeight()

  const squareSize = 7.5
  const ml = 7.5
  const mr = 7.5
  const mt = 12
  const mb = 7.5

  pdf.setDrawColor("#ddd")
  pdf.setLineWidth(0.2)

  for (const x of range(ml, width - mr - squareSize, squareSize)) {
    for (const y of range(mt, height - mb - squareSize, squareSize)) {
      pdf.rect(x, y, squareSize, squareSize).stroke()
    }
  }
}

function drawShape(pdf: jsPDF, shape: Shape) {
  if ("points" in shape) {
    pdf.moveTo(shape.points[0][0], shape.points[0][1])
    shape.points.forEach(point => {
      pdf.lineTo(point[0], point[1])
    })
    pdf.setDrawColor(shape.color)
    pdf.setLineWidth(shape.thickness)
    pdf.stroke()
  }
}
