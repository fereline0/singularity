import IUser from "./user.interface";

export default interface IComment {
  id: string;
  value: string;
  createdAt: string;
  updatedAt: string;
  parentId: string;
  parent: IComment;
  writerId: string;
  writer: IUser;
  _count: any;
}
