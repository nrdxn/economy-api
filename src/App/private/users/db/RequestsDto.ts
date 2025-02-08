export interface BalanceUpdateDto {
    balance: number
    type: 'minus' | 'plus'
}

export interface OnlineUpdateDto {
    time: number
}