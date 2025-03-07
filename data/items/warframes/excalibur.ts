// TYPES
import type { State } from "@/data/dataHelpers";
import type { Resource } from "../types";

import starchart from "../starchart";

const excalibur:Record<string,Resource<State>> = {
  "Excalibur": {
    name: "Excalibur",
    scale: 1,
    craft: {
      cost: 1,
      repeatable: true,
      consumes: {
        "Excalibur Blueprint": 1,
        "Excalibur Neuroptics": 1,
        "Excalibur Systems": 1,
        "Excalibur Chassis": 1,
        [starchart["Orokin Cell"].name]: 1,
      },
    }
  },
  "Excalibur Blueprint": {
    name: "Excalibur Blueprint",
    scale: 1,
    buy: {
      cost: 0.5,
      repeatable: true,
    }
  },
  "Excalibur Neuroptics": {
    name: "Excalibur Neuroptics",
    scale: 12 * 60/ (starchart["Alloy Plate"].scale
      * starchart["Neural Sensors"].scale
      * starchart["Polymer Bundle"].scale
      * starchart["Rubedo"].scale),
    craft: {
      cost: 1,
      repeatable: true,
      consumes: {
        "Excalibur Neuroptics Blueprint": 1,
        [starchart["Alloy Plate"].name]: 150,
        [starchart["Neural Sensors"].name]: 1,
        [starchart["Polymer Bundle"].name]: 150,
        [starchart["Rubedo"].name]: 500,
      },
    }
  },
  "Excalibur Neuroptics Blueprint": {
    name: "Excalibur Neuroptics Blueprint",
    scale: 1,
  },
  "Excalibur Chassis": {
    name: "Excalibur Chassis",
    scale: 12 * 60/ (starchart["Morphics"].scale
      * starchart["Ferrite"].scale
      * starchart["Rubedo"].scale),
    craft: {
      cost: 1,
      repeatable: true,
      consumes: {
        "Excalibur Chassis Blueprint": 1,
        [starchart["Morphics"].name]: 1,
        [starchart["Ferrite"].name]: 1_000,
        [starchart["Rubedo"].name]: 300,
      },
    }
  },
  "Excalibur Chassis Blueprint": {
    name: "Excalibur Chassis Blueprint",
    scale: 1,
  },
  "Excalibur Systems": {
    name: "Excalibur Systems",
    scale: 12 * 60 / (starchart["Control Module"].scale
      * starchart["Morphics"].scale
      * starchart["Salvage"].scale
      * starchart["Plastids"].scale),
    craft: {
      cost: 1,
      repeatable: true,
      consumes: {
        "Excalibur Systems Blueprint": 1,
        [starchart["Control Module"].name]: 1,
        [starchart["Morphics"].name]: 1,
        [starchart["Salvage"].name]: 500,
        [starchart["Plastids"].name]: 220,
      }
    }
  },
  "Excalibur Systems Blueprint": {
    name: "Excalibur Systems Blueprint",
    scale: 1,
  },
}

export default excalibur;
