import IUserRole from "./userRole.type";
import { IUserComment } from "./userComment";
import IUserDetailInformation from "./userDetailInformation";
import IUserBan from "./userBan.type";

export default interface IUser {
  id: string;
  name: string;
  email: string;
  image: string;
  createdAt: string;
  updatedAt: string;
  detailInformation: IUserDetailInformation;
  role: IUserRole;
  comments: IUserComment[];
  writerComments: IUserComment[];
  bans: IUserBan[];
  _count: any;
}
