import type {Card} from "../Card";
import type {Player} from "../Player";
import {defineCardAmountRange, type PlayerGameState} from "../ai/State";

export const aWonderfulDreamCondition = (c: Card) => {
    return c.subTypes.includes("Princess")
}

export const aWonderfulDreamOptimalTarget = (possibleTargets: Card[]) => {
    const princessCards = possibleTargets.filter((c) => aWonderfulDreamCondition(c));
    if (princessCards.length <= 0) return
    else {
        return princessCards
            .reduce((currentCard, nextCard) => {
                if (currentCard.damage >= nextCard.damage) {
                    return nextCard
                } else {
                    return currentCard
                }
            }, princessCards[0])
    }
}


export const aWonderfulDream = (c: Card) => {
    if (c.subTypes.includes("Princess")) {
        c.damage = c.damage - 3
        if (c.damage < 0) {
            c.damage = 0
        }
    } else {
        throw new Error("Picked a non princess card for a wonderfull dream")
    }
}

export const aWonderfulDreamNextState = (playerGameState: PlayerGameState, player: Player): PlayerGameState => {
    return {
        ...playerGameState, fieldState: {
            ...playerGameState.fieldState,
            totalReadiedCards: defineCardAmountRange(player.activeRow.filter((c) => c.readied).length - 1),
        }
    }
}

export const aWonderfulDreamCanBeExecuted = (playerActiveRow: Card[]) => {
    return playerActiveRow.filter(aWonderfulDreamCondition).length > 0
}