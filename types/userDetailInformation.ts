import IUser from "./user.type";

export default interface IUserDetailInformation {
  id: number;
  aboutMe: string;
  occupation: string;
  interests: string;
  gender: string;
  bithday: string;
  user: IUser;
}
