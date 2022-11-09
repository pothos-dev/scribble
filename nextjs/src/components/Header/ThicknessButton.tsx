import { HeaderButton } from "~/components/Header/HeaderButton"
import { PolyLine } from "~/components/Paper/PolyLine"
import { useSettings } from "~/atoms"

export function ThicknessButton({ thickness }: { thickness: number }) {
  const activeThickness = useSettings(s => s.thickness)
  const setThickness = useSettings(s => s.setThickness)

  return (
    <HeaderButton
      active={thickness == activeThickness}
      onClick={() => setThickness(thickness)}
    >
      <svg className="w-full h-full" viewBox="0 0 100 100">
        <PolyLine
          thickness={thickness * 2}
          color="white"
          points={[
            [10, 10],
            [75, 25],
            [25, 50],
            [75, 90],
          ]}
        />
      </svg>
    </HeaderButton>
  )
}
