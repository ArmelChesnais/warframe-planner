import quests from "@/data/items/quests";

export default[
  {
    name: "The Hex",
    cost: 120,
    once: true,
    preconditions: { 
      "The Lotus Eaters": "complete",
      "The Duviri Paradox": "complete",
    },
    effects: { "The Hex": "complete" },
  },
  {
    name: "The Duviri Paradox",
    cost: 60,
    once: true,
    preconditions: {
      "Uranus Junction": "complete",
    },
    effects: { "The Duviri Paradox": "complete" },
  },
  {
    name: "The Lotus Eaters",
    cost: 10,
    once: true,
    preconditions: { "Whispers in the Walls": "complete", },
    effects: { "The Lotus Eaters": "complete" },
  },
  {
    name: "Whispers in the Walls",
    cost: 60,
    once: true,
    preconditions: {
      "The New War": "complete",
      // "Heart of Deimos": "complete",
    },
    effects: { "Whispers in the Walls": "complete" },
  },
  {
    name: "The New War",
    cost: 360,
    once: true,
    preconditions: { 
      "Prelude to War": "complete",
      // "Railjack": "complete",
      // "Necramech": "complete",
      // "Amp": "complete",
    },
    effects: { "The New War": "complete" },
  },
  {
    name: "Prelude to War",
    cost: 10,
    once: true,
    preconditions: { 
      "The Sacrifice": "complete",
    },
    effects: { "Prelude to War": "complete" },
  },
  {
    name: "The Sacrifice",
    cost: 60,
    once: true,
    preconditions: {
      "Apostasy Prologue": "complete",
    },
    effects: { "The Sacrifice": "complete" },
  },
  {
    name: "Apostasy Prologue",
    cost: 5,
    once: true,
    preconditions: {
      "Chains of Harrow": "complete",
      "Personal Quarters": "complete",
    },
    effects: { "Apostasy Prologue": "complete" },
  },
  {
    name: "Personal Quarters",
    cost: 1,
    once: true,
    consumes: {
      "Personal Quarters Segment":  1,
    },
    effects: { 
      "Personal Quarters": "complete",
    },
  },
  {
    name: "Chains of Harrow",
    cost: 60,
    once: true,
    preconditions: {
      "The War Within": "complete",
    },
    effects: { "Chains of Harrow": "complete" },
  },
  {
    name: "The War Within",
    cost: 120,
    once: true,
    preconditions: { "The Second Dream": "complete" },
    effects: { 
      "The War Within": "complete",
      [quests["Personal Quarters Blueprint"].name]: { "+": 1 },
    },
  },
  {
    name: "Rising Tide",
    cost: 60,
    once: true,
    preconditions: { "The Second Dream": "complete" },
    effects: { "Rising Tide": "complete" },
  },
  {
    name: "The Second Dream",
    cost: 120,
    once: true,
    preconditions: { "Natah": "complete" },
    effects: { "The Second Dream": "complete" },
  },
  {
    name: "Natah",
    cost: 60,
    once: true,
    preconditions: { 
      "Uranus Junction": "complete",
    },
    effects: { "Natah": "complete" },
  },
];