import { Collection, GuildMember } from 'discord.js'

export interface BalanceUpdateDto {
    balance: number
    type: 'minus' | 'plus',
    transaction: {
        operationType: string,
        operationAmount: number
        operationDate: number
    }
}

export interface LeaderboardDto {
    type: 'generalVoice' | 'weekVoice' | 'balance'
    currentUser: string
    members: Collection<string, GuildMember>
}

export interface OnlineUpdateDto {
    time: number
}