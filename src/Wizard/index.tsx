import * as React from "react";
import { useMachine } from "@xstate/react";
import { stages, stageMachine } from "./machine";
import Summary from "./Summary";
import StageIndicator from "./StageIndicator";
import { styled } from "@material-ui/styles";

const Container = styled("div")({
  margin: "50px"
});

export default function(props) {
  return (
    <Container>
      <Wizard {...props} />
    </Container>
  );
}

function Wizard({ values }) {
  const [current, send] = useMachine(stageMachine);

  if (current.matches("done")) {
    return <Summary data={current.context} handleReset={() => send("RESET")} />;
  }

  return (
    <div>
      <StageIndicator stages={stages} currentStageId={current.value} />
      {stages.map(stage => (
        <Stage
          key={stage.id}
          handleNext={response => send({ type: "NEXT", response })}
          isActive={current.matches(stage.id)}
          options={values[stage.id]}
          renderInput={stage.input}
        />
      ))}
    </div>
  );
}

function Stage({ isActive, renderInput, handleNext, options }) {
  return isActive && renderInput({ handleNext, options });
}
