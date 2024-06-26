import IBan from "./ban.type";
import IRole from "./role.type";
import { IUserComment } from "./userComment";
import IUserDetailInformation from "./userDetailInformation";

export default interface IUser {
  id: string;
  name: string;
  email: string;
  image: string;
  createdAt: string;
  updatedAt: string;
  detailInformation: IUserDetailInformation;
  role: IRole;
  subscribers: any[];
  subscribed: any[];
  comments: IUserComment[];
  writerComments: IUserComment[];
  bans: IBan[];
  _count: any;
}
