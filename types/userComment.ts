import IComment from "./comment.type";
import IUser from "./user.type";

export interface IUserComment extends IComment {
  userId: string;
  user: IUser;
  childs: IUserComment[];
}
