import { Header } from "~/components/Header/Header"
import { Paper } from "~/components/Paper/Paper"
import { useScrollSync } from "~/state/ScrollState"

export default function IndexPage() {
  return (
    <div className="w-screen h-screen flex flex-col bg-slate-700 overflow-hidden">
      <Header />
      <div className="mx-auto overflow-y-scroll pr-2 my-2" {...useScrollSync()}>
        <Paper />
      </div>
    </div>
  )
}
