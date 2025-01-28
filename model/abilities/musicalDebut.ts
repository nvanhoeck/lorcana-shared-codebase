import {revealFromDeck} from "../../utils/revealFromDeck";
import {Card} from "../Card";
import {shuffleArray} from "../../utils";

export const musicalDebut = (deck: Card[]) => {
    const steps = {
        0: revealFromDeck(4, deck),
        1: pickACard,
        2: shuffleBackToDeck,
        conditionToPick: (c: Card) => c.type === 'Song',
    }
    return steps
}

const pickACard = (cardsToChooseFrom: Card[], hand:Card[], idx: number) => {
    if(idx >= 0) {
        const chosenCard = cardsToChooseFrom[idx];
        if(chosenCard.type !== 'Song') {
            throw new Error('You are not allowed to pick a non song card with Musical Debut.')
        }
        hand.push(chosenCard)
    }
}

const shuffleBackToDeck = (cardsToShuffleBackIntoDeck: Card[], deck: Card[]) => {
    deck.push(...cardsToShuffleBackIntoDeck)
    return shuffleArray(deck)
}