import React, { useState, useEffect } from "react"
import WrestlerCountSelector from "./WrestlerCountSelector"
import WrestlerForm from "./WrestlerForm"
import { Wrestler, runTournament } from "../tournament"

function WrestlerManager() {
  const [wrestlerCount, setWrestlerCount] = useState(0)
  const [wrestlers, setWrestlers] = useState([])
  const [tournamentResults, setTournamentResults] = useState([])

  useEffect(() => {
    if (wrestlers.length < wrestlerCount) {
      const newWrestler = Array.from({ length: wrestlerCount - wrestlers.length }, () => ({
        name: "",
        health: 100,
        moves: [],
      }))
      setWrestlers([...wrestlers, ...newWrestler])
    } else if (wrestlers.length > wrestlerCount) {
      setWrestlers(wrestlers.slice(0, wrestlerCount))
    }
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
    let hasEmptyNameValue = false
    let hasEmptyHealthValue = false
    let hasWrongMoveValue = false

    for (let i = 0; i < wrestlers.length; i++) {
      if (wrestlers[i].name === "") {
        hasEmptyNameValue = true
        break
      } else if (wrestlers[i].health === "") {
        hasEmptyHealthValue = true
        break
      } else if (wrestlers[i].moves.length === 0 || wrestlers[i].moves[0].name === "" || wrestlers[i].moves[0].damage <= 0) {
        hasWrongMoveValue = true
        break
      }
    }

    if (hasEmptyNameValue) {
      alert("Please enter name for all wrestlers.")
      event.preventDefault()
      return
    } else if (hasWrongMoveValue) {
      alert("Please enter move details correctly.")
      event.preventDefault()
      return
    } else if (hasEmptyHealthValue) {
      alert("Please enter health details for all wrestlers.")
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
          <hr className="my-12 h-px border-t-0 bg-transparent bg-gradient-to-r from-transparent via-neutral-500 to-transparent opacity-25 dark:opacity-100" />
          <h2 className="text-3xl text-green-300 my-4 underline">Tournament Results:</h2>
          {tournamentResults.map((line, index) => {
            if (line.startsWith("Match")) {
              return (
                <>
                  <strong key={index} className="bg-gray-100 text-gray-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-gray-300">
                    {line}
                  </strong>
                </>
              )
            } else if (line.includes("wins the tournament!")) {
              return (
                <>
                  <strong key={index} className=" text-5xl text-white drop-shadow-lg ">
                    {line}
                  </strong>
                </>
              )
            } else if (line.includes("wins this match!") || line.includes("advances with a bye")) {
              return (
                <>
                  <strong key={index} className="bg-green-100 text-green-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-green-400 border border-green-400">
                    {line}
                  </strong>
                  <br />
                </>
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
