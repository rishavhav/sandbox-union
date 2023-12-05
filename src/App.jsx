import { useState } from "react"

import WrestlerManager from "./components/WrestlerManager"

function App() {
  return (
    <div className="app-background">
      <h1 class="mb-6 text-3xl font-bold text-center drop-shadow-lg bg-slate-400 py-4 ">SandBox-Union Wrestling Tournament</h1>
      <WrestlerManager />
    </div>
  )
}

export default App
