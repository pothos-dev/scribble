import { useHookstate } from "@hookstate/core"
import { ColorSelect } from "~/components/Header/ColorSelect"
import { HeaderButton } from "~/components/Header/HeaderButton"
import { Color, ColorSelectMode } from "~/stores"

export function ColorButton() {
  const active = useHookstate(ColorSelectMode).get()
  const color = useHookstate(Color).get()

  function onClick() {
    if (active) {
      ColorSelectMode.set(false)
    } else {
      // We must defer the mounting of the <ColorSelect/> here,
      // otherwise it will observe the same click that mounted it, and close immediately -
      // because it closes whenever it sees a click outside of itself.
      setTimeout(() => ColorSelectMode.set(true), 1)
    }
  }

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
