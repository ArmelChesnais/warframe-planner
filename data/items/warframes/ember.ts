// TYPES
import type { Resource } from '../types';
import type { State } from '@/data/dataHelpers';

import starchart from '../starchart';

export const ember:Record<string,Resource<State>> = {
  "Ember Neuroptics Blueprint": {
    name: "Ember Neuroptics Blueprint",
    scale: 1,
  },
  "Ember Systems Blueprint": {
    name: "Ember Systems Blueprint",
    scale: 1,
  },
  "Ember Chassis Blueprint": {
    name: "Ember Chassis Blueprint",
    scale: 1,
  },
  "Ember Blueprint": {
    name: "Ember Blueprint",
    scale: 1,
    buy: {
      cost: 1,
      repeatable: true,
    },
  },
  "Ember Neuroptics": {
    name: "Ember Neuroptics",
    scale: 12 * 60 / (starchart["Alloy Plate"].scale
      * starchart["Neural Sensors"].scale
      * starchart["Polymer Bundle"].scale
      * starchart["Rubedo"].scale),
    craft: {
      cost: 1,
      repeatable: true,
      consumes: {
        "Ember Neuroptics Blueprint": 1,
        [starchart["Alloy Plate"].name]: 150,
        [starchart["Neural Sensors"].name]: 1,
        [starchart["Polymer Bundle"].name]: 150,
        [starchart["Rubedo"].name]: 500,
      },
    },
  },
  "Ember Systems": {
    name: "Ember Systems",
    scale: 12 * 60 / (starchart["Control Module"].scale
      * starchart["Morphics"].scale
      * starchart["Salvage"].scale
      * starchart["Plastids"].scale),
    craft: {
      cost: 1,
      repeatable: true,
      consumes: {
        "Ember Systems Blueprint": 1,
        [starchart["Control Module"].name]: 1,
        [starchart["Morphics"].name]: 1,
        [starchart["Salvage"].name]: 500,
        [starchart["Plastids"].name]: 220,
      },
    },
  },
  "Ember Chassis": {
    name: "Ember Chassis",
    scale: 12 * 60 / (starchart["Morphics"].scale
      * starchart["Ferrite"].scale
      * starchart["Rubedo"].scale),
    craft: {
      cost: 1,
      repeatable: true,
      consumes: {
        "Ember Chassis Blueprint": 1,
        [starchart["Morphics"].name]: 1,
        [starchart["Ferrite"].name]: 1_000,
        [starchart["Rubedo"].name]: 300,
      },
    },
  },
  "Ember": {
    name: "Ember",
    scale: 1,
    craft: {
      cost: 1,
      repeatable: true,
      consumes: {
        "Ember Blueprint": 1,
        "Ember Neuroptics": 1,
        "Ember Systems": 1,
        "Ember Chassis": 1,
        [starchart["Orokin Cell"].name]: 1,
      },
    },
  },
};

export default ember;