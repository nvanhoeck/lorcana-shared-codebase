import {type Card} from "../Card";

export const sinisterPlot = (activeRow: Card[], waitingRow: Card[], card: Card) => {
    // TODO we have to revise this
    // when a new villain is played, sinisterPlot needs to be updated. Does this mean we need to keep track of all changes done by a stat
    // and do we need to also add a cardId + cardIdx? So double cards can do double effect? Maybe not for static
    // but for something like support
    const allVillainsInActiveRow = activeRow.filter((c) => c.subTypes.includes('Villain')).length
    const allVillainsInWaitingRow = waitingRow.filter((c) => c.subTypes.includes('Villain')).length
    const doNotCountItself = 1


    card.statChanges.lore += allVillainsInActiveRow + allVillainsInWaitingRow - doNotCountItself
    card.subtractStatsAtEndOfTurn.lore += allVillainsInActiveRow + allVillainsInWaitingRow - doNotCountItself
    card.statChanges.applied.push('SINISTER PLOT')
    card.subtractStatsAtEndOfTurn.applied.push('SINISTER PLOT')
}