import {revealFromDeck} from "../../utils/revealFromDeck";
import {type Card} from "../Card";
import {shuffleArray} from "../../utils";

export const wellOfSouls = (banishedPile: Card[]) => {
    const steps = {
        0: revealFromDeck(banishedPile.length, banishedPile),
        1: pickACard,
        2: shuffleBackToBanishedPile,
        conditionToPick: (c: Card) => c.type === 'Character',
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

const shuffleBackToBanishedPile = (cardsToShuffleBackIntoBanishedPile: Card[], banishedPile: Card[]) => {
    banishedPile.push(...cardsToShuffleBackIntoBanishedPile)
    return banishedPile
}