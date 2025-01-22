import { act, renderHook } from "@testing-library/react";
import { useAddress } from "../use-address";
import addressData from "./address-data.json";

const mockLocalStorage = (() => {
  let store: Record<string, string> = {};

  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = value;
    },
    removeItem: (key: string) => {
      delete store[key];
    },
    clear: () => {
      store = {};
    },
  };
})();

Object.defineProperty(window, "localStorage", {
  value: mockLocalStorage,
});

describe("use-address hook tests", () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  describe("initialization", () => {
    it("should initialize with empty list when localStorage is empty", () => {
      const { result } = renderHook(() => useAddress());

      expect(result.current.addresses).toEqual([]);
      expect(result.current.filteredList).toEqual([]);
    });

    it("should initialize list with localStorage value when it is not empty", () => {
      window.localStorage.setItem("addresses", JSON.stringify(addressData));
      const { result } = renderHook(() => useAddress());

      expect(result.current.addresses).toEqual(addressData);
      expect(result.current.filteredList).toEqual(addressData);
    });
  });

  describe("add and remove address", () => {
    it("should add new address to list and update filtered list", () => {
      const { result } = renderHook(() => useAddress());

      expect(result.current.addresses).toHaveLength(0);
      expect(result.current.filteredList).toHaveLength(0);

      const newAddress = {
        cep: "90245-235",
        city: "Porto Alegre",
        displayName: "Casa",
        id: "123",
        neighborhood: "Farrapos",
        street: "Rua Doze",
        state: "RS",
        user: "new-user",
      };

      act(() => {
        result.current.addAddress(newAddress);
      });

      expect(result.current.addresses).toEqual([newAddress]);
      expect(result.current.filteredList).toEqual([newAddress]);

      const stored = JSON.parse(
        window.localStorage.getItem("addresses") || "[]"
      );
      expect(stored).toHaveLength(1);
      expect(stored[0]).toEqual(newAddress);
    });

    it("should remove address from list and update filtered list", () => {
      window.localStorage.setItem("addresses", JSON.stringify(addressData));
      const { result } = renderHook(() => useAddress());

      expect(result.current.filteredList).toHaveLength(4);

      const selectedId = addressData[2].id;

      act(() => {
        result.current.removeAddress(selectedId);
      });

      expect(result.current.filteredList).toHaveLength(3);
      expect(
        result.current.filteredList.some((address) => address.id === selectedId)
      ).toBe(false);

      const stored = JSON.parse(
        window.localStorage.getItem("addresses") || "[]"
      );
      expect(
        stored.some((address: { id: string }) => address.id === selectedId)
      ).toBeFalsy();
      expect(stored).toHaveLength(3);
    });
  });

  describe("update display name", () => {
    it('should update display name of address and update "filteredList"', () => {
      window.localStorage.setItem("addresses", JSON.stringify(addressData));
      const { result } = renderHook(() => useAddress());

      const selectedAddress = addressData[2];
      act(() => {
        result.current.updateName(selectedAddress.id, "New display name");
      });

      expect(result.current.addresses[2].displayName).toBe("New display name");
      expect(result.current.filteredList[2].displayName).toBe(
        "New display name"
      );

      const stored = JSON.parse(
        window.localStorage.getItem("addresses") || "[]"
      );
      expect(stored[2].displayName).toBe("New display name");
    });
  });

  describe("filtering", () => {
    it('should filter list by user name and update "filteredList"', () => {
      window.localStorage.setItem("addresses", JSON.stringify(addressData));
      const { result } = renderHook(() => useAddress());

      expect(result.current.filteredList).toHaveLength(4);

      act(() => {
        result.current.updateFilter({ userName: "user-2" });
      });

      expect(result.current.filteredList).toHaveLength(1);
      expect(result.current.filteredList[0].user).toBe("user-2");
    });

    it('should filter list by displayName and update "filteredList"', () => {
      window.localStorage.setItem("addresses", JSON.stringify(addressData));
      const { result } = renderHook(() => useAddress());

      expect(result.current.filteredList).toHaveLength(4);

      act(() => {
        result.current.updateFilter({ displayName: "Casa" });
      });

      expect(result.current.filteredList).toHaveLength(2);
      expect(result.current.filteredList[0].displayName).toBe("Casa");
      expect(result.current.filteredList[1].displayName).toBe("Casa");
    });

    it('should filter list by city and update "filteredList"', () => {
      window.localStorage.setItem("addresses", JSON.stringify(addressData));
      const { result } = renderHook(() => useAddress());

      expect(result.current.filteredList).toHaveLength(4);

      act(() => {
        result.current.updateFilter({ city: "Brasília" });
      });

      expect(result.current.filteredList).toHaveLength(1);
      expect(result.current.filteredList[0].city).toBe("Brasília");
    });

    it('should filter list by state and update "filteredList"', () => {
      window.localStorage.setItem("addresses", JSON.stringify(addressData));
      const { result } = renderHook(() => useAddress());

      expect(result.current.filteredList).toHaveLength(4);

      act(() => {
        result.current.updateFilter({ state: "AC" });
      });

      expect(result.current.filteredList).toHaveLength(1);
      expect(result.current.filteredList[0].state).toBe("AC");
    });
  });
});
