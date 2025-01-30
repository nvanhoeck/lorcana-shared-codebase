import type {Sphere} from "./Sphere";

export type Deck = {
    deckName: string
    firstDeckType:Sphere
    secondDeckType?:Sphere
    cards: {id: string, count: number}[]
}