import { shuffleArray } from "lorcana-shared/utils/shuffleArray";
import type {Card} from "lorcana-shared/model//Card";
import { transferLastElements } from "lorcana-shared/utils/transferElements";

export const setupHandAndShuffleDeck = (deck: Card[], hand: Card[]) => {
    let cards = shuffleArray(deck);
    transferLastElements(cards, hand, 6)
    return {deck: cards, hand: hand}
}