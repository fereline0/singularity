import { VariantProps } from "@nextui-org/react";
import { DropdownItem } from "@nextui-org/dropdown";

export default interface IDropdownItem {
  key: string;
  value: string;
  icon: React.ReactNode;
  action: () => void;
  color?: VariantProps<typeof DropdownItem>["color"];
  isDisabled?: boolean;
}
