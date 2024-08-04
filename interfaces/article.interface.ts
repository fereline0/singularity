import { IArticleComment } from "./articleComment.interface";
import ISection from "./section.interface";
import IUser from "./user.interface";

export default interface IArticle {
  id: number;
  createdAt: string;
  updatedAt: string;
  published: boolean;
  title: string;
  value: string;
  writer: IUser;
  section: ISection;
  comments: IArticleComment[];
  _count: any;
}
