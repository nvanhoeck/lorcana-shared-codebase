import type {Player} from "../model/Player";
import {type Card, isStaticAbility, type StaticAbility} from "../model/Card";
import {loyal, sinisterPlot} from "../model/abilities";

// TODO refactor?
export const reviseAllCardsInPlay = (player: Player, hostilePlayer: Player) => {
    player.activeRow.forEach((c) => {
        c.abilities.filter((a) => isStaticAbility(a))
            .forEach((staticKeyword) => {
                checkAllStaticAbilities(staticKeyword, c, player, hostilePlayer)
            })
    })

    hostilePlayer.activeRow.forEach((c) => {
        c.abilities.filter((a) => isStaticAbility(a))
            .forEach((staticKeyword) => {
                checkAllStaticAbilities(staticKeyword, c, hostilePlayer, player)
            })
    })
}

const checkAllStaticAbilities = (ability: StaticAbility, card: Card, player: Player, hostilePlayer: Player) => {
    // TODO what about multiple stats
    switch (ability.name) {
        case "SINISTER PLOT":
            sinisterPlot(player.activeRow, player.waitRow, card)
            break;
        case "LOYAL":
            loyal(player.activeRow, player.waitRow, card)
            break;
        case "VOICELESS":
        default:
            break;
        // Do nothing
    }
}