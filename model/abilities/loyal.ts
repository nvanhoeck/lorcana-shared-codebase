import {type Card} from "../Card";

export const loyal = (activeRow: Card[], waitingRow: Card[], card: Card) => {
    if (!card.statChanges.applied.includes("LOYAL")) {
        const allGastonsInActiveRow = activeRow.filter((c) => c.name === 'Gaston' && !c.statChanges.applied.includes('LOYAL'))
        const allGastonsInWaitingRow = waitingRow.filter((c) => c.name === 'Gaston' && !c.statChanges.applied.includes('LOYAL'))
        if (!(allGastonsInActiveRow.find((c) => c.providesEffects.includes('LOYAL')) || allGastonsInWaitingRow.find((c) => c.providesEffects.push('LOYAL')))) {
            card.statChanges.ink -= allGastonsInActiveRow.length > 0 || allGastonsInWaitingRow.length > 0 ? 1 : 0
            card.subtractStatsAtEndOfTurn.ink -= allGastonsInActiveRow.length > 0 || allGastonsInWaitingRow.length > 0 ? 1 : 0
            card.statChanges.applied.push('LOYAL')
            card.subtractStatsAtEndOfTurn.applied.push('LOYAL')
            allGastonsInActiveRow.forEach((c) => c.providesEffects.push('LOYAL'))
            allGastonsInWaitingRow.forEach((c) => c.providesEffects.push('LOYAL'))
        }
    }
}