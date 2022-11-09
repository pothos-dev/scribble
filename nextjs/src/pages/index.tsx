import { Header } from "~/components/Header/Header"
import { Paper } from "~/components/Paper/Paper"
import { useScrollSync } from "~/hooks/useScrollSync"

export default function IndexPage() {
  const { ref } = useScrollSync()

  return (
    <div className="w-screen h-screen flex flex-col bg-slate-700 overflow-hidden">
      <Header />
      <div className="mx-auto overflow-y-scroll pr-2 my-2" ref={ref}>
        <Paper />
      </div>
    </div>
  )
}
