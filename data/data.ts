import type { State, Action } from "./dataHelpers";

import quests from "./actions/quests";
import warframeSideQuests from "./actions/quests/warframeSideQuests";
import locations from "./actions/locations";
import items from "./items";
import dojo from "./actions/locations/dojo";

const craftAndBuyActions = [];
for ( const item of items ) {
  if ( "craft" in item && item.craft ) {
    const craftingAction:Action = {
      name: `Craft ${item.name}`,
      effects: { [item.name]: { "+": 1 } },
      ...item.craft
    };
    craftAndBuyActions.push(craftingAction);
  }
  if ( "buy" in item && item.buy ) {
    const buyAction:Action = {
      name: `Buy ${item.name}`,
      effects: { [item.name]: { "+": 1 } },
      ...item.buy
    };
    craftAndBuyActions.push(buyAction);
  }
}
// console.log("Crafting Actions", craftAndBuyActions);

const actions:Action[] = [
  ...quests,
  ...warframeSideQuests,
  ...locations,
  ...dojo,
  ...craftAndBuyActions,
]

actions.forEach( action => {
  if ( "consumes" in action ) {
    action.preconditions ??= {};
    action.effects ??= {};
    for ( const itemKey in action.consumes ) {
      action.preconditions[itemKey] = { ">=": action.consumes[itemKey] };
      action.effects[itemKey] = { "-": action.consumes[itemKey] };
    }
  }
});

export default actions;