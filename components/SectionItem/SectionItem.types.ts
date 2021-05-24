export enum ButtonIcon {
  edit,
  add,
}

export interface SectionItemProps {
  onClick?: () => void;
  icon?: ButtonIcon;
  children?: React.ReactNode;
}
