import {Card, isKeywordAbility, isStaticAbility, KeywordAbility} from "../model/Card";

const notVoiceless = (c: Card) => {
    return !c.abilities.find((a) => isStaticAbility(a) && a.name === 'VOICELESS')
}

const canSing = (c: Card) => c.type === 'Character' && notVoiceless(c);

const singCostThreshold = (c: Card, cost: number) => {
    const singerAbility = c.abilities.find((a) => isKeywordAbility(a) && a.keyword === 'Singer') as KeywordAbility
    return c.inkCost >= cost || singerAbility ? singerAbility.keywordValueNumber >= cost : false
}

export const findOptimalSinger = (row: Card[], singCost: number) => {
    let card = row
        .filter((c) => canSing(c) && singCostThreshold(c, singCost))
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
