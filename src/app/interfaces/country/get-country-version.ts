export interface GetCountryVersion {
    id: number;
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
    changeTime: Date;

    usersWhoChecked: number[];
}