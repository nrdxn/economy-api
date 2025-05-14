export interface RequestCreateOptionsDto {
    message?: string;
    answer?: any;
}

export interface RequestAnswerDto {
    status: boolean;
    code: number;
    message?: string;
    answer?: any;
}
