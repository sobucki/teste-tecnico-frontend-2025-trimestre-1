import { z } from "zod";
import { addressSchema } from "./validation";

export type UserAddress = z.infer<typeof addressSchema>;

export type UserRegister = {
  id: string;
  cep: string;
  state: string;
  city: string;
  street: string;
  neighborhood: string;
} & UserAddress;

export type AddressFormProps = {
  onSubmit: (address: UserRegister) => void;
};
