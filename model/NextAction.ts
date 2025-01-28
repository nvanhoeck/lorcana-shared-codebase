import type {Card} from "./Card";
import type {Actions} from "./Actions";

export type NextAction = { id: string; action: { cardIdx?: number, card?: Card; action: Actions; stats?: { power: number } | undefined;  targetIdx?: number } }