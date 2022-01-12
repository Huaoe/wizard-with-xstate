import * as React from "react";
import { Formik, Form as FormikForm } from "formik";
import * as yup from "yup";
import Checkbox from "@material-ui/core/Checkbox";
import Grid from "@material-ui/core/Grid";
import { NextButton } from "./common";

const validationSchema = yup.object().shape({
  likesIceCream: yup.boolean().required()
});

export default function IceCreamForm({ handleNext }) {
  return (
    <Formik
      initialValues={{ likesIceCream: false }}
      onSubmit={handleNext}
      validationSchema={validationSchema}
    >
      {props => (
        <Form values={props.values} handleChange={props.handleChange} />
      )}
    </Formik>
  );
}

function Form({ values, handleChange }) {
  return (
    <FormikForm>

      <Grid container direction="column" alignItems="center" spacing={16}>
        <Grid item>
          <div>
            <label>Do you like ice cream?</label>
            <Checkbox
              id="likesIceCream"
              value={values.likesIceCream}
              onChange={handleChange}
            />
          </div>
        </Grid>
      </Grid>

      
      <Grid container direction="column" alignItems="center" spacing={24}>
        <Grid item>
          <NextButton />
        </Grid>
      </Grid>
    </FormikForm>
  );
}
