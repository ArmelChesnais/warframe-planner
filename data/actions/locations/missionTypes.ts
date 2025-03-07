import starchart from "@/data/items/starchart";

export default [
  {
    name: "Excavation Missions",
    cost: 5,
    repeatable: true,
    preconditions: {
    },
    effects: {
      "Excavation Missions": "complete",
      [starchart["Cryotic"].name]: { "+": 200 },
    },
  },
];