export interface CreateMigrant {
    isOfficialRefugee: boolean;
    isForcedMigrant: boolean;
    isCommonMigrant: boolean;
    familyStatus: string;
    amountOfChildren: number;
    isEmployed: boolean;
    housing: string;
    userId: number;
}