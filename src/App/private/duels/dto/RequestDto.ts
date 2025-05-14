interface DuelCreateDto {
    requester: string;
    opponent: string;
    amount: number;
    message: string;
}

interface DuelUpdateDto {
    userID: string;
    item: number;
    player: 'first' | 'second';
}
