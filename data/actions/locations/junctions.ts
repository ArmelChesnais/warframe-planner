export default [
  {
    name: "Uranus Junction",
    cost: 5,
    preconditions: { 
      "Sargas Ruk": "Defeated",
      // "Open Meso Relic": { ">=": 1 },
      // "Learn to Perform Synthesis": "complete",
    },
    effects: { "Uranus Junction": "complete" },
  },
  {
    name: "Sedna Junction",
    cost: 5,
    preconditions: {
      "Tyl Regor": "Defeated",
      "Uranus Junction": "complete",
    },
    effects: { "Sedna Junction": "complete" },
  },
  {
    name: "Eris Junction",
    cost: 5,
    preconditions: {
      "Pluto Missions": "complete",
      // "Sedna Junction": "complete",
    },
    effects: { "Eris Junction": "complete" },
  }
];