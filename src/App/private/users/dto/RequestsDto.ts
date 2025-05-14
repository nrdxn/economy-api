interface BalanceUpdateDto {
    balance: number;
    type: 'minus' | 'plus';
    transaction: {
        operationType: string;
        operationAmount: number;
        operationDate: number;
    };
}

type LeaderboardSortType = 'generalVoice' | 'weekVoice' | 'balance';

interface LeaderboardDto {
    type: LeaderboardSortType;
    currentUser: string;
}

interface OnlineUpdateDto {
    time: number;
}

interface LeaderbordMap {
    text: string[];
    positions: string[];
}

interface FortmattedTime {
    hours: number;
    minutes: number;
}
