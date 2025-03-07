// TYPES
import type { Resource } from "../types";
import type { State } from "@/data/dataHelpers";

import starchart from "../starchart";
import dojo from "../dojo";

export const banshee:Record<string,Resource<State>> = {
  "Banshee Neuroptics Blueprint": { 
    name: "Banshee Neuroptics Blueprint",
    scale: 1,
    buy: {
      cost: 1,
      preconditions: {
        [dojo["Tenno Lab"].name]: { ">=": 1 },
      },
    },
  },
  "Banshee Chassis Blueprint": { 
    name: "Banshee Chassis Blueprint",
    scale: 1,
    buy: {
      cost: 1,
      preconditions: {
        [dojo["Tenno Lab"].name]: { ">=": 1 },
      },
    },
  },
  "Banshee Systems Blueprint": { 
    name: "Banshee Systems Blueprint",
    scale: 1,
    buy: {
      cost: 1,
      preconditions: {
        [dojo["Tenno Lab"].name]: { ">=": 1 },
      },
    },
  },
  "Banshee Blueprint": { 
    name: "Banshee Blueprint",
    scale: 1,
    buy: {
      cost: 1,
      preconditions: {
        [dojo["Tenno Lab"].name]: { ">=": 1 },
      },
      repeatable: true,
    },
  },
  "Banshee Neuroptics": { 
    name: "Banshee Neuroptics",
    scale: 1 / (starchart["Circuits"].scale 
      * starchart["Neural Sensors"].scale 
      * starchart["Polymer Bundle"].scale 
      * starchart["Salvage"].scale),
    craft: {
      cost: 12 * 60,
      repeatable: true,
      consumes: {
        "Banshee Neuroptics Blueprint": 1,
        [starchart["Circuits"].name]: 150,
        [starchart["Neural Sensors"].name]: 1,
        [starchart["Polymer Bundle"].name]: 200,
        [starchart["Salvage"].name]: 500,
      },
    },
  },
  "Banshee Chassis": { 
    name: "Banshee Chassis",
    scale: 1 / (starchart["Morphics"].scale
      * starchart["Ferrite"].scale
      * starchart["Rubedo"].scale),
    craft: {
      cost: 12 * 60,
      repeatable: true,
      consumes: {
        "Banshee Chassis Blueprint": 1,
        [starchart["Morphics"].name]: 1,
        [starchart["Ferrite"].name]: 900,
        [starchart["Rubedo"].name]: 50,
      },
    },
  },
  "Banshee Systems": { 
    name: "Banshee Systems",
    scale: 1 / (starchart["Control Module"].scale
      * starchart["Morphics"].scale
      * starchart["Salvage"].scale
      * starchart["Plastids"].scale),
    craft: {
      cost: 12 * 60,
      repeatable: true,
      consumes: {
        "Banshee Systems Blueprint": 1,
        [starchart["Control Module"].name]: 1,
        [starchart["Morphics"].name]: 1,
        [starchart["Salvage"].name]: 500,
        [starchart["Plastids"].name]: 400,
      },
    },
  },
  "Banshee": { 
    name: "Banshee",
    scale: 1,
    craft: {
      cost: 12 * 60,
      repeatable: true,
      consumes: {
        "Banshee Neuroptics": 1,
        "Banshee Chassis": 1,
        "Banshee Systems": 1,
        "Banshee Blueprint": 1,
        [starchart["Orokin Cell"].name]: 1,
      }
    }
  },
}

export default banshee;