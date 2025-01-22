import { Container, Typography, Grid } from "@mui/material";
import AddressForm from "./components/address-form";
import AddressList from "./components/address-list";
import { useState } from "react";
import { UserRegister } from "./components/address-form/types";

function App() {
  const [addresses, setAddresses] = useState<UserRegister[]>([]);

  const addAddress = (address: UserRegister) => {
    setAddresses([...addresses, address]);
  };

  const updateName = (id: string, newName: string) => {
    const updatedAddresses = addresses.map((address) => {
      if (address.id === id) {
        return { ...address, displayName: newName };
      }
      return address;
    });

    setAddresses(updatedAddresses);
  };
  console.log(addresses);

  const removeAddress = (id: string) => {
    const updatedAddresses = addresses.filter((address) => address.id !== id);
    setAddresses(updatedAddresses);
  };

  return (
    <>
      <Container sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          Agenda de Endereços
        </Typography>

        <AddressForm onSubmit={addAddress} />

        {/* <Grid container spacing={2}>
        <Grid item xs={12} md={6}></Grid>
        </Grid> */}
        <AddressList
          addresses={addresses}
          onUpdateName={updateName}
          onRemoveAddress={removeAddress}
        />
      </Container>
    </>
  );
}

export default App;
