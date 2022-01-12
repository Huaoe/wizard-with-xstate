import * as React from "react";
import { Formik, Form as FormikForm } from "formik";
import * as yup from "yup";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import { NextButton } from "./common";

const validationSchema = yup.object().shape({
  email: yup
    .string()
    .email()
    .required(),
  name: yup.string().required(),
  age: yup
    .number()
    .positive()
    .integer()
    .required()
});

export default function ContactForm({ handleNext }) {
  return (
    <Formik
      initialValues={{ email: ``, name: ``, age: undefined }}
      onSubmit={handleNext}
      validationSchema={validationSchema}
    >
      {props => (
        <Form
          values={props.values}
          errors={props.errors}
          touched={props.touched}
          isValid={props.isValid}
          handleChange={props.handleChange}
        />
      )}
    </Formik>
  );
}

function Form({ values, errors, handleChange, isValid, touched }) {
  console.log("Why is `touched` always empty?", touched);
  return (
    <FormikForm>
      <Grid container direction="column" alignItems="center" spacing={16}>
        <Grid item>
          <TextField
            id="email"
            label="Email"
            value={values.email}
            onChange={handleChange}
            margin="normal"
            type="email"
            helperText={errors.email}
          />
        </Grid>
        <Grid item>
          <TextField
            id="name"
            label="Name"
            value={values.name}
            onChange={handleChange}
            margin="normal"
            helperText={errors.name}
          />
        </Grid>
        <Grid item>
          <TextField
            id="age"
            label="Age"
            value={values.age}
            onChange={handleChange}
            margin="normal"
            type="number"
            helperText={errors.age}
          />
        </Grid>
        <Grid item>
          <NextButton disabled={!isValid} />
        </Grid>
      </Grid>
    </FormikForm>
  );
}
