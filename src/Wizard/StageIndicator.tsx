import * as React from "react";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import { styled } from "@material-ui/styles";

const Container = styled("div")({
  marginBottom: '2rem'
});

function StageIndicator({ stages, currentStageId }) {
  const activeStep = stages.findIndex(s => {
    return s.id === currentStageId;
  });

  return (
    <Container>
      <Stepper activeStep={activeStep} alternativeLabel>
        {stages.map(stage => {
          return (
            <Step key={stage.id}>
              <StepLabel>{stage.label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
    </Container>
  );
}

export default StageIndicator;
