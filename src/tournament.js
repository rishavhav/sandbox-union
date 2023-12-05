class Wrestler {
  constructor(name, health, moves) {
    this.name = name
    this.health = health
    this.moves = moves
    this.originalHealth = health
  }

  performMove(opponent) {
    const move = this.moves[Math.floor(Math.random() * this.moves.length)]
    let moveResult = `${this.name} performs ${move.name}. `

    if (move.type === "finisher") {
      if (opponent.health <= 45) {
        if (Math.random() < 0.5) {
          moveResult = `${this.name} fails to perform ${move.name}.`
          return moveResult
        }
      }
    }

    opponent.health -= move.damage
    moveResult += `${opponent.name}'s health: ${opponent.health}.`
    return moveResult
  }
}

function simulateMatch(wrestler1, wrestler2) {
  let matchLog = [`Match: ${wrestler1.name} vs. ${wrestler2.name}`]
  let round = 1

  while (wrestler1.health > 0 && wrestler2.health > 0) {
    matchLog.push(`Round ${round}:`)
    matchLog.push(wrestler1.performMove(wrestler2))
    if (wrestler2.health <= 0) break
    matchLog.push(wrestler2.performMove(wrestler1))
    if (wrestler1.health <= 0) break
    round++
  }

  const winner = wrestler1.health <= 0 ? wrestler2 : wrestler1
  matchLog.push(`${winner.name} wins this match!`)
  return { winner: winner.name, log: matchLog }
}

function runTournament(wrestlers) {
  let tournamentLog = []
  while (wrestlers.length > 1) {
    const newRound = []
    for (let i = 0; i < wrestlers.length; i += 2) {
      if (wrestlers[i + 1]) {
        const matchResult = simulateMatch(wrestlers[i], wrestlers[i + 1])
        tournamentLog = tournamentLog.concat(matchResult.log)

        const originalWinner = wrestlers.find((w) => w.name === matchResult.winner)
        newRound.push(new Wrestler(matchResult.winner, originalWinner.originalHealth, wrestlers[i].moves))
      } else {
        tournamentLog.push(`${wrestlers[i].name} advances with a bye`)
        newRound.push(wrestlers[i])
      }
    }
    wrestlers = newRound
  }
  tournamentLog.push(`${wrestlers[0].name} wins the tournament!`)
  return tournamentLog
}

export { Wrestler, simulateMatch, runTournament }
