import { Shapes } from '$stores'
import jsPDF from 'jspdf'
import { get } from 'svelte/store'

export async function downloadAsPdf() {
  const doc = new jsPDF({})

  get(Shapes).forEach(shape => {
    doc.moveTo(shape.points[0][0], shape.points[0][1])
    shape.points.forEach(point => {
      doc.lineTo(point[0], point[1])
    })
    doc.stroke()
  })

  // save the created pdf
  doc.save('export.pdf')
}
