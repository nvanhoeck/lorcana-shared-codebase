import {type Card, isKeywordAbility} from "../Card";

export const isBodyguard = (c: Card) => c.abilities.find((a) => isKeywordAbility(a) && a.keyword === 'Bodyguard')