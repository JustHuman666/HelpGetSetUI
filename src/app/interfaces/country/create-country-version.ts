export interface CreateCountryVersion {
    registrationInfo: string;
    employmentInfo: string;
    taxInfo: string;
    insuranceInfo: string;
    supportInfo: string;
    changeTime: Date;

    authorId: number;
    countryId: number;
    authorUsername: string;
    
    usersWhoChecked: number[];
}