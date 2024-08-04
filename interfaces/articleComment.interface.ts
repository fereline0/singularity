import IArticle from "./article.interface";
import IComment from "./comment.interface";

export interface IArticleComment extends IComment {
  articleId: string;
  article: IArticle;
  childs: IArticleComment[];
}
