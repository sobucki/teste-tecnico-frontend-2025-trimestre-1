import { useCallback, useState } from "react";
import { UserRegister } from "../../components/address-form/types";
import { FilterOptions } from "../../components/address-filter/types";

export const useAddress = () => {
  const [addresses, setAddresses] = useState<UserRegister[]>(
    localStorage.getItem("addresses")
      ? JSON.parse(localStorage.getItem("addresses") as string)
      : []
  );

  const [filteredList, setFilteredList] = useState<UserRegister[]>(addresses);

  const [currentFilter, setCurrentFilter] = useState<FilterOptions>({});

  const saveAddressesLocalStorage = (list: UserRegister[]) => {
    localStorage.setItem("addresses", JSON.stringify(list));
  };

  const addAddress = useCallback(
    (address: UserRegister) => {
      const newList = [...addresses, address];
      setAddresses(newList);
      updateFilteredAddress(newList, currentFilter);
      saveAddressesLocalStorage(newList);
    },
    [addresses, currentFilter]
  );

  const updateFilter = useCallback(
    (filter: FilterOptions) => {
      setCurrentFilter(filter);
      updateFilteredAddress(addresses, filter);
    },
    [addresses]
  );

  const updateName = useCallback(
    (id: string, newName: string) => {
      const updatedAddresses = addresses.map((address) => {
        if (address.id === id) {
          return { ...address, displayName: newName };
        }
        return address;
      });
      saveAddressesLocalStorage(updatedAddresses);
      updateFilteredAddress(updatedAddresses, currentFilter);
      setAddresses(updatedAddresses);
    },
    [addresses, currentFilter]
  );

  const updateFilteredAddress = (
    list: UserRegister[],
    filter: FilterOptions
  ) => {
    let temp = [...list];
    if (filter.userName) {
      temp = temp.filter((address) =>
        address.user
          .toLowerCase()
          .includes(filter.userName?.toLowerCase().trim() || "")
      );
    }

    if (filter.displayName) {
      temp = temp.filter((address) =>
        address.displayName
          .toLowerCase()
          .includes(filter.displayName?.toLowerCase().trim() || "")
      );
    }

    if (filter.city) {
      temp = temp.filter((address) =>
        address.city
          .toLowerCase()
          .includes(filter.city?.toLowerCase().trim() || "")
      );
    }

    if (filter.state) {
      temp = temp.filter((address) =>
        address.state.toLowerCase().includes(filter.state?.toLowerCase() || "")
      );
    }

    setFilteredList(temp);
  };

  const removeAddress = useCallback(
    (id: string) => {
      const updatedAddresses = addresses.filter((address) => address.id !== id);
      saveAddressesLocalStorage(updatedAddresses);
      setAddresses(updatedAddresses);
      updateFilteredAddress(updatedAddresses, currentFilter);
    },
    [addresses, currentFilter]
  );

  return {
    addAddress,
    addresses,
    currentFilter,
    filteredList,
    removeAddress,
    updateFilter,
    updateName,
  };
};
