import * as React from "react";
import { Formik, Form as FormikForm } from "formik";
import * as yup from "yup";
import Grid from "@material-ui/core/Grid";
import Select from "@material-ui/core/Select";
import { NextButton } from "./common";
import { InputLabel, MenuItem } from "@material-ui/core";

const validationSchema = yup.object().shape({
  pet: yup.string().required()
});

export default function PetForm({ handleNext, options }) {
  return (
    <Formik
      initialValues={{ pet: "" }}
      onSubmit={handleNext}
      validationSchema={validationSchema}
    >
      {props => (
        <Form
          values={props.values}
          handleChange={props.handleChange}
          isValid={props.isValid}
          pets={options.pets}
        />
      )}
    </Formik>
  );
}

function Form({ values, handleChange, pets, isValid }) {
  return (
    <FormikForm>
      <Grid
        container
        direction="row"
        justify="center"
        alignItems="center"
        spacing={16}
      >
        <Grid item>
          <InputLabel htmlFor="pet">What kind of pet do you have?</InputLabel>
        </Grid>
        <Grid item>
          <Select
            value={values.pet}
            onChange={handleChange}
            inputProps={{
              name: "pet",
              id: "pet"
            }}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {pets.map(pet => (
              <MenuItem key={pet} value={pet}>
                {pet}
              </MenuItem>
            ))}
          </Select>
        </Grid>
      </Grid>

      <Grid container direction="column" alignItems="center" spacing={24}>
        <Grid item>
          <NextButton disabled={!isValid} />
        </Grid>
      </Grid>
    </FormikForm>
  );
}
