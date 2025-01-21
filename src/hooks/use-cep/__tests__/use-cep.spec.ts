import { act, renderHook, waitFor } from "@testing-library/react";
import { useCep } from "../use-cep";
import cepPromise from "cep-promise";
import { Mock } from "vitest";
import { resultError } from "../types";

vi.mock("cep-promise", () => {
  return {
    __esModule: true,
    default: vi.fn(),
  };
});

describe("use-cep tests", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should initialize useCEP with the correct values", () => {
    const { result } = renderHook(() => useCep());

    expect(result.current.isLoading).toBe(false);
    expect(result.current.searchCEP).toBeInstanceOf(Function);
  });

  it("should set isLoading to false after a successful call", async () => {
    (cepPromise as Mock).mockResolvedValueOnce({
      cep: "05010000",
      state: "SP",
      city: "São Paulo",
      street: "Rua Caiubí",
      neighborhood: "Perdizes",
    });

    const { result } = renderHook(() => useCep());

    act(() => {
      result.current.searchCEP("12345678");
    });

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });
  });

  it("should return a address when call API with success", async () => {
    (cepPromise as Mock).mockResolvedValueOnce({
      cep: "05010000",
      state: "SP",
      city: "São Paulo",
      street: "Rua Caiubí",
      neighborhood: "Perdizes",
    });

    const { result } = renderHook(() => useCep());

    let response;
    await act(async () => {
      response = await result.current.searchCEP("05010000");
    });

    expect(result.current.isLoading).toBe(false);

    expect(response).toEqual({
      cep: "05010000",
      state: "SP",
      city: "São Paulo",
      street: "Rua Caiubí",
      neighborhood: "Perdizes",
    });
  });

  it("should handle error when API return a erro typed CepPromiseError", async () => {
    const serviceError = {
      name: "CepPromiseError",
      message: "Todos os serviços de CEP retornaram erro.",
      type: "service_error",
      errors: [
        {
          message: "CEP NAO ENCONTRADO",
          service: "correios",
        },
        {
          message: "CEP não encontrado na base do ViaCEP.",
          service: "viacep",
        },
      ],
    };

    const error = new Error(serviceError.message) as Error & resultError;
    error.name = serviceError.name;
    error.errors = serviceError.errors;
    (cepPromise as Mock).mockRejectedValueOnce(error);

    const { result } = renderHook(() => useCep());

    let errorResponse;
    await act(async () => {
      errorResponse = await result.current.searchCEP("INVALID_CEP");
    });

    expect(result.current.isLoading).toBe(false);

    expect(errorResponse).toEqual({
      message: "Todos os serviços de CEP retornaram erro.",
      errors: [
        {
          message: "CEP NAO ENCONTRADO",
          service: "correios",
        },
        {
          message: "CEP não encontrado na base do ViaCEP.",
          service: "viacep",
        },
      ],
    });
  });

  it("should handle error when API return a erro unexpected error", async () => {
    const error = new Error("Unexpected error") as Error & resultError;

    (cepPromise as Mock).mockRejectedValueOnce(error);

    const { result } = renderHook(() => useCep());

    let errorResponse;
    await act(async () => {
      errorResponse = await result.current.searchCEP("12345678");
    });

    expect(result.current.isLoading).toBe(false);

    expect(errorResponse).toEqual({
      message: "Unexpected error",
      errors: [],
    });
  });
});
