import ILiker from "./liker.interface";
import { IUserComment } from "./userComment.interface";

export default interface IUserCommentLiker extends ILiker {
  userComment: IUserComment;
}
