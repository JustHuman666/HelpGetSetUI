export interface RegisterUser{
    phoneNumber: string;
    userName: string;
    firstName: string;
    lastName: string;
    password: string;
    birthday: Date;
    gender: string;
    originalCountryId: number;
    currentCountryId: number;
}