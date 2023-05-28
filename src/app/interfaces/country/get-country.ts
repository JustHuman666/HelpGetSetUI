export interface GetCountry {
    id: number;
    name: string;
    shortName: string;

    countryVersionsIds: number[];
    usersInIds: number[];
    usersFromIds: number[];
    postIds: number[];
}