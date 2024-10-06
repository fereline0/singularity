import IAbility from "@/interfaces/ability.interface";

export function roleBenefits(
  currentUserRolePosition: number | undefined,
  rolePosition: number
) {
  return currentUserRolePosition && currentUserRolePosition > rolePosition;
}

export default function userCan(
  abilities: IAbility[] | undefined,
  ability: string
) {
  return abilities?.some((a) => a.slug == ability) ?? false;
}
