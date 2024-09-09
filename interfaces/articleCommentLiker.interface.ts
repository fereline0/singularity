import { IArticleComment } from "./articleComment.interface";
import ILiker from "./liker.interface";

export default interface IArticleCommentLiker extends ILiker {
  articleComment: IArticleComment;
}
