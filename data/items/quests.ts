// TYPES
import type { State } from "@/data/dataHelpers";
import type { Resource } from "./types";

import starchart from "./starchart";

// Infer the literal value for the key
const quests = {
  "Personal Quarters Segment": {
    name: "Personal Quarters Segment",
    scale: 1,
    craft: {
      cost: 12 * 60,
      once: true,
      consumes: {
        "Personal Quarters Blueprint": 1,
        [starchart["Argon Crystal"].name]: 1,
        [starchart["Ferrite"].name]: 1_000,
        [starchart["Rubedo"].name]: 800,
        [starchart["Tellurium"].name]: 2,
      },
    }
  },
  "Personal Quarters Blueprint": {
    name: "Personal Quarters Blueprint",
    scale: 1,
  },
}

export default quests;
