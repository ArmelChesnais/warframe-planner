import quests from "@/data/items/quests";
import { atlas } from "@/data/items/warframes/atlas";

export default[
  {
    name: "The Jordas Precept",
    cost: 30,
    once: true,
    preconditions: { 
      "Eris Junction": "complete",
    },
    effects: { 
      "The Jordas Precept": "complete",
      [atlas["Atlas Blueprint"].name]: { "+": 1 },
    },
  },
];