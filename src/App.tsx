import { Container, Typography, Fab } from "@mui/material";
import AddressForm from "./components/address-form";
import AddressList from "./components/address-list";
import { useState } from "react";
import FilterListIcon from "@mui/icons-material/FilterList";
import AddressFilter from "./components/address-filter";
import { FilterOptions } from "./components/address-filter/types";
import useAddress from "./hooks/use-address";

function App() {
  const [filterDialogOpen, setFilterDialogOpen] = useState(false);

  const {
    addAddress,
    currentFilter,
    filteredList,
    removeAddress,
    updateFilter,
    updateName,
  } = useAddress();

  const handleOpenFilterDialog = () => {
    setFilterDialogOpen(true);
  };

  const handleCloseFilterDialog = () => {
    setFilterDialogOpen(false);
  };

  const handleFilter = (filter: FilterOptions) => {
    updateFilter(filter);
  };

  return (
    <>
      <Container sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          Agenda de Endereços
        </Typography>

        <AddressForm onSubmit={addAddress} />

        <AddressList
          addresses={filteredList}
          onUpdateName={updateName}
          onRemoveAddress={removeAddress}
          isFiltered={Object.keys(currentFilter).length > 0}
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
