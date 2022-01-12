import { createStateSequence } from './createStateSequence';

it("creates a one stage sequence", function() {
  const stages = [
    { id: "one" }
  ];
  const states = createStateSequence(stages);
  const expected = {
    one: {
      on: {
        NEXT: {
          target: "done",
        }
      }
    },
    done: {
      on: {
        RESET: {
          target: 'one',
          actions: ['reset'],
        },
      }
    }
  };
  expect(states).toEqual(expected);
});

it("can add guards and actions", function() {
  const stages = [
    { id: "one", cond: { type: "oneIsValid" }, actions: ["setOne", "logStuff"] }
  ];
  const states = createStateSequence(stages);
  const expected = {
    one: {
      on: {
        NEXT: {
          target: "done",
          cond: { type: "oneIsValid" },
          actions: ["setOne", "logStuff"]
        }
      }
    },
    done: {
      on: {
        RESET: {
          target: 'one',
          actions: ['reset'],
        },
      }
    }
  };
  expect(states).toEqual(expected);
});

it("creates a two stage sequence", function() {
  const stages = [
    { id: "one", cond: { type: "oneIsValid" }, actions: ["setOne", "logStuff"] },
    { id: "two" },
  ];
  const states = createStateSequence(stages);
  const expected = {
    one: {
      on: {
        NEXT: {
          target: "two",
          cond: { type: "oneIsValid" },
          actions: ["setOne", "logStuff"]
        }
      }
    },
    two: {
      on: {
        NEXT: {
          target: "done"
        }
      }
    },
    done: {
      on: {
        RESET: {
          target: 'one',
          actions: ['reset'],
        },
      }
    }
  };
  expect(states).toEqual(expected);
});

it("creates a 100 stage sequence", function() {
  const stages = Array(100)
    .fill(null)
    .map((_, i) => ({ id: `stage-${i}` }));
  const states = createStateSequence(stages);
  const numberOfStates = Object.keys(states).length;
  expect(numberOfStates).toEqual(101);
});
