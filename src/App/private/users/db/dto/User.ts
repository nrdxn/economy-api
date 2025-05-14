interface UserDto {
    user: string;
    transactions: TransactionsDto;
    generalVoice: number;
    weekVoice: number;
    balance: number;
    invites: number;
    earnFromInvites: number;
    timelyKd: number;
    timely: boolean;
    timelyNotifications: boolean;
}