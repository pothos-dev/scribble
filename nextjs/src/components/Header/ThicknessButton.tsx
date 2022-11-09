import { useHookstate } from "@hookstate/core"
import { HeaderButton } from "~/components/Header/HeaderButton"
import { PolyLine } from "~/components/Paper/PolyLine"
import { Thickness } from "~/stores"

export function ThicknessButton({ thickness }: { thickness: number }) {
  const _thickness = useHookstate(Thickness)

  return (
    <HeaderButton
      active={thickness == _thickness.get()}
      onClick={() => _thickness.set(thickness)}
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
