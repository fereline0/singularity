import IUser from "./user.interface";

export default interface IUserDetailInformation {
  id: number;
  aboutMe: string;
  occupation: string;
  interests: string;
  gender: string;
  bithday: string;
  user: IUser;
}
