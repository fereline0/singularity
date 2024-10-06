import IAbility from "./ability.interface";

export default interface IUserRole {
  id: string;
  name: string;
  position: number;
  abilities: IAbility[];
}
