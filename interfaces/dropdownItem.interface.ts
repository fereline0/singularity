import { DropdownItem, VariantProps } from "@nextui-org/react";

export default interface IDropdownItem {
  key: string;
  value: string;
  icon: JSX.Element;
  action: () => void;
  color?: VariantProps<typeof DropdownItem>["color"];
  isDisabled?: boolean;
}
