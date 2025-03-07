import dojo from "@/data/items/dojo";

export default [
  {
    name: "Join/Create a Clan",
    cost: 1,
    once: true,
    preconditions: { 
      // "Vor": "Defeated",
    },
    effects: { 
      "Clan Joined": "Complete",
      [dojo["Clan Key Blueprint"].name]: { "+": 1 },
    },
  },
];