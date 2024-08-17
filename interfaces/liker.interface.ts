import IUser from "./user.interface";

export default interface ILiker {
  id: string;
  createdAt: string;
  liker: IUser;
}
