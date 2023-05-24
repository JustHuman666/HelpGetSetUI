export interface CreateCountryVersion {
    name: string;
    shortName: string;
    registrationInfo: string;
    employmentInfo: string;
    taxInfo: string;
    insuranceInfo: string;
    supportInfo: string;
    approvesAmount: number;
    disApprovesAmount: number;

    authorId: number;
    countryId: number;
}