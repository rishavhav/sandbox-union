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
    event.preventDefault()
    const wrestlerInstances = wrestlers.map((w) => new Wrestler(w.name, w.health, w.moves))
    const results = runTournament(wrestlerInstances)
    setTournamentResults(results)
  }

  return (
    <div className="text-center">
      <WrestlerCountSelector wrestlerCount={wrestlerCount} setWrestlerCount={setWrestlerCount} />
      <form onSubmit={handleSubmit}>
        {wrestlers.map((wrestler, index) => (
          <WrestlerForm key={index} wrestler={wrestler} setWrestlerData={(updatedWrestler) => handleWrestlerChange(index, updatedWrestler)} formNumber={index + 1} />
        ))}
        <button type="submit" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-10 mb-10">
          Submit All Wrestlers
        </button>
      </form>

      {tournamentResults.length > 0 && (
        <div className="">
          <h2 className="text-3xl text-blue-800 my-4 underline">Tournament Results:</h2>
          {tournamentResults.map((line, index) => {
            if (line.startsWith("Match")) {
              return (
                <strong key={index} className="text-red-800">
                  {line}
                </strong>
              )
            } else if (line.includes("wins the tournament!")) {
              return (
                <strong key={index} className=" text-5xl text-blue-700 drop-shadow-lg ">
                  {line}
                </strong>
              )
            } else if (line.includes("wins this match!")) {
              return (
                <>
                  <strong key={index} className=" text-2xl text-green-400 drop-shadow-lg ">
                    {line}
                  </strong>
                  <br />
                </>
              )
            } else {
              return <p key={index}>{line}</p>
            }
          })}
        </div>
      )}
    </div>
  )
}

export default WrestlerManager
