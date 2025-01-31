import {Card} from "../Card";

export const horseKick = () => {
    const steps = {
        0: pickACard,
        conditionToPick: (c: Card) => c.type === 'Character',
    }
    return steps
}

const pickACard = (cardsToChooseFrom: Card[], idx: number) => {
    if (idx >= 0) {
        const chosenCard = cardsToChooseFrom[idx];
        if (chosenCard.type !== 'Character') {
            throw new Error('You are not allowed to pick a non character card with Horse Kick.')
        }
        chosenCard.statChanges.strength -= 2
        chosenCard.statChanges.applied.push('HORSE KICK')
    }
}