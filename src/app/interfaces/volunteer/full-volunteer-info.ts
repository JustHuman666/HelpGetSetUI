export interface FullVolunteer {
    id: number;
    isOrganisation: boolean;
    hasAPlace: boolean;
    isATranslator: boolean;    
    userId: number;

    userName: string;
    phoneNumber: string;
    firstName: string;
    lastName: string;
    birthday: Date;
    gender: string;

    countries: number[];
    posts: number[];
}