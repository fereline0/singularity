import IArticle from "./article.interface";
import ILiker from "./liker.interface";

export default interface IArticleLiker extends ILiker {
  article: IArticle;
}
