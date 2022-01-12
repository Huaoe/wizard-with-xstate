import * as React from "react";
import { Formik, Form as FormikForm } from "formik";
import * as yup from "yup";
import Grid from "@material-ui/core/Grid";
import Select from "@material-ui/core/Select";
import { NextButton } from "./common";
import { InputLabel, MenuItem } from "@material-ui/core";

const validationSchema = yup.object().shape({
  hair: yup.string().required()
});

export default function HairForm({ handleNext, options }) {
  return (
      <Formik
        initialValues={{ hair: "" }}
        onSubmit={handleNext}
        validationSchema={validationSchema}
      >
        {props => (
          <Form
            values={props.values}
            handleChange={props.handleChange}
            isValid={props.isValid}
            types={options.types}
          />
        )}
      </Formik>
  );
}

function Form({ values, handleChange, types, isValid }) {
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
          <InputLabel htmlFor="pet">How about your hair?</InputLabel>
        </Grid>
        <Grid item>
          <Select
            value={values.hair}
            onChange={handleChange}
            inputProps={{
              name: "hair",
              id: "hair"
            }}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {types.map(hairType => (
              <MenuItem key={hairType} value={hairType}>
                {hairType}
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
