// TYPES
import type { Resource } from "../types";
import type { State } from "@/data/dataHelpers";

import starchart from "../starchart";

export const ash:Record<string,Resource<State>> = {
  "Ash Neuroptics Blueprint": { 
    name: "Ash Neuroptics Blueprint",
    scale: 1,
  },
  "Ash Chassis Blueprint": { 
    name: "Ash Chassis Blueprint",
    scale: 1,
  },
  "Ash Systems Blueprint": { 
    name: "Ash Systems Blueprint",
    scale: 1,
  },
  "Ash Blueprint": { 
    name: "Ash Blueprint",
    scale: 1,
    buy: {
      cost: 1,
      repeatable: true,
    },
  },
  "Ash Neuroptics": { 
    name: "Ash Neuroptics",
    scale: 1 / (starchart["Alloy Plate"].scale 
      * starchart["Neural Sensors"].scale 
      * starchart["Polymer Bundle"].scale 
      * starchart["Rubedo"].scale),
    craft: {
      cost: 12 * 60,
      repeatable: true,
      consumes: {
        "Ash Neuroptics Blueprint": 1,
        [starchart["Alloy Plate"].name]: 150,
        [starchart["Neural Sensors"].name]: 1,
        [starchart["Polymer Bundle"].name]: 150,
        [starchart["Rubedo"].name]: 500,
      },
    },
  },
  "Ash Chassis": { 
    name: "Ash Chassis",
    scale: 1 / (starchart["Morphics"].scale
      * starchart["Ferrite"].scale
      * starchart["Rubedo"].scale),
    craft: {
      cost: 12 * 60,
      repeatable: true,
      consumes: {
        "Ash Chassis Blueprint": 1,
        [starchart["Morphics"].name]: 1,
        [starchart["Ferrite"].name]: 1_000,
        [starchart["Rubedo"].name]: 300,
      },
    },
  },
  "Ash Systems": { 
    name: "Ash Systems",
    scale: 1 / (starchart["Control Module"].scale
      * starchart["Morphics"].scale
      * starchart["Salvage"].scale
      * starchart["Plastids"].scale),
    craft: {
      cost: 12 * 60,
      repeatable: true,
      consumes: {
        "Ash Systems Blueprint": 1,
        [starchart["Control Module"].name]: 1,
        [starchart["Morphics"].name]: 1,
        [starchart["Salvage"].name]: 500,
        [starchart["Plastids"].name]: 220,
      },
    },
  },
  "Ash": { 
    name: "Ash",
    scale: 1,
    craft: {
      cost: 12 * 60,
      repeatable: true,
      consumes: {
        "Ash Neuroptics": 1,
        "Ash Chassis": 1,
        "Ash Systems": 1,
        "Ash Blueprint": 1,
        [starchart["Orokin Cell"].name]: 1,
      }
    }
  },
}

export default ash;