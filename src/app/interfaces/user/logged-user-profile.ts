export interface LoggedUserProfile {
    id: number;
    userName: string;
    phoneNumber: string;
    firstName: string;
    lastName: string;
    birthday: Date;
    gender: string;

    countryVersionsChecked: number[];
    madeCountryChanges: number[];
    chatIds: number[];
    messageIds: number[];
    countries: number[];
    posts: number[];
}