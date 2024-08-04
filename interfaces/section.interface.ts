import IArticle from "./article.interface";
import IUser from "./user.interface";

export default interface ISection {
  id: string;
  name: string;
  description: string;
  parentId: string;
  parent: ISection;
  childs: ISection[];
  articles: IArticle[];
  supervisors: IUser[];
  _count: any;
}
