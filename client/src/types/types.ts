export interface User {
    userId: string;
    userName: string;
    accounts: string[];
}

export interface Account {
    id: string;
    cash: number;
    credit: number;
    permittedUsers: string[];
}
