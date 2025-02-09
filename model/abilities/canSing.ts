import {type Card, isKeywordAbility, isStaticAbility, type KeywordAbility} from "../Card";

const notVoiceless = (c: Card) => {
    return !c.abilities.find((a) => isStaticAbility(a) && a.name === 'VOICELESS')
}

export const canSing = (c: Card, cost?: number) => c.readied && c.type === 'Character' && notVoiceless(c) && (cost ? singCostThreshold(c, cost): true );

export const singCostThreshold = (c: Card, cost: number) => {
    const singerAbility = c.abilities.find((a) => isKeywordAbility(a) && a.keyword === 'Singer') as KeywordAbility
    return c.inkCost >= cost || (!!singerAbility ? singerAbility.keywordValueNumber >= cost : false)
}