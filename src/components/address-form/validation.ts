import { z } from "zod";

export const addressSchema = z.object({
  user: z
    .string()
    .nonempty("O nome do usuário é obrigatório")
    .max(40, "O nome do usuário deve ter no máximo 40 caracteres"),
  displayName: z
    .string()
    .nonempty("O nome de exibição é obrigatório")
    .max(20, "O nome de exibição deve ter no máximo 20 caracteres"),
  cep: z
    .string()
    .nonempty("O CEP é obrigatório")
    .regex(/^\d{5}-\d{3}$/, "Formato de CEP inválido. Use 99999-999."),
});
