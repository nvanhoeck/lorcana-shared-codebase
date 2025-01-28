import {Card} from "../model/Card";

export const revealFromDeck = (amount: number, deck: Card[]) => {
    return deck.splice(0, amount)
}