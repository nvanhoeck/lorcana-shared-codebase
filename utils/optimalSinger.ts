import {Card, isKeywordAbility} from "../model/Card";

function isASingerWithRequiredCost(c: Card, singCost: number) {
    return c.abilities.find((a) => isKeywordAbility(a) && a.keyword === 'Singer' && a.keywordValueNumber >= singCost);
}

export const findOptimalSinger = (row: Card[], singCost: number) => {
    let card = row
        .filter((c) => isASingerWithRequiredCost(c, singCost) || c.inkCost >= singCost)
        .reduce((closestCard, currentCard) => {
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
    return row.indexOf(card)
};
