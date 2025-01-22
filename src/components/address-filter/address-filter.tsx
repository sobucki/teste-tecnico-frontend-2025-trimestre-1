import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useState } from "react";
import { AddressFilterProps } from "./types";

function AddressFilter({
  initialFilter,
  onClose,
  onFilterChange,
  open,
}: AddressFilterProps) {
  const [userName, setUserName] = useState(initialFilter?.userName || "");
  const [displayName, setDisplayName] = useState(
    initialFilter?.displayName || ""
  );
  const [city, setCity] = useState(initialFilter?.displayName || "");
  const [state, setState] = useState(initialFilter?.state || "");

  const handleClearFilters = () => {
    setUserName("");
    setDisplayName("");
    setCity("");
    setState("");

    onClose();
  };

  const applyFilters = () => {
    onFilterChange({ city, displayName, state, userName });
    onClose();
  };

  return (
    <Dialog open={open} onClose={() => null} fullWidth maxWidth="sm">
      <DialogTitle>Filtros</DialogTitle>
      <DialogContent dividers>
        <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
          <TextField
            label="Nome do usuário"
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            label="Nome de exibição"
            type="text"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            label="Cidade"
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />

          <FormControl style={{ minWidth: 150 }}>
            <InputLabel id="estate-type-label">Estado</InputLabel>
            <Select
              labelId="estate-type-label"
              value={state}
              label="Estado"
              onChange={(e) => setState(e.target.value)}
            >
              <MenuItem value="">
                <em>Todos</em>
              </MenuItem>
              <MenuItem value="AC">Acre</MenuItem>
              <MenuItem value="AL">Alagoas</MenuItem>
              <MenuItem value="AP">Amapá</MenuItem>
              <MenuItem value="AM">Amazonas</MenuItem>
              <MenuItem value="BA">Bahia</MenuItem>
              <MenuItem value="CE">Ceará</MenuItem>
              <MenuItem value="DF">Distrito Federal</MenuItem>
              <MenuItem value="ES">Espírito Santo</MenuItem>
              <MenuItem value="GO">Goiás</MenuItem>
              <MenuItem value="MA">Maranhão</MenuItem>
              <MenuItem value="MT">Mato Grosso</MenuItem>
              <MenuItem value="MS">Mato Grosso do Sul</MenuItem>
              <MenuItem value="MG">Minas Gerais</MenuItem>
              <MenuItem value="PA">Pará</MenuItem>
              <MenuItem value="PB">Paraíba</MenuItem>
              <MenuItem value="PR">Paraná</MenuItem>
              <MenuItem value="PE">Pernambuco</MenuItem>
              <MenuItem value="PI">Piauí</MenuItem>
              <MenuItem value="RJ">Rio de Janeiro</MenuItem>
              <MenuItem value="RN">Rio Grande do Norte</MenuItem>
              <MenuItem value="RS">Rio Grande do Sul</MenuItem>
              <MenuItem value="RO">Rondônia</MenuItem>
              <MenuItem value="RR">Roraima</MenuItem>
              <MenuItem value="SC">Santa Catarina</MenuItem>
              <MenuItem value="SP">São Paulo</MenuItem>
              <MenuItem value="SE">Sergipe</MenuItem>
              <MenuItem value="TO">Tocantins</MenuItem>
            </Select>
          </FormControl>
        </div>
      </DialogContent>
      <DialogActions>
        <Button
          variant="outlined"
          color="secondary"
          onClick={handleClearFilters}
        >
          Limpar
        </Button>
        <Button variant="contained" color="primary" onClick={applyFilters}>
          Buscar
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default AddressFilter;
