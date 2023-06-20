export interface LoggedUserProfile {
    id: number;
    userName: string;
    phoneNumber: string;
    firstName: string;
    lastName: string;
    birthday: string;
    gender: number;
    originalCountryId: number;
    currentCountryId: number;

    countryVersionsChecked: number[];
    madeCountryChanges: number[];
    chatIds: number[];
    messageIds: number[];
    posts: number[];
}