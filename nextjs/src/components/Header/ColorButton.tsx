import { ColorSelect } from "~/components/Header/ColorSelect"
import { HeaderButton } from "~/components/Header/HeaderButton"
import { useSettings } from "~/lib/Settings"
import { useUIState } from "~/lib/UIState"

export function ColorButton() {
  const color = useSettings(s => s.color)

  const active = useUIState(s => s.colorSelectMode)
  const onClick = useUIState(s => s.toggleColorSelectMode)

  return (
    <div>
      <HeaderButton onClick={onClick} active={active}>
        <div
          className="w-6 h-6 rounded-full"
          style={{ backgroundColor: color }}
        />
      </HeaderButton>

      <div className="absolute">{active && <ColorSelect />}</div>
    </div>
  )
}
