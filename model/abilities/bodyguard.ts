import {type Card, isKeywordAbility} from "../Card";
import {transferElement} from "../../utils";
import type {Player} from "../Player";

export const isBodyguard = (c: Card) => c.abilities.find((a) => isKeywordAbility(a) && a.keyword === 'Bodyguard')

export const bodyguard = (player: Player, cardToBePlayedIdx: number) => {
    const hand = player.hand
    const activeRow = player.activeRow
    hand[cardToBePlayedIdx].readied = false
    hand[cardToBePlayedIdx].canBeReadiedDuringReadyPhase = true
    transferElement(hand, activeRow, cardToBePlayedIdx)
    return player
}