import {type Card, isKeywordAbility, type KeywordAbility} from "../Card";
import type {Player} from "../Player";
import {defineCardAmountRange, type PlayerGameState} from "../ai/State";
import {transferElement} from "../../utils";

export const shift = (hand: Card[], activeRow: Card[], banishedPile: Card[], cardToPlayIdx: number, cardToPlayUponIdx: number) => {
    const cardToShift = hand[cardToPlayIdx]
    const cardToBeShifted = activeRow[cardToPlayUponIdx]
    cardToShift.readied = cardToBeShifted.readied
    cardToShift.damage = cardToBeShifted.damage
    cardToShift.canBeReadiedDuringReadyPhase = cardToBeShifted.canBeReadiedDuringReadyPhase
    transferElement(activeRow, banishedPile, cardToPlayUponIdx)
    transferElement(hand, activeRow, cardToPlayIdx)
}

export const canBeShiftedUpon = (cardName: string, card:Card) => {
    return card.name === cardName
}

export const canShift = (cardToShift: Card, activeRow: Card[]) => {
    return cardToShift.abilities.find((a) => isKeywordAbility(a) && a.keyword === 'Shift') && activeRow.find((c) => c.name === cardToShift.name)
}

export const shiftCost = (c: Card) => {
    const shiftAbility = c.abilities.find((a) => isKeywordAbility(a) && a.keyword === 'Shift')
    if (!shiftAbility) {
        throw new Error('trying to define shift cost on a non shift card')
    } else {
        return (shiftAbility as KeywordAbility).keywordValueNumber
    }
}

export const defineNextStateByShifting = (cardToBePlayed: Card, cardToBePlayedUpon: Card, player: Player, playerGameState: PlayerGameState): PlayerGameState => {
    return {
        ...playerGameState,
        hand:{
            handSizeRange: defineCardAmountRange(player.hand.length -1)
        },
        inkTotal: player.inkTotal - shiftCost(cardToBePlayed),
        fieldState: {
            ...playerGameState.fieldState,
            totalStrength: playerGameState.fieldState.totalStrength - cardToBePlayedUpon.strength + cardToBePlayed.strength,
            totalWillpower: playerGameState.fieldState.totalWillpower - cardToBePlayedUpon.willpower + cardToBePlayed.willpower,
            totalLore: playerGameState.fieldState.totalLore - cardToBePlayedUpon.lore + cardToBePlayed.lore
        }
    }
}