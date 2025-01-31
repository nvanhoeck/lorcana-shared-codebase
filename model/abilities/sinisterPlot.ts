import {type Card} from "../Card";

function calculateLessLoreBasedOnNewCard(activeRow: Card[], waitingRow: Card[], card: Card) {
    const allVillainsInActiveRow = activeRow.filter((c) => c.subTypes.includes('Villain'))
    const allVillainsInWaitingRow = waitingRow.filter((c) => c.subTypes.includes('Villain'))

    const differenceInApplicableVillains = allVillainsInActiveRow.length + allVillainsInWaitingRow.length - card.statChanges.applied.filter(n => n === 'SINISTER PLOT').length

    card.statChanges.lore += differenceInApplicableVillains
    card.subtractStatsAtEndOfTurn.lore += differenceInApplicableVillains
    // Apply the amount of times a villain is found
    for (let i = 0; i < -differenceInApplicableVillains; i++) {
        const index1 = card.statChanges.applied.lastIndexOf('SINISTER PLOT');
        if (index1 !== -1) card.statChanges.applied.splice(index1, 1);

        const index2 = card.subtractStatsAtEndOfTurn.applied.lastIndexOf('SINISTER PLOT');
        if (index2 !== -1) card.subtractStatsAtEndOfTurn.applied.splice(index2, 1);
    }
}

function calculateAdditionalLoreBasedOnNewCard(activeRow: Card[], waitingRow: Card[], card: Card) {
    const allVillainsInActiveRow = activeRow.filter((c) => c.subTypes.includes('Villain'))
    const allVillainsInWaitingRow = waitingRow.filter((c) => c.subTypes.includes('Villain'))

    const differenceInApplicableVillains = allVillainsInActiveRow.length + allVillainsInWaitingRow.length - card.statChanges.applied.filter(n => n === 'SINISTER PLOT').length

    card.statChanges.lore += differenceInApplicableVillains
    card.subtractStatsAtEndOfTurn.lore += differenceInApplicableVillains
    // Apply the amount of times a villain is found
    for (let i = 0; i < differenceInApplicableVillains; i++) {
        card.statChanges.applied.push('SINISTER PLOT')
        card.subtractStatsAtEndOfTurn.applied.push('SINISTER PLOT')
    }

    allVillainsInActiveRow.forEach((c) => c.providesEffects.push('SINISTER PLOT'))
    allVillainsInWaitingRow.forEach((c) => c.providesEffects.push('SINISTER PLOT'))

}

function calculateNewLoreBasedOnZeroStart(activeRow: Card[], waitingRow: Card[], card: Card) {
    let doNotCountItself = 1

    const allVillainsInActiveRow = activeRow.filter((c) => c.subTypes.includes('Villain'))
    const allVillainsInWaitingRow = waitingRow.filter((c) => c.subTypes.includes('Villain'))

    const loreChange = allVillainsInActiveRow.length + allVillainsInWaitingRow.length - doNotCountItself

    card.statChanges.lore += loreChange
    card.subtractStatsAtEndOfTurn.lore += loreChange
    // Apply the amount of times a villain is found
    for (let i = 0; i < allVillainsInActiveRow.length + allVillainsInWaitingRow.length; i++) {
        card.statChanges.applied.push('SINISTER PLOT')
        card.subtractStatsAtEndOfTurn.applied.push('SINISTER PLOT')
    }

    allVillainsInActiveRow.forEach((c) => c.providesEffects.push('SINISTER PLOT'))
    allVillainsInWaitingRow.forEach((c) => c.providesEffects.push('SINISTER PLOT'))

}


export const sinisterPlot = (activeRow: Card[], waitingRow: Card[], card: Card) => {
    // First situation, after reset
    const allVillainsInActiveRow = activeRow.filter((c) => c.subTypes.includes('Villain'))
    const allVillainsInWaitingRow = waitingRow.filter((c) => c.subTypes.includes('Villain'))
    const ammountOfApplicationsIsLessThenAmountOfVillains = card.statChanges.applied.filter(n => n === 'SINISTER PLOT').length < (allVillainsInWaitingRow.length + allVillainsInActiveRow.length);
    const ammountOfApplicationsIsGreaterThenAmountOfVillains = card.statChanges.applied.filter(n => n === 'SINISTER PLOT').length > (allVillainsInWaitingRow.length + allVillainsInActiveRow.length);

    if (!card.statChanges.applied.includes('SINISTER PLOT')) {
        calculateNewLoreBasedOnZeroStart(activeRow, waitingRow, card)
    } else if (ammountOfApplicationsIsLessThenAmountOfVillains) {
        calculateAdditionalLoreBasedOnNewCard(activeRow, waitingRow, card)
    } else if (ammountOfApplicationsIsGreaterThenAmountOfVillains) {
        calculateLessLoreBasedOnNewCard(activeRow, waitingRow, card)
    }
    // ELSE ok
}