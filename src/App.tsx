import { Container, Typography, Fab } from "@mui/material";
import AddressForm from "./components/address-form";
import AddressList from "./components/address-list";
import { useEffect, useState } from "react";
import { UserRegister } from "./components/address-form/types";
import FilterListIcon from "@mui/icons-material/FilterList";
import AddressFilter from "./components/address-filter";
import { FilterOptions } from "./components/address-filter/types";

function App() {
  const [addresses, setAddresses] = useState<UserRegister[]>([]);
  const [filteredAddress, setFilteredAddress] = useState<UserRegister[]>([]);
  const [filterDialogOpen, setFilterDialogOpen] = useState(false);

  useEffect(() => {
    const data = localStorage.getItem("addresses");
    if (data) {
      setAddresses(JSON.parse(data));
      setFilteredAddress(JSON.parse(data));
    }
  }, []);

  const saveAddressesLocalStorage = (list: UserRegister[]) => {
    localStorage.setItem("addresses", JSON.stringify(list));
  };

  const addAddress = (address: UserRegister) => {
    const newList = [...addresses, address];
    setAddresses(newList);
    saveAddressesLocalStorage(newList);
  };

  const updateName = (id: string, newName: string) => {
    const updatedAddresses = addresses.map((address) => {
      if (address.id === id) {
        return { ...address, displayName: newName };
      }
      return address;
    });
    saveAddressesLocalStorage(updatedAddresses);
    setAddresses(updatedAddresses);
  };

  const removeAddress = (id: string) => {
    const updatedAddresses = addresses.filter((address) => address.id !== id);
    saveAddressesLocalStorage(updatedAddresses);
    setAddresses(updatedAddresses);
  };

  const handleOpenFilterDialog = () => {
    setFilterDialogOpen(true);
  };

  const handleCloseFilterDialog = () => {
    setFilterDialogOpen(false);
  };

  const handleFilter = (filter: FilterOptions) => {
    let temp = [...addresses];

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

    setFilteredAddress(temp);
  };

  return (
    <>
      <Container sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          Agenda de Endereços
        </Typography>

        <AddressForm onSubmit={addAddress} />

        <AddressList
          addresses={filteredAddress}
          onUpdateName={updateName}
          onRemoveAddress={removeAddress}
        />

        <AddressFilter
          initialFilter={{}}
          open={filterDialogOpen}
          onClose={handleCloseFilterDialog}
          onFilterChange={handleFilter}
        />

        <Fab
          color="primary"
          aria-label="filter"
          onClick={handleOpenFilterDialog}
          sx={{ position: "fixed", bottom: 16, right: 16 }}
        >
          <FilterListIcon />
        </Fab>
      </Container>
    </>
  );
}

export default App;
