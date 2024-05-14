import { toast } from "react-toastify";

export interface Error404 {
  name: string;
  message: string;
}

export interface Error422 {
  message: string;
  errors: any;
}
export function handleValidationError(error: any) {
  try {
    let err: Error422 = error.response.data;
    let errKeys = Object.keys(err.errors);
    let errValues: string[] = Object.values<string>(err.errors).flat();
    errKeys.forEach((key, index) => {
      toast.error(`${key}: ${errValues[index]}`);
    });

    toast.error(
      messageErrors[err.message] ||
        "Error de validación, por favor revisa los campos"
    );
  } catch (e) {
    toast.error("Error de validación, por favor revisa los campos");
  }
}

export const messageErrors: any = {
  LOAD_DATA_ERROR: "Error al cargar los datos",
  given_data_is_invalid: "Los datos proporcionados son inválidos",
};
