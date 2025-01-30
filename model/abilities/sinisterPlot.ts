import {type Card} from "../Card";

export const sinisterPlot = (activeRow: Card[], waitingRow: Card[], card: Card) => {
    const allVillainsInActiveRow = activeRow.filter((c) => c.subTypes.includes('Villain')).length
    const allVillainsInWaitingRow = waitingRow.filter((c) => c.subTypes.includes('Villain')).length
    const doNotCountItself = 1
    debugger
    card.statChanges.lore = allVillainsInActiveRow + allVillainsInWaitingRow - doNotCountItself
}