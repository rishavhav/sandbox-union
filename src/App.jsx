import { useState } from "react"
import GameRules from "./components/GameRules"
import WrestlerManager from "./components/WrestlerManager"

function App() {
  return (
    <div className="app-background">
      <h1 className="text-center mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white pt-6">SandBox-Union Wrestling Tournament</h1>
      <hr className="my-12 h-px border-t-0 bg-transparent bg-gradient-to-r from-transparent via-neutral-500 to-transparent opacity-25 dark:opacity-100" />
      <GameRules />
      <WrestlerManager />
    </div>
  )
}

export default App
