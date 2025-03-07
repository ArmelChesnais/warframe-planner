import type { State } from "../dataHelpers";
import starchart from "./starchart";
import type { Resource } from "./types";

const dojo:Record<string,Resource<State>> = {
  "Clan Key Blueprint": {
    name: "Clan Key Blueprint",
    scale: 1,
  },
  "Clan Key": {
    name: "Clan Key",
    scale: 1,
    craft: {
      cost: 12 * 60,
      repeatable: true,
      consumes: {
        "Clan Key Blueprint": 1,
        [starchart["Morphics"].name]: 1,
        [starchart["Ferrite"].name]: 500,
        [starchart["Polymer Bundle"].name]: 500,
      },
    }
  },
  "Tenno Lab": {
    name: "Tenno Lab",
    scale: 1,
    craft: {
      cost: 24 * 60,
      once: true,
      preconditions: {
        "Clan Key": 1,
      },
      consumes: {
      },
    }
  }
}

export default dojo;