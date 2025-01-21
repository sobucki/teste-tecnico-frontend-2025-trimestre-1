import { useCallback, useState } from "react";
import cepPromise from "cep-promise";
import { resultError, useCepPromiseResult } from "./types";

export const useCep = () => {
  const [isLoading, setIsLoading] = useState(false);

  const searchCEP = useCallback(
    async (cep: string): Promise<useCepPromiseResult> => {
      setIsLoading(true);

      try {
        const response = await cepPromise(cep);
        return response;
      } catch (error: unknown) {
        if (error instanceof Error && error.name === "CepPromiseError") {
          const cepError = error as unknown as resultError;
          return {
            message: cepError.message,
            errors: cepError.errors ?? [],
          };
        }

        return {
          message: "Unexpected error",
          errors: [],
        };
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  return {
    searchCEP,
    isLoading,
  };
};
