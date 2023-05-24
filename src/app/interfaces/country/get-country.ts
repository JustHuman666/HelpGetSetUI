export interface GetCountry {
    id: number;
    name: string;
    shortName: string;

    countryVersionsIds: number[];
    userIds: number[];
    postIds: number[];
}