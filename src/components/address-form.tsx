import { useState } from "react";
import { Box, TextField, Button, Stack } from "@mui/material";
import useCep from "../hooks/use-cep";
import { useSnackbar } from "notistack";

function AddressForm() {
  const { enqueueSnackbar } = useSnackbar();
  const [user, setUser] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [cep, setCep] = useState("");

  const { searchCEP, isLoading } = useCep();

  const handleSubmit = async () => {
    const result = await searchCEP(cep);
    console.log(result);

    if ("errors" in result) {
      return;
    }

    const { state, city, street, neighborhood } = result;

    const newAddress = {
      id: Date.now().toString(),
      user,
      displayName,
      cep,
      street,
      neighborhood,
      city,
      state,
    };

    setUser("");
    setDisplayName("");
    setCep("");

    enqueueSnackbar("Endereço buscado e salvo com sucesso!", {
      style: { backgroundColor: "green", color: "white" },
    });
  };

  return (
    <Box>
      <Stack spacing={2}>
        <TextField
          label="Usuário"
          value={user}
          onChange={(e) => setUser(e.target.value)}
          fullWidth
        />
        <TextField
          label="Nome de Exibição"
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
          fullWidth
        />
        <TextField
          label="CEP"
          value={cep}
          onChange={(e) => setCep(e.target.value)}
          fullWidth
        />

        <Button variant="contained" onClick={handleSubmit} disabled={isLoading}>
          {isLoading ? "Buscando..." : "Buscar Endereço"}
        </Button>
      </Stack>
    </Box>
  );
}
export default AddressForm;
