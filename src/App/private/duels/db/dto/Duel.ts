interface DuelDto {
    requester: string;
    opponent: string;
    amount: number;
    message: string;
    first: PlayerField;
    second: PlayerField;
}