import * as React from "react";
import Button from "@material-ui/core/Button";
import Typography from '@material-ui/core/Typography';

export default function Summary({ data, handleReset }) {
  const iceCreamStatement = data.likesIceCream
    ? `enjoys a scoop from time to time with their ${data.pet}`
    : `is a dang fool`;
  const summaryStatement = `${data.name}, age ${data.age}, with the ${
    data.hair
  } hair, ${iceCreamStatement}.`;

  return (
    <div>
      <Typography variant="h1">Done!</Typography>
      <Typography variant="body1" paragraph>{summaryStatement}</Typography>
      <Button color="primary" onClick={handleReset}>Reset</Button>
    </div>
  );
}
