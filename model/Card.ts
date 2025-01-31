import type {Sphere} from "./Sphere";
import {Actions} from "./Actions";

export type CardType = 'Character' | 'Action' | 'Song' | 'Item' | 'Location'
export type Keywords =
    'Challenger'
    | 'Shift'
    | 'Bodyguard'
    | 'Singer'
    | 'Support'
    | 'Rush'
    | 'Evasive'
    | 'Ward'
    | 'Reckless'

export type SubType =
    "Storyborn"
    | "Hero"
    | "Princess"
    | "Song"
    | "Musketeer"
    | "Floodborn"
    | "Villain"
    | "King"
    | "Deity"
    | "Ally"
    | "Dreamborn"
    | "Pirate"
    | "Prince"
    | "Alien"
    | "Queen"
    | "Sorcerer"
    | "Broom"
    | "Mentor"
    | "Fairy"
    | "Inventor"
    | "Captain"
    | "Dragon"
    | "Tigger"
    | "Detective"

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
    name: 'VOICELESS' | "SINISTER PLOT" | "LOYAL",
    type: "static"
}

export const isStaticAbility = (c: AbilityObject): c is StaticAbility => {
    return c.type === 'static'
}

export type TriggeredAbility = {
    name: 'MUSICAL DEBUT' | 'WELL OF SOULS' | 'HORSE KICK' | 'WE CAN FIX IT',
    type: "triggered"
}
export const isTriggeredAbility = (c: AbilityObject): c is TriggeredAbility => {
    return c.type === 'triggered'
}


export type ActivatedAbility = {
    name: 'A WONDERFUL DREAM',
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
    subTypes: SubType[]
    providesEffects: (KeywordAbility['keyword'] | StaticAbility['name'] | TriggeredAbility['name'] | ActivatedAbility['name']) []
    statChanges: {
        strength: number
        willpower: number
        lore: number
        ink: number
        applied: (KeywordAbility['keyword'] | StaticAbility['name'] | TriggeredAbility['name'] | ActivatedAbility['name']) []
    },
    subtractStatsAtEndOfTurn: {
        strength: number
        willpower: number
        lore: number
        ink: number
        applied: (KeywordAbility['keyword'] | StaticAbility['name'] | TriggeredAbility['name'] | ActivatedAbility['name']) []
    },
    disabled: Actions[]
    resetDisabledAtEndOfTurn: Actions[]
}