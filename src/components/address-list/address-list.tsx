import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  TextField,
  Button,
} from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { AddressListProps } from "./types";
import { useState } from "react";
import { UserRegister } from "../address-form/types";

function AddressList({
  addresses,
  onUpdateName,
  onRemoveAddress,
}: AddressListProps) {
  const [addressIdEdition, setAddressIdEdition] = useState<string | null>();
  const [newName, setNewName] = useState("");

  const handleEdit = (address: UserRegister) => {
    setAddressIdEdition(address.id);
    setNewName(address.displayName);
  };

  const handleSave = (id: string) => {
    onUpdateName(id, newName);
    setAddressIdEdition(null);
  };

  return (
    <TableContainer component={Paper} sx={{ mt: 4 }}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Usuário</TableCell>
            <TableCell>Nome</TableCell>
            <TableCell>Logradouro</TableCell>
            <TableCell>CEP</TableCell>
            <TableCell>Cidade</TableCell>
            <TableCell>Estado</TableCell>
            <TableCell>Ações</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {addresses.map((address) => (
            <TableRow key={address.id}>
              <TableCell>{address.user}</TableCell>
              <TableCell>
                {addressIdEdition === address.id ? (
                  <TextField
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    size="small"
                  />
                ) : (
                  address.displayName
                )}
              </TableCell>
              <TableCell>{address.street}</TableCell>
              <TableCell>{address.cep}</TableCell>
              <TableCell>{address.city}</TableCell>
              <TableCell>{address.state}</TableCell>
              <TableCell>
                {addressIdEdition === address.id ? (
                  <>
                    <Button size="small" onClick={() => handleSave(address.id)}>
                      Salvar
                    </Button>
                    <Button
                      size="small"
                      onClick={() => setAddressIdEdition(null)}
                    >
                      Cancelar
                    </Button>
                  </>
                ) : (
                  <>
                    <IconButton
                      color="primary"
                      onClick={() => handleEdit(address)}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      color="secondary"
                      onClick={() => onRemoveAddress(address.id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default AddressList;
