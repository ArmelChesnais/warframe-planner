export default [
  {
    name: "Sargas Ruk",
    cost: 5,
    repeatable: true,
    preconditions: { 
      // "Vor": "Defeated",
    },
    effects: { 
      "Sargas Ruk": "Defeated",
      "Ember Neuroptics Blueprint": { "+": 38.72/100 },
      "Ember Systems Blueprint": { "+": 22.56/100 },
      "Ember Chassis Blueprint": { "+": 38.72/100 },
    },
  },
  {
    name: "Lech Kril",
    cost: 5,
    repeatable: true,
    preconditions: {
      // "Vor": "Defeated",
    },
    effects: {
      "Lech Kril": "Defeated",
      "Excalibur Neuroptics Blueprint": { "+": 38.72/100 },
      "Excalibur Systems Blueprint": { "+": 22.56/100 },
      "Excalibur Chassis Blueprint": { "+": 38.72/100 },
    },
  },
  {
    name: "Jordas Golem Assassination",
    cost: 5,
    repeatable: true,
    preconditions: {
      "The Jordas Precept": "complete",
    },
    effects: {
      "Jordas Golem": "Defeated",
      "Atlas Neuroptics Blueprint": { "+": 38.72/100 },
      "Atlas Systems Blueprint": { "+": 22.56/100 },
      "Atlas Chassis Blueprint": { "+": 38.72/100 },
    },
  }
];