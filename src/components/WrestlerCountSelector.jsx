import React from "react"

function WrestlerCountSelector({ wrestlerCount, setWrestlerCount }) {
  const handleChange = (event) => {
    const newValue = parseInt(event.target.value, 10)

    if (newValue >= 0 && newValue <= 4) {
      setWrestlerCount(newValue)
    }
  }

  return (
    <div className="flex flex-col items-center py-8">
      <label className="pb-2 text-white">How many wrestlers?</label>
      <input className="bg-slate-200 border rounded py-1  shadow-2xl" type="number" value={wrestlerCount} onChange={handleChange} min="0" max="4" />
    </div>
  )
}

export default WrestlerCountSelector
