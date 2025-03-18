import type {Card} from "../Card";
import type {Player} from "../Player";
import {defineCardAmountRange, type PlayerGameState} from "../ai/State";

export const andTwoForTeaCondition = (c: Card) => {
    return c.subTypes.includes("Musketeer")
}

export const andTwoForTeaOptimalTargets = (possibleTargets: Card[]) => {
    const muskereerCards = possibleTargets.filter((c) => andTwoForTeaCondition(c));
    if (muskereerCards.length <= 0) return
    else {
        return muskereerCards
    }
}


export const andTwoForTea = (c: Card) => {
    if (c.subTypes.includes("Musketeer")) {
        c.damage = c.damage - 2
        if (c.damage < 0) {
            c.damage = 0
        }
    } else {
        throw new Error("Picked a non musketeer card for a a two for tea")
    }
}

export const andTwoForTeaState = (playerGameState: PlayerGameState, player: Player): PlayerGameState => {
    return {
        ...playerGameState
    }
}

export const andTwoForTeaCanBeExecuted = (playerActiveRow: Card[]) => {
    return playerActiveRow.filter(andTwoForTeaCondition).length >= 1
}