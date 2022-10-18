import type { RequestEvent } from '@sveltejs/kit'
import PdfKit from 'pdfkit'

export async function GET({}: RequestEvent) {
  const pdf = new PdfKit({ layout: 'portrait', size: 'A4' })

  let chunks: any[] = []
  pdf.on('data', chunk => {
    chunks.push(chunk)
  })

  pdf.fontSize(25).strokeColor('black').text('Hello world!', 50, 50)
  pdf.moveTo(100, 150).lineTo(100, 250).lineTo(200, 250).fill('#FF3300')

  pdf.end()
  await new Promise<void>(resolve => {
    pdf.on('end', resolve)
  })

  return new Response(Buffer.concat(chunks), {
    status: 200,
    headers: {
      'Content-Type': 'application/pdf'
      // 'Content-Disposition': `attachment; filename=export.pdf`
    }
  })
}
