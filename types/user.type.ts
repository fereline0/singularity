import IBan from "./ban.type";
import IRole from "./role.type";
import { IUserComment } from "./userComment";

export default interface IUser {
  id: number;
  name: string;
  email: string;
  image: string;
  createdAt: string;
  updatedAt: string;
  detailInformation: any;
  role: IRole;
  subscribers: any[];
  subscribed: any[];
  comments: IUserComment[];
  writerComments: IUserComment[];
  bans: IBan[];
  _count: any;
}
