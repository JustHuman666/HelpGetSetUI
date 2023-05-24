export interface FullMigrant {
    id: number;
    isOfficialRefugee: boolean;
    isForcedMigrant: boolean;
    isCommonMigrant: boolean;
    familyStatus: string;
    amountOfChildren: number;
    isEmployed: boolean;
    housing: string;
    userId: number;

    userName: string;
    phoneNumber: string;
    firstName: string;
    lastName: string;
    birthday: Date;
    gender: string;

    countries: number[];
    posts: number[];
}