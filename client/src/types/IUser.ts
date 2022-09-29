export default interface IUser {
   _id: string,
   email: string,
   name: string,
   password: string,
   role: number,
   createdAt: Date,
   updatedAt: Date,
   __v: number
}