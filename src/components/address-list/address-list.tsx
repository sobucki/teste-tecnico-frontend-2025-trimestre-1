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
  Box,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  DialogActions,
} from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { AddressListProps } from "./types";
import { useState } from "react";
import { UserRegister } from "../address-form/types";
import SearchOffIcon from "@mui/icons-material/SearchOff";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

function AddressList({
  addresses,
  onUpdateName,
  onRemoveAddress,
  isFiltered,
}: AddressListProps) {
  const [addressIdEdition, setAddressIdEdition] = useState<string | null>();
  const [newName, setNewName] = useState("");

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [addressToDelete, setAddressToDelete] = useState<string | null>(null);

  const handleEdit = (address: UserRegister) => {
    setAddressIdEdition(address.id);
    setNewName(address.displayName);
  };

  const handleSave = (id: string) => {
    onUpdateName(id, newName);
    setAddressIdEdition(null);
  };

  const handleOpenDeleteDialog = (id: string) => {
    setAddressToDelete(id);
    setDeleteDialogOpen(true);
  };

  const handleCancelDelete = () => {
    setDeleteDialogOpen(false);
    setAddressToDelete(null);
  };

  const handleConfirmDelete = () => {
    if (addressToDelete) {
      onRemoveAddress(addressToDelete);
    }

    setDeleteDialogOpen(false);
    setAddressToDelete(null);
  };

  return (
    <>
      <TableContainer component={Paper} sx={{ mt: 4 }}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Usuário</TableCell>
              <TableCell>Nome</TableCell>
              <TableCell sx={{ display: { xs: "none", sm: "table-cell" } }}>
                Logradouro
              </TableCell>
              <TableCell sx={{ display: { xs: "none", sm: "table-cell" } }}>
                CEP
              </TableCell>
              <TableCell sx={{ display: { xs: "none", sm: "table-cell" } }}>
                Cidade
              </TableCell>
              <TableCell sx={{ display: { xs: "none", sm: "table-cell" } }}>
                Estado
              </TableCell>
              <TableCell>Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {addresses.length === 0 ? (
              <EmptyList isFilterApplied={isFiltered} />
            ) : (
              addresses.map((address) => (
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
                  <TableCell sx={{ display: { xs: "none", sm: "table-cell" } }}>
                    {address.street}
                  </TableCell>
                  <TableCell sx={{ display: { xs: "none", sm: "table-cell" } }}>
                    {address.cep}
                  </TableCell>
                  <TableCell sx={{ display: { xs: "none", sm: "table-cell" } }}>
                    {address.city}
                  </TableCell>
                  <TableCell sx={{ display: { xs: "none", sm: "table-cell" } }}>
                    {address.state}
                  </TableCell>
                  <TableCell>
                    {addressIdEdition === address.id ? (
                      <>
                        <Button
                          size="small"
                          onClick={() => handleSave(address.id)}
                        >
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
                        <Tooltip title="Editar">
                          <IconButton
                            color="primary"
                            aria-label="edit-button"
                            onClick={() => handleEdit(address)}
                          >
                            <EditIcon />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Remover">
                          <IconButton
                            color="secondary"
                            aria-label="delete-button"
                            onClick={() => handleOpenDeleteDialog(address.id)}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </Tooltip>
                      </>
                    )}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={deleteDialogOpen} onClose={handleCancelDelete}>
        <DialogTitle>Confirmar Remoção</DialogTitle>
        <DialogContent dividers>
          <Typography>Tem certeza que deseja remover este endereço?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelDelete} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleConfirmDelete} color="error" autoFocus>
            Remover
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

function EmptyList({ isFilterApplied }: { isFilterApplied: boolean }) {
  return (
    <TableRow>
      <TableCell colSpan={7} align="center">
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          width="100%"
          color="text.secondary"
        >
          {isFilterApplied ? (
            <>
              <SearchOffIcon sx={{ mr: 1 }} />
              Nenhum dado encontrado para esse filtro
            </>
          ) : (
            <>
              <InfoOutlinedIcon sx={{ mr: 1 }} />
              Nenhum dado encontrado
            </>
          )}
        </Box>
      </TableCell>
    </TableRow>
  );
}

export default AddressList;
