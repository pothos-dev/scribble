import { ColorButton } from "~/components/Header/ColorButton"
import { PdfExportButton } from "~/components/Header/PdfExportButton"
import { ThicknessButton } from "~/components/Header/ThicknessButton"
import { PenToolButton, SelectToolButton } from "~/components/Header/ToolButton"

export function Header() {
  return (
    <header className="bg-slate-900 text-white shadow-lg items-center flex flex-row justify-between px-2 py-1">
      <div>
        <h1>Scribble</h1>
      </div>

      <div className="flex flex-row space-x-1">
        <ColorButton />

        <div className="w-1" />

        {[0.25, 0.5, 1, 2].map(thickness => (
          <ThicknessButton key={thickness} thickness={thickness} />
        ))}

        <div className="w-1" />

        <PenToolButton />
        <SelectToolButton />
      </div>

      <div>
        <PdfExportButton />
      </div>
    </header>
  )
}
