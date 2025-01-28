import {Card} from "../model/Card";
import {findOptimalSinger} from "./optimalSinger";
import {transferElement} from "./transferElements";

export const singASongCard = (hand: Card[], activeRow: Card[], cardIdx: number, inkTotal: number, banishedPile: Card[]) => {
    const card = hand[cardIdx]
    const optimalSingerIdx = findOptimalSinger(activeRow, card.inkCost)
    let newInkTotal = inkTotal - card.inkCost
    if(optimalSingerIdx >= 0) {
        newInkTotal = inkTotal
        activeRow[optimalSingerIdx].readied = false
    }
    transferElement(hand, banishedPile, cardIdx)
    return newInkTotal
}