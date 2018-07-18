export interface NavItemProps {
  path: string;
  id: string;
  iconName: string;
  match(path: string): boolean;
}
