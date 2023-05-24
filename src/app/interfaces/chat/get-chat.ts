export interface GetChat{
    id: number,
    creationDate: Date,
    chatName: string,

    userIds: number[],
    messageIds: number[]
}