import { Machine, assign } from "xstate";
import { createStateSequence } from "./createStateSequence";
import ContactForm from "../forms/Contact";
import IceCreamForm from "../forms/IceCream";
import PetForm from "../forms/Pet";
import HairForm from "../forms/Hair";

interface Context {
  name: string;
  email: string;
  age: number;
  likesIceCream: boolean;
  pet: string;
  hair: string;
}

interface StateSchema {
  states: {
    contact: {};
    "ice-cream": {};
    pet: {};
    hair: {};
    done: {};
  };
}

type Event = { type: "NEXT"; response: {} } | { type: "RESET" };

// Guard implementations
const isValidName = ((_, event) =>
  event.response && event.response.length > 2) as any;
const isValidAge = ((_, event) => event.response && event.response > 0) as any;

// Action implementations
const setContact = assign({
  name: (_, value) => value.response.name,
  email: (_, value) => value.response.email,
  age: (_, value) => value.response.age
});
const setLikesIceCream = assign({
  likesIceCream: (_, value) => value.response.likesIceCream
});
const setPet = assign({ pet: (_, value) => value.response.pet });
const setHair = assign({ hair: (_, value) => value.response.hair });
const reset = assign(() => stageMachine.context);

type InputProps = {
  handleNext: ({ handleNext }: { handleNext: (response) => void }) => Element;
};

type Stage = {
  id: string;
  label: string;
  actions: string[];
  cond?: { type: string };
  input: React.FunctionComponent<InputProps>;
};
// Stage definition
// The Wizard will respect the order given here.
export const stages: Stage[] = [
  {
    id: "contact",
    label: "Contact",
    actions: ["setContact"],
    input: ContactForm
  },
  {
    id: "ice-cream",
    label: "Ice cream",
    actions: ["setLikesIceCream"],
    input: IceCreamForm
  },
  {
    id: "pet",
    label: "Pet",
    actions: ["setPet"],
    input: PetForm
  },
  {
    id: "hair",
    label: "Hair",
    actions: ["setHair"],
    input: HairForm
  }
];

const states = createStateSequence(stages);

export const stageMachine = Machine<Context, StateSchema, Event>(
  {
    id: "stages",
    initial: "contact",
    context: {
      name: undefined,
      email: undefined,
      age: undefined,
      likesIceCream: undefined,
      pet: undefined,
      hair: undefined
    },
    states
  },
  {
    actions: {
      setContact,
      setLikesIceCream,
      setPet,
      setHair,
      reset
    },
    guards: {
      isValidAge,
      isValidName
    }
  }
);
