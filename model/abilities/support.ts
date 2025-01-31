import {type Card, isKeywordAbility} from "../Card";
import {type Player} from "../Player";

export const support = (card: Card, player: Player, targetCardIdx?: number) => {
    if (card.abilities.find((a) => isKeywordAbility(a) && a.keyword === 'Support')) {
        const cardToImprove = targetCardIdx ? player.activeRow[targetCardIdx] : player.activeRow.find((c) => c.readied);
        if (cardToImprove) {
            cardToImprove.statChanges.strength += card!.strength
            cardToImprove.subtractStatsAtEndOfTurn.strength += card!.strength
            cardToImprove.statChanges.applied.push('Support')
            cardToImprove.subtractStatsAtEndOfTurn.applied.push('Support')
        }
    }
    return player
}