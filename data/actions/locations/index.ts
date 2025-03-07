import planets from "./planets";
import bosses from "./bosses";
import empyrean from "./empyrean";
import junctions from "./junctions";
import missionTypes from "./missionTypes";
import type { Action } from "@/data/dataHelpers";
export default [
  ...planets,
  ...missionTypes,
  ...bosses,
  ...empyrean,
  ...junctions,
] as Action[];