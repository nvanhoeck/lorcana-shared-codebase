import {type Card} from "../model/Card";
import {canSing, singCostThreshold} from "../model/abilities/canSing";


export const findOptimalSinger = (row: Card[], singCost: number) => {
    let card = row
        .filter((c) => canSing(c) && singCostThreshold(c, singCost))
        .reduce((closestCard, currentCard) => {
            console.log(currentCard)
            const currentDiff = Math.abs(currentCard.inkCost - singCost);
            const closestDiff = Math.abs(closestCard.inkCost - singCost);

            // Update the closest card if the current card has:
            // 1. A closer ink cost OR
            // 2. The same difference but a lower ink cost
            if (
                currentDiff < closestDiff ||
                (currentDiff === closestDiff && currentCard.inkCost < closestCard.inkCost)
            ) {
                return currentCard;
            }

            return closestCard;
        }, row[0]); // Start with the first card in the row as the initial closest card
    if(card && canSing(card) && singCostThreshold(card, singCost)) {
        return row.indexOf(card)
    } else {
        return -1
    }
};
