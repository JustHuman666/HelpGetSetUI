export interface Migrant {
    id: number;
    isOfficialRefugee: boolean;
    isForcedMigrant: boolean;
    isCommonMigrant: boolean;
    familyStatus: string;
    amountOfChildren: number;
    isEmployed: boolean;
    housing: string;
    userId: number;
}