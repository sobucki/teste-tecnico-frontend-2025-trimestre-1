import { Container, Typography, Grid } from "@mui/material";
import AddressForm from "./components";

function App() {
  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Agenda de Endereços
      </Typography>

      <AddressForm />

      {/* <Grid container spacing={2}>
        <Grid item xs={12} md={6}></Grid>
      </Grid> */}
    </Container>
  );
}

export default App;
