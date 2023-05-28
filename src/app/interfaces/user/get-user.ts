export interface GetUser {
    id: number;
    userName: string;
    phoneNumber: string;
    firstName: string;
    lastName: string;
    birthday: Date;
    gender: string;
    originalCountryId: number;
    currentCountryId: number;

    posts: number[];
}