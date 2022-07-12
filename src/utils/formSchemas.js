
import * as Yup from "yup";

export const CommentSchema = Yup.object().shape({
  name: Yup.string().required("Este campo es requerido"),
  email: Yup.string().email("Ingresa un email válido").required("Este campo es requerido"),
  comment: Yup.string().required('Este campo es requerido'),
});
