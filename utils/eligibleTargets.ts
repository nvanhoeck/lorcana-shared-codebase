import {type Card, isKeywordAbility} from "../model/Card";

export const eligibleTargets = (opposingActiveRow: Card[]) => {
    if(opposingActiveRow.find((c) => !c.readied && c.abilities.find((a) => isKeywordAbility(a) && a.keyword === 'Bodyguard'))) {
        return opposingActiveRow.filter((c) => !c.readied && c.abilities.find((a) => isKeywordAbility(a) && a.keyword === 'Bodyguard'))
    }
    return opposingActiveRow.filter((r) => !r.readied && r.type === 'Character' || r.type === 'Location');
}