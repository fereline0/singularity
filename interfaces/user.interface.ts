import IUserRole from "./userRole.interface";
import { IUserComment } from "./userComment.interface";
import IUserDetailInformation from "./userDetailInformation.interface";
import IUserBan from "./userBan.interface";

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
