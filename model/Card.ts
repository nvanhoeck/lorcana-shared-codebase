import type {Sphere} from "./Sphere";
export type CardType = 'Character' | 'Action' | 'Song' | 'Item' | 'Location'
export type Keywords = 'Challenger' | 'Shift' | 'Bodyguard' | 'Singer' | 'Support' | 'Rush' | 'Evasive' | 'Ward' | 'Reckless'


type AbilityObject = {
    type: "keyword" | "static" | "triggered" | "activated"
}


export type KeywordAbility = {
    keyword: Keywords,
    keywordValueNumber: number,
    type: "keyword"

}

export const isKeywordAbility = (c: AbilityObject): c is KeywordAbility => {
    return c.type === 'keyword'
}

export type StaticAbility = {
    name: string,
    type: "static"
}

export const isStaticAbility = (c: AbilityObject): c is StaticAbility => {
    return c.type === 'static'
}

export type TriggeredAbility = {
    name: string,
    type: "triggered"
}
export const isTriggeredAbility = (c: AbilityObject): c is TriggeredAbility => {
    return c.type === 'triggered'
}


export type ActivatedAbility = {
    name: string,
    type: "activated"
}

export const isActivatedAbility = (c: AbilityObject): c is ActivatedAbility => {
    return c.type === 'activated'
}

export type Card = {
    id: string
    setId: number
    inkable: boolean
    type: CardType
    inkCost: number
    name: string
    subName: string
    sphere: Sphere
    strength: number
    willpower: number
    classification: string[]
    lore: number
    movement: number
    keywords: Keywords[]
    readied: boolean
    canBeReadiedDuringReadyPhase: boolean
    damage: number
    abilities: (KeywordAbility | StaticAbility | TriggeredAbility | ActivatedAbility) []
}