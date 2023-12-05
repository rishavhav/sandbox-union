import React from "react"

const WrestlerForm = ({ wrestler, setWrestlerData, formNumber }) => {
  const handleWrestlerChange = (event) => {
    setWrestlerData({ ...wrestler, [event.target.name]: event.target.value })
  }

  const handleMoveChange = (index, event) => {
    const newMoves = [...wrestler.moves]
    newMoves[index] = { ...newMoves[index], [event.target.name]: event.target.value }
    setWrestlerData({ ...wrestler, moves: newMoves })
  }

  const addMove = () => {
    setWrestlerData({
      ...wrestler,
      moves: [...wrestler.moves, { name: "", damage: 0, type: "" }],
    })
  }

  const removeMove = () => {
    let moves = [...wrestler.moves]
    moves.pop()

    setWrestlerData({
      ...wrestler,
      moves: moves,
    })
  }

  return (
    <div className="text-center">
      <div className="w-full max-w-xl mx-auto my-4 p-4 border  shadow-md rounded bg-slate-300">
        <h1 className="text-3xl bg-slate-400 rounded pt-1 pb-1">
          Wrestler's #{formNumber}: {wrestler.name}
        </h1>
        <div class="pb-2">
          <label class="block text-gray-700 text-sm font-bold mb-2">Name:</label>
          <input class="bg-slate-200 border rounded pb-2" type="text" name="name" value={wrestler.name} onChange={handleWrestlerChange} />
        </div>
        <div class="pb-2">
          <label class="block text-gray-700 text-sm font-bold mb-2">Health:</label>
          <input class="bg-slate-200 border rounded pb-2" type="number" name="health" value={wrestler.health} onChange={handleWrestlerChange} />
        </div>
        <div>
          <div>
            <button type="button" onClick={addMove} class="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow mb-3 mt-3 mx-2">
              Add Move
            </button>
            <button type="button" onClick={removeMove} class="bg-red-700 hover:bg-gray-700 text-white font-semibold py-2 px-4 border border-gray-400 rounded shadow mb-3 mt-3">
              Remove Move
            </button>
          </div>

          {wrestler.moves.map((move, index) => (
            <div key={index} className="mb-2 flex justify-between ">
              <input class="bg-slate-200 border rounded pb-2" type="text" name="name" placeholder="Move Name" value={move.name} onChange={(e) => handleMoveChange(index, e)} />
              <input class="bg-slate-200 border rounded pb-2" type="number" name="damage" placeholder="Damage" value={move.damage} onChange={(e) => handleMoveChange(index, e)} />
              <select class="bg-slate-200 border rounded pb-2" name="type" value={move.type} onChange={(e) => handleMoveChange(index, e)}>
                <option value="signature">Signature</option>
                <option value="finisher">Finisher</option>
              </select>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default WrestlerForm
