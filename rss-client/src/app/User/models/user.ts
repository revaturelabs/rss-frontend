export interface User {
  userId: number,
  email: string,
  password: string,
  profilePic: any,
  firstName: string,
  lastName: string,
  admin: boolean,
  userDiscounted: boolean,
  userDiscount: number
}
