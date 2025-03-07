// TYPES
import type { Resource } from "../types";
import type { State } from "@/data/dataHelpers";

import starchart from "../starchart";

export const atlas:Record<string,Resource<State>> = {
  "Atlas Neuroptics Blueprint": { 
    name: "Atlas Neuroptics Blueprint",
    scale: 1,
  },
  "Atlas Chassis Blueprint": { 
    name: "Atlas Chassis Blueprint",
    scale: 1,
  },
  "Atlas Systems Blueprint": { 
    name: "Atlas Systems Blueprint",
    scale: 1,
  },
  "Atlas Blueprint": { 
    name: "Atlas Blueprint",
    scale: 1,
    buy: {
      cost: 1,
      preconditions: {
        "The Jordas Precept": "complete",
      },
      repeatable: true,
    },
  },
  "Atlas Neuroptics": { 
    name: "Atlas Neuroptics",
    scale: 1 / (starchart["Alloy Plate"].scale 
      * starchart["Circuits"].scale 
      * starchart["Polymer Bundle"].scale 
      * starchart["Neurodes"].scale),
    craft: {
      cost: 12 * 60,
      repeatable: true,
      consumes: {
        "Atlas Neuroptics Blueprint": 1,
        [starchart["Alloy Plate"].name]: 1100,
        [starchart["Circuits"].name]: 800,
        [starchart["Polymer Bundle"].name]: 1400,
        [starchart["Neurodes"].name]: 5,
      },
    },
  },
  "Atlas Chassis": { 
    name: "Atlas Chassis",
    scale: 1 / (starchart["Nano Spores"].scale
      * starchart["Cryotic"].scale
      * starchart["Rubedo"].scale)
      * starchart["Argon Crystal"].scale,
    craft: {
      cost: 12 * 60,
      repeatable: true,
      consumes: {
        "Atlas Chassis Blueprint": 1,
        [starchart["Nano Spores"].name]: 1800,
        [starchart["Cryotic"].name]: 1_300,
        [starchart["Rubedo"].name]: 700,
        [starchart["Argon Crystal"].name]: 2,
      },
    },
  },
  "Atlas Systems": { 
    name: "Atlas Systems",
    scale: 1 / (starchart["Ferrite"].scale
      * starchart["Polymer Bundle"].scale
      * starchart["Morphics"].scale
      * starchart["Orokin Cell"].scale),
    craft: {
      cost: 12 * 60,
      repeatable: true,
      consumes: {
        "Atlas Systems Blueprint": 1,
        [starchart["Ferrite"].name]: 4600,
        [starchart["Polymer Bundle"].name]: 1700,
        [starchart["Morphics"].name]: 5,
        [starchart["Orokin Cell"].name]: 1,
      },
    },
  },
  "Atlas": { 
    name: "Atlas",
    scale: 1,
    craft: {
      cost: 12 * 60,
      repeatable: true,
      consumes: {
        "Atlas Neuroptics": 1,
        "Atlas Chassis": 1,
        "Atlas Systems": 1,
        "Atlas Blueprint": 1,
        [starchart["Orokin Cell"].name]: 1,
      }
    }
  },
}

export default atlas;