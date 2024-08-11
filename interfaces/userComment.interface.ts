import IComment from "./comment.interface";
import IUser from "./user.interface";

export interface IUserComment extends IComment {
  userId: string;
  user: IUser;
  likers: IUser[];
  childs: IUserComment[];
}
