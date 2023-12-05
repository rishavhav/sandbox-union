import React from "react"

function WrestlerCountSelector({ wrestlerCount, setWrestlerCount }) {
  const handleChange = (event) => {
    const newValue = parseInt(event.target.value, 10)

    if (newValue >= 0 && newValue <= 4) {
      setWrestlerCount(newValue)
    }
  }

  return (
    <div className="flex flex-col items-center pt-8">
      <label className="pb-2">How many wrestlers?</label>
      <input class="bg-slate-200 border rounded pb-2" type="number" value={wrestlerCount} onChange={handleChange} min="0" max="4" />
    </div>
  )
}

export default WrestlerCountSelector
