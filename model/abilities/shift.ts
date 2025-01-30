import {type Card, isKeywordAbility, type KeywordAbility} from "../Card";
import type {Player} from "../Player";
import {defineCardAmountRange, type PlayerGameState} from "../ai/State";
import {transferElement} from "../../utils";

export const shift = (player: Player, cardToPlayIdx: number, cardToPlayUponIdx: number) => {
    player.inkTotal = player.inkTotal - shiftCost(player.hand[cardToPlayIdx])
    player.hand[cardToPlayIdx].readied = player.activeRow[cardToPlayUponIdx].readied
    player.hand[cardToPlayIdx].damage = player.activeRow[cardToPlayUponIdx].damage
    player.hand[cardToPlayIdx].canBeReadiedDuringReadyPhase = player.activeRow[cardToPlayUponIdx].canBeReadiedDuringReadyPhase
    transferElement(player.activeRow, player.banishedPile, cardToPlayUponIdx)
    transferElement(player.hand, player.activeRow, cardToPlayIdx)
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