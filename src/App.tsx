import { Container, Typography, Fab } from "@mui/material";
import AddressForm from "./components/address-form";
import AddressList from "./components/address-list";
import { useEffect, useState } from "react";
import { UserRegister } from "./components/address-form/types";
import FilterListIcon from "@mui/icons-material/FilterList";
import AddressFilter from "./components/address-filter";

function App() {
  const [addresses, setAddresses] = useState<UserRegister[]>([]);
  const [filterDialogOpen, setFilterDialogOpen] = useState(false);

  useEffect(() => {
    const data = localStorage.getItem("addresses");
    if (data) {
      setAddresses(JSON.parse(data));
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

  return (
    <>
      <Container sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          Agenda de Endereços
        </Typography>

        <AddressForm onSubmit={addAddress} />

        <AddressList
          addresses={addresses}
          onUpdateName={updateName}
          onRemoveAddress={removeAddress}
        />

        <AddressFilter
          initialFilter={{}}
          open={filterDialogOpen}
          onClose={handleCloseFilterDialog}
          onFilterChange={(value) => console.log(value)}
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
