import { HeaderButton } from "~/components/Header/HeaderButton"
import { downloadAsPdf } from "~/lib/pdf"

export function PdfExportButton() {
  return <HeaderButton onClick={downloadAsPdf}>PDF</HeaderButton>
}
