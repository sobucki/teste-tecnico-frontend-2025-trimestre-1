import { UserRegister } from "../address-form/types";

export type AddressListProps = {
  addresses: UserRegister[];
  onUpdateName: (id: string, newName: string) => void;
  onRemoveAddress: (id: string) => void;
  isFiltered: boolean;
};
