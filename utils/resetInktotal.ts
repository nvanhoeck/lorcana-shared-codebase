import type {Player} from "lorcana-shared/model//Player";

export function resetInkTotal(player: Player) {
    player.inkTotal = player.cardInInkRow
    player.alreadyInkedThisTurn = false
}