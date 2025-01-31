import type {Card} from "../Card";
import type {Player} from "../Player";
import {type PlayerGameState} from "../ai/State";

export const weCanFixItCondition = (c: Card, idx: number, indexOfExecutingCard: number) => {
    return c.subTypes.includes("Princess") && idx !== indexOfExecutingCard && !c.readied
}

export const weCanFixItOptimalTarget = (idx: number, possibleTargets: Card[]) => {
    const princessCards = possibleTargets.filter((c, index) => weCanFixItCondition(c, index, idx));
    if (princessCards.length <= 0) return
    else {
        return princessCards
            .filter((p) => !p.readied)
            .reduce((currentCard, nextCard) => {
                if (currentCard.strength >= nextCard.strength) {
                    return nextCard
                } else {
                    return currentCard
                }
            }, princessCards[0])
    }
}


export const weCanFixIt = (c: Card) => {
    if (c.subTypes.includes("Princess")) {
        c.readied = true
        c.disabled.push('QUEST')
        c.resetDisabledAtEndOfTurn.push('QUEST')
    } else {
        throw new Error("Picked a non princess card for a wonderfull dream")
    }
}

export const weCanFixItNextState = (playerGameState: PlayerGameState, player: Player): PlayerGameState => {
    return playerGameState
}

export const weCanFixItCanBeExecuted = (playerActiveRow: Card[], idx: number) => {
    return playerActiveRow.filter((c, i) => c.subTypes.includes('Princess') && !c.readied && i !== idx).length > 0
}