export const actions = [
    "INK_CARD",
    "CHALLENGE",
    "QUEST",
    "PLAY_CARD",
    "END_TURN",
    "SING",
    "CARD_EFFECT_ACTIVATION"
] as const;

export type Actions = typeof actions[number]; // Extract the union of literal types from the array.
