import React, { useState, useEffect } from "react"
import WrestlerCountSelector from "./WrestlerCountSelector"
import WrestlerForm from "./WrestlerForm"
import { Wrestler, runTournament } from "../tournament"

function WrestlerManager() {
  const [wrestlerCount, setWrestlerCount] = useState(0)
  const [wrestlers, setWrestlers] = useState([])
  const [tournamentResults, setTournamentResults] = useState([])

  useEffect(() => {
    setWrestlers(
      Array.from({ length: wrestlerCount }, () => ({
        name: "",
        health: 100,
        moves: [],
      }))
    )
  }, [wrestlerCount])

  useEffect(() => {
    setTournamentResults([])
  }, [wrestlers])

  const handleWrestlerChange = (index, updatedWrestler) => {
    const newWrestlers = [...wrestlers]
    newWrestlers[index] = updatedWrestler
    setWrestlers(newWrestlers)
  }

  const handleSubmit = (event) => {
    let hasEmptyValue = false

    for (let i = 0; i < wrestlers.length; i++) {
      if (wrestlers[i].name === "" || wrestlers[i].health === "" || wrestlers[i].moves.length === 0 || wrestlers[i].moves[0].name === "" || wrestlers[i].moves[0].damage <= 0) {
        hasEmptyValue = true
        break
      }
    }

    if (hasEmptyValue) {
      alert("Please enter details for all wrestlers.")
      event.preventDefault()
      return
    }

    event.preventDefault()
    const wrestlerInstances = wrestlers.map((w) => new Wrestler(w.name, w.health, w.moves))
    const results = runTournament(wrestlerInstances)
    setTournamentResults(results)
  }

  return (
    <div className="text-center pb-10">
      <WrestlerCountSelector wrestlerCount={wrestlerCount} setWrestlerCount={setWrestlerCount} />

      <form onSubmit={handleSubmit}>
        {wrestlers.map((wrestler, index) => (
          <WrestlerForm key={index} wrestler={wrestler} setWrestlerData={(updatedWrestler) => handleWrestlerChange(index, updatedWrestler)} formNumber={index + 1} />
        ))}
        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-10 mb-10">
          Begin Tournament
        </button>
      </form>

      {tournamentResults.length > 0 && (
        <ol className="relative border-s border-gray-200 dark:border-gray-700">
          <h2 className="text-3xl text-green-300 my-4 underline">Tournament Results:</h2>
          {tournamentResults.map((line, index) => {
            if (line.startsWith("Match")) {
              return (
                <li className="mb-10 ms-4">
                  <strong key={index} className="text-red-800 bg-slate-300 rounded">
                    {line}
                  </strong>
                </li>
              )
            } else if (line.includes("wins the tournament!")) {
              return (
                <li className="mb-10 ms-4">
                  <strong key={index} className=" text-5xl text-white drop-shadow-lg ">
                    {line}
                  </strong>
                </li>
              )
            } else if (line.includes("wins this match!") || line.includes("advances with a bye")) {
              return (
                <li className="mb-10 ms-4">
                  <strong key={index} className=" text-2xl text-green-400 drop-shadow-lg ">
                    {line}
                  </strong>
                  <br />
                </li>
              )
            } else {
              return (
                <p className="text-white" key={index}>
                  {line}
                </p>
              )
            }
          })}
        </ol>
      )}
    </div>
  )
}

export default WrestlerManager
