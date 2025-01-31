import {type Card} from "../Card";

export const loyal = (activeRow: Card[], waitingRow: Card[], card: Card) => {
    if (!card.statChanges.applied.includes("LOYAL")) {
        debugger
        const hasGastonInActiveRow = activeRow.find((c) => c.name === 'Gaston' && !c.statChanges.applied.includes('LOYAL'))
        const hasGastonInWaitingRow = waitingRow.find((c) => c.name === 'Gaston' && !c.statChanges.applied.includes('LOYAL'))
        card.statChanges.ink -= hasGastonInActiveRow || hasGastonInWaitingRow ? 1 : 0
        card.subtractStatsAtEndOfTurn.ink -= hasGastonInActiveRow || hasGastonInWaitingRow ? 1 : 0
        card.statChanges.applied.push('LOYAL')
        card.subtractStatsAtEndOfTurn.applied.push('LOYAL')
    }
}