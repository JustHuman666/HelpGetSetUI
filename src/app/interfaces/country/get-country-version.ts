export interface GetCountryVersion {
    id: number;
    name: string;
    shortName: string;
    authorId: number;
    countryId: number;
    authorUsername: string;
    registrationInfo: string;
    employmentInfo: string;
    taxInfo: string;
    insuranceInfo: string;
    supportInfo: string;
    approvesAmount: number;
    disApprovesAmount: number;

    usersWhoChecked: number[];
}