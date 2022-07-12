import {Box, Button, TextField, Typography} from "@mui/material";
import { useFormik, Form, FormikProvider } from "formik";
import { FocusError } from 'focus-formik-error'
import {CommentSchema} from "../../utils/formSchemas";
// import * as sgMail from '@sendgrid/mail';

export default function ContactForm() {
  const formSavedData = JSON.parse(localStorage.getItem('formFields'))
  // const sendGridApiKey = process.env.REACT_APP_SENDGRID_API;

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
        // const message = {
        //   from: values.email,
        //   to: 'contacto@kamiranime.cl',
        //   subject: 'Formulario de contacto',
        //   text: values.comment,
        // }
        // await sgMail.send(message).then(() => {
        //   console.log('message sent!');
        // });
        resetForm();
        setSubmitting(false);
      } catch (error) {
        console.error(error);
        setSubmitting(false);
      }
    },
  });

  const { errors, touched, isValid, isSubmitting, handleSubmit, getFieldProps } = formik;



  return (
    <FormikProvider value={formik}>
      <Form autoComplete='off' noValidate onSubmit={handleSubmit}>
        <FocusError formik={formik} />
        <Box>

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

          <Typography sx={{mt: 3, mb: 2}}>Tu Mensaje *</Typography>
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


        </Box>
        <Box display='flex' justifyContent='center' mt={2}>
          <Button sx={{ backgroundColor: '#DB2E71', color: '#fff' }} type='submit' disabled={isSubmitting || !isValid}>
            {isSubmitting && 'Enviando...'}
            {!isSubmitting && 'Enviar'}
          </Button>
        </Box>
      </Form>
    </FormikProvider>
  )
}
