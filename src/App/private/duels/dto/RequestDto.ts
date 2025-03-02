export interface DuelCreateDto {
    requester: string;
    opponent: string;
    amount: number;
    message: string;
}

export interface DuelUpdateDto {
    userId: string;
    item: number;
    player: 'first' | 'second';
}
