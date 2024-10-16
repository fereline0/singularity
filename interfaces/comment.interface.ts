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
  likers: IUser[];
  _count: {
    childs: number;
    likers: number;
  };
}
