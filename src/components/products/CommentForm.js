import {Box, Button, TextField, Typography} from "@mui/material";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { useFormik, Form, FormikProvider } from "formik";
import { FocusError } from 'focus-formik-error'
import useSendComment from "../../hooks/api/useSendComment";
import {CommentSchema} from "../../utils/formSchemas";
import {useState, useContext} from "react";
import {AlertContext} from "../../context/AlertContext";

export default function CommentForm({ product, reload }) {
  const {send} = useSendComment(() => reload())
  const formSavedData = JSON.parse(localStorage.getItem('formFields'))
  const [isChecked, setChecked] = useState(!!formSavedData)


  const formik = useFormik({
    initialValues: {
      name: formSavedData ? formSavedData.name : '',
      email: formSavedData ? formSavedData.email : '',
      comment: '',
    },
    validationSchema: CommentSchema,
    onSubmit: async (values, { setSubmitting, resetForm}) => {
      try {
        setSubmitting(true);
        await send({...values, product: product});
        resetForm();
        setSubmitting(false);
      } catch (error) {
        console.error(error);
        setSubmitting(false);
      }
    },
  });

  const { errors, touched, isValid, isSubmitting, handleSubmit, getFieldProps } = formik;

  function handleSaveName(e) {
    console.log(e.target.checked, formik.values.name, formik.values.email)
    if (e.target.checked) {
      setChecked(true)
      localStorage.setItem('formFields', JSON.stringify({name: formik.values.name, email: formik.values.email}))
    } else {
      setChecked(false)
      localStorage.removeItem('formFields')
    }
  }


  return (
    <FormikProvider value={formik}>
      <Form autoComplete='off' noValidate onSubmit={handleSubmit}>
        <FocusError formik={formik} />
        <Box>
          <Typography sx={{mt: 3, mb: 2}}>Tu Review*</Typography>
          <TextField
            multiline
            minRows={7}
            {...getFieldProps("comment")}
            error={Boolean(touched.comment && errors.comment)}
            helperText={touched.comment && errors.comment}
            placeholder="Escribir texto aqui..."
            style={{
              width: '100%',
              borderColor: 'lightgray',
              borderRadius: '15px',
              padding: '1rem',
            }}
          />

          <Typography sx={{mt: 3, mb: 2}}>Tu nombre *</Typography>
          <TextField
            id="outlined-basic"
            variant="outlined"
            {...getFieldProps("name")}
            error={Boolean(touched.name && errors.name)}
            helperText={touched.name && errors.name}
            label='Nombre de contacto'
            sx={{width: '100%'}}
          />

          <Typography sx={{mt: 3, mb: 2}}>Tu email *</Typography>
          <TextField
            id="outlined-basic"
            variant="outlined"
            {...getFieldProps("email")}
            error={Boolean(touched.email && errors.email)}
            helperText={touched.email && errors.email}
            label='Email de contacto'
            sx={{width: '100%'}}
          />

          <FormControlLabel
            sx={{my: 5}}
            control={<Checkbox disabled={!formik.values.name || !formik.values.email} checked={isChecked} onChange={handleSaveName} />}
            label={<Typography variant="body1">Guarda mi nombre y página en este buscador para la próxima vez que
              comente.</Typography>}
          />

        </Box>
        <Button sx={{ backgroundColor: '#DB2E71', color: '#fff' }} type='submit' disabled={isSubmitting || !isValid}>
          {isSubmitting && 'Enviando...'}
          {!isSubmitting && 'Enviar'}
        </Button>
      </Form>
    </FormikProvider>
  )
}
