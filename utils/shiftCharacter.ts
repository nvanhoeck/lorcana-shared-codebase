import {type Card, isKeywordAbility, type KeywordAbility} from "../model/Card";
import {shift, shiftCost} from "../model/abilities";
import {type Player} from "../model/Player";

export const shiftCharacterCard = (player: Player, hand: Card[], activeRow: Card[], banishedPile: Card[], cardToBePlayedIdx: number, cardToBePlayedUponIdx: number, inkwell: number) => {
    const cardToBePlayed = hand[cardToBePlayedIdx]
    const cardToBePlayedUpon = hand[cardToBePlayedUponIdx]
    const shiftAbility = cardToBePlayed.abilities.find((a) => isKeywordAbility(a) && a.keyword === 'Shift')
    console.log(shiftAbility)
    console.log((cardToBePlayed.name !== cardToBePlayedUpon.name))
    if ((cardToBePlayed.name !== cardToBePlayedUpon.name) || !shiftAbility) {
        throw new Error("Trying to shift on not same named card or without shift ability")
    }
    if (shiftCost(cardToBePlayed) > inkwell) {
        throw new Error("Trying to shift while not having enough ink")
    }
    if ((shiftAbility as KeywordAbility).keywordValueNumber <= inkwell) {
        shift(player, cardToBePlayedUponIdx, cardToBePlayedUponIdx)
        return inkwell - shiftCost(cardToBePlayed)
    } else {
        throw new Error(`Cannot shift ${cardToBePlayed.name} ${cardToBePlayed.subName} on ${cardToBePlayedUpon.name} ${cardToBePlayed.subName} ${cardToBePlayed.inkCost} from ${inkwell}`)

    }
}