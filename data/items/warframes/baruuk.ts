// TYPES
import type { Resource } from "../types";
import type { State } from "@/data/dataHelpers";

import starchart from "../starchart";
import dojo from "../dojo";
import orb_vallis from "../orb_vallis";

export const baruuk:Record<string,Resource<State>> = {
  "Baruuk Neuroptics Blueprint": { 
    name: "Baruuk Neuroptics Blueprint",
    scale: 1,
    buy: {
      cost: 1,
      preconditions: {
        // [dojo["Tenno Lab"].name]: { ">=": 1 },
      },
    },
  },
  "Baruuk Chassis Blueprint": { 
    name: "Baruuk Chassis Blueprint",
    scale: 1,
    buy: {
      cost: 1,
      preconditions: {
        // [dojo["Tenno Lab"].name]: { ">=": 1 },
      },
    },
  },
  "Baruuk Systems Blueprint": { 
    name: "Baruuk Systems Blueprint",
    scale: 1,
    buy: {
      cost: 1,
      preconditions: {
        // [dojo["Tenno Lab"].name]: { ">=": 1 },
      },
    },
  },
  "Baruuk Blueprint": { 
    name: "Baruuk Blueprint",
    scale: 1,
    buy: {
      cost: 1,
      preconditions: {
        // [dojo["Tenno Lab"].name]: { ">=": 1 },
      },
      repeatable: true,
    },
  },
  "Baruuk Neuroptics": { 
    name: "Baruuk Neuroptics",
    scale: 1 / (orb_vallis["Sola Toroid"].scale 
      * starchart["Alloy Plate"].scale 
      * orb_vallis["Hespazym Alloy"].scale 
      * orb_vallis["Synathid Ecosynth Analyzer"].scale),
    craft: {
      cost: 12 * 60,
      repeatable: true,
      consumes: {
        "Baruuk Neuroptics Blueprint": 1,
        [orb_vallis["Sola Toroid"].name]: 3,
        [starchart["Alloy Plate"].name]: 2850,
        [orb_vallis["Hespazym Alloy"].name]: 50,
        [orb_vallis["Synathid Ecosynth Analyzer"].name]: 5,
      },
    },
  },
  "Baruuk Chassis": { 
    name: "Baruuk Chassis",
    scale: 1 / (orb_vallis["Vega Toroid"].scale
      * starchart["Salvage"].scale
      * orb_vallis["Hespazym Alloy"].scale)
      * orb_vallis["Marquise Thyst"].scale,
    craft: {
      cost: 12 * 60,
      repeatable: true,
      consumes: {
        "Baruuk Chassis Blueprint": 1,
        [orb_vallis["Vega Toroid"].name]: 3,
        [starchart["Salvage"].name]: 3250,
        [orb_vallis["Hespazym Alloy"].name]: 100,
        [orb_vallis["Marquise Thyst"].name]: 5,
      },
    },
  },
  "Baruuk Systems": { 
    name: "Baruuk Systems",
    scale: 1 / (orb_vallis["Calda Toroid"].scale
      * starchart["Ferrite"].scale
      * orb_vallis["Tromyzon Entroplasma"].scale
      * orb_vallis["Radiant Zodian"].scale),
    craft: {
      cost: 12 * 60,
      repeatable: true,
      consumes: {
        "Baruuk Systems Blueprint": 1,
        [orb_vallis["Calda Toroid"].name]: 3,
        [starchart["Ferrite"].name]: 2500,
        [orb_vallis["Tromyzon Entroplasma"].name]: 500,
        [orb_vallis["Radiant Zodian"].name]: 5,
      },
    },
  },
  "Baruuk": { 
    name: "Baruuk",
    scale: 1,
    craft: {
      cost: 12 * 60,
      repeatable: true,
      consumes: {
        "Baruuk Neuroptics": 1,
        "Baruuk Chassis": 1,
        "Baruuk Systems": 1,
        "Baruuk Blueprint": 1,
        [starchart["Orokin Cell"].name]: 1,
      }
    }
  },
}

export default baruuk;