export interface User {
    userId: number,
    email: string,
    password: string,
    profilePic: Blob,
    firstName: string,
    lastName: string,
    admin: boolean,
    userCartIds: number[]
}