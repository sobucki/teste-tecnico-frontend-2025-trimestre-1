/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, Button, Stack, TextField } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import ReactInputMask from "react-input-mask";
import { useSnackbar } from "notistack";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import useCep from "../hooks/use-cep";
import { addressSchema } from "./validation";

function AddressForm() {
  const { enqueueSnackbar } = useSnackbar();
  const { searchCEP, isLoading } = useCep();

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(addressSchema),
    defaultValues: {
      user: "",
      displayName: "",
      cep: "",
    },
  });

  const onSubmit = async (formData: z.infer<typeof addressSchema>) => {
    try {
      const result = await searchCEP(formData.cep);
      console.log(result);

      if ("errors" in result) {
        enqueueSnackbar(`Erro ao buscar o CEP. ${result.message}`, {
          variant: "error",
        });
        return;
      }

      const { state, city, street, neighborhood } = result;

      const newAddress = {
        id: Date.now().toString(),
        user: formData.user,
        displayName: formData.displayName,
        cep: formData.cep,
        street,
        neighborhood,
        city,
        state,
      };

      console.log(newAddress);

      enqueueSnackbar("Endereço buscado e salvo com sucesso!", {
        variant: "success",
      });

      reset();
    } catch (error) {
      console.log(error);

      enqueueSnackbar("Falha ao buscar CEP.", { variant: "error" });
    }
  };

  return (
    <Box>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={2}>
          <Controller
            name="user"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Usuário"
                error={Boolean(errors.user)}
                helperText={errors.user?.message}
                fullWidth
              />
            )}
          />

          <Controller
            name="displayName"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Nome de Exibição"
                error={Boolean(errors.displayName)}
                helperText={errors.displayName?.message}
                fullWidth
              />
            )}
          />

          <Controller
            name="cep"
            control={control}
            render={({ field }) => (
              <ReactInputMask mask="99999-999" {...field}>
                {(inputProps: any) => (
                  <TextField
                    {...inputProps}
                    label="CEP"
                    error={Boolean(errors.cep)}
                    helperText={errors.cep?.message}
                    fullWidth
                  />
                )}
              </ReactInputMask>
            )}
          />

          <Button variant="contained" type="submit" disabled={isLoading}>
            {isLoading ? "Buscando..." : "Buscar Endereço"}
          </Button>
        </Stack>
      </form>
    </Box>
  );
}
export default AddressForm;
