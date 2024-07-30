import IUser from "./user.interface";

export default interface IUserBan {
  id: number;
  createdAt: string;
  user: IUser;
  reason?: string;
  activity: boolean;
  expires: string;
  initiator: IUser;
  _count: any;
}
