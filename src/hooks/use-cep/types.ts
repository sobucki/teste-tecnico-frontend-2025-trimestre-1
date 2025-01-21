import { CEP } from "cep-promise";

export type useCepPromiseInput = { cep: string };

export type resultSuccess = CEP;
export type resultError = {
  message: string;
  errors: Array<{
    message: string;
    service: string;
  }>;
};
export type useCepPromiseResult = resultSuccess | resultError;
