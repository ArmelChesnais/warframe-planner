import { Resource } from "./items/types";

type OnlyFirst<F, S> = F & {[Key in keyof Omit<S, keyof F>]?: never};

type MergeTypes<TypesArray extends any[], Res = {}> =
  TypesArray extends [infer Head, ...infer Rem]
    ? MergeTypes<Rem, Res & Head>
    : Res;


/**
 * OneOf<TypesArray> is a utility type that creates a union type from an array of types.
 * 
 * ex:
 * ```TS
 * type T1 = { a: string };
 * type T2 = { z: number };
 * type UnionT = T1 | T2;
 * // UnionT will accept values that include both a and z properties, which is not what we want
 * var unionT: UnionT = { a: 'hello', z: 42 }; // This is valid
 * type OOT = OneOf<[T1, T2]>;
 * // OOT will accept values that include either a or z properties, but not both
 * var oot: OOT = { a: 'hello', z: 42 }; //This is not valid
 * ```
 */
export type OneOf<
  TypesArray extends any[],
  Res = never,
  AllProperties = MergeTypes<TypesArray>> =
  TypesArray extends [infer Head, ...infer Rem]
    ? OneOf<Rem, Res | OnlyFirst<Head, AllProperties>, AllProperties>
    : Res;

export type State = Record<string, any>;

type ConditionValue = string | number
| { "=": (string|number)[] }
| { "!": (string|number)[] }
| { "!=": (string|number)[] }
| { ">": number }
| { ">=": number }
| { "<": number }
| { "<=": number }
| { startsWith: string[] }
| { endsWith: string[] }
| { includes: string[] }
| { inc: string[] };

// export type Conditions<T extends State> = Partial<Record<keyof T, ConditionValue<T>>>;
export type Conditions = Record<string, ConditionValue>;

type ConsumeValue = number

export type Consumes<T extends State> = Record<keyof T, ConsumeValue>;

type EffectValue = string | number
| { "=": string | number }
| { "+": number }
| { "-": number };

export type Effects = {[key: string]: EffectValue};

export type Action = {
  name: string;
  preconditions?: Conditions;
  consumes?: Record<string, number>;
  effects: Effects;
  cost: number;
  repeatable?: boolean;
  once?: boolean;
};

class PriorityQueue<T> {
  queue: { item: T; priority: number }[];
  sorted: boolean;
  constructor() {
    this.queue = [];
    this.sorted = false;
  }

  enqueue(item:T, priority:number) {
    this.queue.push({ item, priority });
    this.sorted = false;
    // this.queue.sort((a, b) => a.priority - b.priority); // Min-heap
  }

  noSortEnqueue(item:T, priority:number) {
    this.queue.push({ item, priority });
  }

  dequeue():T|undefined {
    if (!this.sorted) {
      this.sort();
      this.sorted = true;
    }
    return this.queue.shift()?.item;
  }

  sort() {
    this.queue.sort((a, b) => a.priority - b.priority); // Min-heap
  }

  isEmpty():boolean {
    return this.queue.length === 0;
  }
}

function satisfies<T extends State>(state:T, conditions?:Conditions, consumes?:Consumes<T>):boolean {
  
  let result = true;
  if ( conditions ) {
    for (const [key, value] of Object.entries(conditions)) {
      if (typeof value === "object") {
        if ("!" in value) {
          result = !value["!"].includes(state[key]);
        } else if ("=" in value) {
          result = !value["="].includes(state[key]);
        } else if ("!=" in value) {
          result = value["!="].some(val => val === state[key]);
        } else if (">" in value) {
          result = !(state[key] > value[">"]);
        } else if (">=" in value) {
          result = !(state[key] >= value[">="]);
        } else if ("<" in value) {
          result = !(state[key] < value["<"]);
        } else if ("<=" in value) {
          result = !(state[key] <= value["<="]);
        } else if ("startsWith" in value) {
          result = !value.startsWith.some((start) => state[key].startsWith(start));
        } else if ("endsWith" in value) {
          result = !value.endsWith.some((end) => state[key].endsWith(end));
        } else if ("includes" in value) {
          result = !value.includes.includes(state[key]);
        } else if ("inc" in value) {
          result = !value.inc.includes(state[key]);
        }
      } else {
        if (state[key] !== value) {
          result = false;
        };
      }
    };
  }
  return result;
  // if ( consumes ) {
  //   for (const [key, value] of Object.entries(consumes)) {
  //     if (state[key] < value) {
  //       result = false;
  //     }
  //   }
  // }
}

function applyEffects<T extends State>(state:T, effects?:Effects, consumes?:Consumes<T>):State {
  const newState:State = { ...state };
  if ( effects ) {
    for (const [key, value] of Object.entries(effects)) {
      if (typeof value === "object") {
        if ("+" in value) {
          newState[key] = state[key] + value["+"];
        } else if ("-" in value) {
          newState[key] = state[key] - value["-"];
        }
      } else {
        newState[key] = value;
      }
    }
  }
  // if ( consumes ) {
  //   for (const [key, value] of Object.entries(consumes)) {
  //     newState[key] = state[key] - value;
  //   }
  // }
  return newState;
}

function heuristic(state:State, goal:State):number {
  return Object.keys(goal).filter(key => state[key] !== goal[key]).length;
}

type ActionsByEffect<T extends State> = Record<string, Action[]>;

function isValidEffectToGroup<T extends State>(effectVal?:EffectValue):boolean {
  return typeof effectVal === "string" 
    || typeof effectVal === "number" 
    || ( !!effectVal && typeof effectVal === "object" && "+" in effectVal );
}

function groupActionsByEffect<T extends State>(actions:Action[]):ActionsByEffect<T> {
  const actionsByEffect:ActionsByEffect<T> = {};
  for (const action of actions) {
    effectValueLoop: for (const effect of Object.keys(action.effects)) {
      if ( !isValidEffectToGroup(action.effects[effect]) ) continue effectValueLoop;
      if (!actionsByEffect[effect]) actionsByEffect[effect] = [];
      actionsByEffect[effect].push(action);
    }
  }
  return actionsByEffect;
}

function groupActionsByPrecondition<T extends State>(actions:Action[]):ActionsByEffect<T> {
  const actionsByEffect:ActionsByEffect<T> = {};
  for (const action of actions) {
    if ( !action.preconditions ) continue;
    for (const effect of Object.keys(action.preconditions)) {
      if (!actionsByEffect[effect]) actionsByEffect[effect] = [];
      actionsByEffect[effect].push(action);
    }
  }
  return actionsByEffect;
}

function combineTwoConditions<T>(
  aCond: ConditionValue,
  bCond: ConditionValue
): ConditionValue {

  if (aCond && typeof aCond === "object" && ">=" in aCond &&
      bCond && typeof bCond === "object" && ">=" in bCond) {
    const mergedVal = Math.max(aCond[">="], bCond[">="]);
    return { ">=": mergedVal };
  }

  // handle other merges...
  return bCond; // fallback
}

function mergeConditions<T extends State>(
  goalA: Conditions,
  goalB: Conditions
): Conditions {
  // Combine the key-value pairs of both. For numeric resource needs, we might need to max them.
  // For quests, if there's a direct conflict, you might do error handling, etc.

  const result: Conditions = { ...goalA };

  for (const [key, bCond] of Object.entries(goalB)) {
    const aCond = result[key];

    // If there's no conflict, just set it
    if (aCond === undefined) {
      result[key] = bCond;
      continue;
    }

    // If both want "complete", that's fine. 
    // If one says "greaterThanEqual: 2" and the other "greaterThanEqual: 3", the combined requirement is "greaterThanEqual: 3".
    // So we do domain-specific merges:
    result[key] = combineTwoConditions(aCond, bCond);
  }

  return result;
}

function applyAction<T extends State>(currentGoal:Conditions, state: T, action:Action)
  : { conditions: Conditions, state: T }
{
  const { effects, preconditions } = action;

  let newGoal = JSON.parse(JSON.stringify(currentGoal));

  for (let [key, effectValue] of Object.entries(effects)) {
    let goalValue = newGoal[key];
    if (goalValue === undefined) continue;

    if ( goalValue === effectValue) {
      delete newGoal[key];
    }
    // if (goalValue === state[key]) {
    //   delete newGoal[key];
    // }
    else if (typeof effectValue === "object" && "+" in effectValue) {

      if (goalValue && typeof goalValue === "object" && ">=" in goalValue) {
        const needed = goalValue[">="];
        const reduced = needed - effectValue["+"];
        if (reduced <= 0) {
          delete newGoal[key];
        } else {
          newGoal[key] = { ">=": reduced };
        }
      } 
      // else 
      // {
      //   newState[key] ??= 0;
      //   newState[key] += effectValue["+"];
      // }
    } else if (typeof effectValue === "object" && "-" in effectValue!) {
      goalValue = goalValue ?? { ">=": 0 };
      const needed = goalValue[">="];
      const increased = needed + effectValue["-"];
      newGoal[key] = { ">=": increased };
    }
  }
  
  newGoal = mergeConditions(newGoal, preconditions ?? {});
  return {conditions: newGoal, state};
}

function meetsCondition<T extends State>(conditionValue:ConditionValue,  effectValue: EffectValue):boolean {
  if (typeof conditionValue === "object") {
    if ("!" in conditionValue) {
      return !conditionValue["!"].some((val) => val === effectValue);
    } else if ("=" in conditionValue) {
      return conditionValue["="].some((val) => val === effectValue);
    } else if ("!=" in conditionValue) {
      return conditionValue["!="].every(val => val !== effectValue);
    } else if (">" in conditionValue) {
      return effectValue as number > conditionValue[">"];
    } else if (">=" in conditionValue) {
      return effectValue as number >= conditionValue[">="];
    } else if ("<" in conditionValue) {
      return effectValue as number < conditionValue["<"];
    } else if ("<=" in conditionValue) {
      return effectValue as number <= conditionValue["<="];
    } else if ("startsWith" in conditionValue) {
      return conditionValue.startsWith.some((start) => (effectValue as string).startsWith(start));
    } else if ("endsWith" in conditionValue) {
      return conditionValue.endsWith.some((end) => (effectValue as string).endsWith(end));
    }
    return false;
  } else {
    return conditionValue === effectValue;
  }
}

function getUnmetConditions<T extends State>(state:T, goalConditions:Conditions):Conditions {
  const unmetConditions:Conditions = {};
  for (const [key, condition] of Object.entries(goalConditions)) {
    if (condition && !meetsCondition(condition, state[key])) {
      if ( typeof condition === "object" && ">=" in condition ) {
        unmetConditions[key] = { ">=": condition[">="] - state[key] };
      } else {
        unmetConditions[key] = condition;
      }
    }
  }
  return unmetConditions;
}

function effectFulfillsACondition<T extends State>(effect:Effects, condition:Conditions):boolean {
  return Object.entries(condition).some(([key, value]) => {
    if (typeof value === "object") {
      const effectVal = effect[key];
      if ("!" in value && (typeof effectVal === "string" || typeof effectVal === "number")) {
        return value["!"].includes(effectVal);
      } else if ("=" in value && (typeof effectVal === "string" || typeof effectVal === "number")) {
        return value["="].includes(effectVal);
      } else if ("!=" in value) {
        return value["!="].every(val => val !== effectVal);
      } else if (">" in value && typeof effectVal === "number") {
        return effectVal > value[">"];
      } else if (">=" in value && typeof effectVal === "number") {
        return effectVal >= value[">="];
      } else if ("<" in value && typeof effectVal === "number") {
        return effectVal < value["<"];
      } else if ("<=" in value && typeof effectVal === "number") {
        return effectVal <= value["<="];
      } else if ("startsWith" in value && typeof effectVal === "string") {
        return value.startsWith.some((start) => effectVal.startsWith(start));
      } else if ("endsWith" in value && typeof effectVal === "string") {
        return value.endsWith.some((end) => effectVal.endsWith(end));
      }
    } else {
      return effect[key] === value;
    }
  });
}

// function getNewConditions<T extends State>(state: T, conditions:Conditions, action:Action):Conditions {
//   const newConditions:Conditions = {};
//   for ( const [key, effect] of Object.entries(action.effects)) {
//     if (conditions[key] && effectFulfillsACondition(value, conditions[key])) {
//       newConditions[key] = conditions[key];
//     }
//   }
//   return newConditions;
// }

function conditionMet<T extends State>(stateVal: T[keyof T], conditionVal: ConditionValue): boolean {
  if (typeof conditionVal === "object") {
    if ("!" in conditionVal) {
      return !conditionVal["!"].includes(stateVal);
    } else if ("=" in conditionVal) {
      return conditionVal["="].includes(stateVal);
    } else if ("!=" in conditionVal) {
      return conditionVal["!="].every(val => val !== stateVal);
    } else if (">" in conditionVal) {
      return stateVal > conditionVal[">"];
    } else if (">=" in conditionVal) {
      return stateVal >= conditionVal[">="];
    } else if ("<" in conditionVal) {
      return stateVal < conditionVal["<"];
    } else if ("<=" in conditionVal) {
      return stateVal <= conditionVal["<="];
    } else if ("startsWith" in conditionVal) {
      return conditionVal.startsWith.some((start) => stateVal.startsWith(start));
    } else if ("endsWith" in conditionVal) {
      return conditionVal.endsWith.some((end) => stateVal.endsWith(end));
    }
    // vvv NEED TO CHECK THIS ONE
    return false;
  } else {
    return stateVal === conditionVal;
  }
}

function areConditionsSatisfied<T extends State>(
  state: T,
  conditions: Conditions
): boolean {
  for (const [key, condValue] of Object.entries(conditions) as [keyof T, ConditionValue][]) {
    const stVal = state[key];
    if (!conditionMet(stVal, condValue)) {
      return false;
    }
  }
  return true;
}

function repeatsToFulfillAllPossibleConditions<T extends State>(
  initialState: State,
  conditions: Conditions,
  action: Action
): { repeats: number, resources: [string, number|string][] } {
  let maxRepeats = 1;
  const { effects } = action;
  const resources: [string, number|string][] = [];
  Object.entries(conditions).forEach(([key, value]) => {
    const effectValue = effects[key];
    if (
      value && typeof value === "object" && ">=" in value && value[">="] &&
      typeof effectValue === "object" && "+" in effectValue
    ) {
      const initStateValue = initialState[key] ?? 0;
      let repeats = 1;
      if ( action.repeatable ) {
        repeats = Math.ceil((value[">="] - initStateValue) / effectValue["+"]);
        maxRepeats = Math.max(maxRepeats, repeats);
      }
      const resourceGain = Math.min(repeats * effectValue["+"], value[">="] - initStateValue);
      resources.push([key, resourceGain]);
    } else if (typeof value === "string" || typeof value === "number") {
      if (value === effectValue) {
        resources.push([key, value]);
      }
    }
  });
  // const resources:[string, Record<keyof T, ConditionValue<T>>[string]][] = Object.entries(conditions)
  //   .filter(([key, value]) => {
  //     const effectsValue = effects[key];
  //     if (
  //       typeof value === "object" && ">=" in value && value[">="] &&
  //       typeof effectsValue === "object" && "+" in effectsValue
  //     ) {
  //       const repeats = Math.ceil(value[">="] / effectsValue["+"]);
  //       maxRepeats = Math.max(maxRepeats, repeats);
  //       return !!value;
  //     }
  //   }) as [string, Record<keyof T, ConditionValue<T>>[string]][]

  return { repeats: maxRepeats, resources };
}


function minimumRepeatsToFulfillAtLeastOneCondition<T extends State>(
  conditions: Conditions,
  action: Action
): number {
  if (!action.repeatable) {
    return 1;
  }

  let minRepeats = Infinity;
  for (const [key, value] of Object.entries(conditions)) {
    if ( 
      (typeof value === "string" || typeof value === "number") 
      && value === action.effects[key]
    ) {
      return 1;
    }

    if ( typeof value === "object" && ">=" in value ) {
      const effectValue = action.effects[key];
      if (typeof effectValue === "object" && "+" in effectValue) {
        const repeats = Math.ceil(value[">="] / effectValue["+"]);
        minRepeats = Math.min(minRepeats, repeats);
      }
    }
  }
  if (minRepeats === Infinity) {
    return 0;
  }
  return minRepeats;
}

function multiplyActionEffects<T extends State>(
  action: Action,
  repeats: number
): Action {
  const newAction = JSON.parse(JSON.stringify(action));
  for (const [key, value] of Object.entries(action.effects)) {
    if (typeof value === "object" && "+" in value) {
      newAction.effects[key]["+"] *= repeats;
    } else if (typeof value === "object" && "-" in value) {
      newAction.effects[key]["-"] *= repeats;
    }
  }
  return newAction;
}

function estimateHeuristic(conditions:Conditions, items:Record<string, Resource<State>>):number {
  return Object.entries(conditions).reduce((acc, [key, value]) => {
    if (typeof value === "object" && value && ">=" in value) {
      try {
      return acc + 5 * (value[">="] / items[key].scale);
      } catch (e) {
        console.log("error", key, value, items[key]);
      }
    } else if (value === "complete") {
      return acc + 10;
    }
    return acc;
  }, 0);
  return Object.keys(conditions).length * 5;
  return 0;
}

type Tree = { [key: string]: Tree | any };

function buildTree(input:[string, any][]) {
  const tree:any = {};
  for (const [key, value] of input) {
    let current = tree;
    for (const letter of key) {
      current[letter] ??= {};
      current = current[letter];
    }
    current.value = value;
  }
  return tree
}

export type AStarReturnValue<T extends State> = { 
  plan: {
    action: Action,
    resources:[string, Record<keyof T, string|number>[string]][],
  }[] | null
  perf: PerformanceEntry|null
};

export type AStarYieldParams = {
  kill?: boolean
};

let actionsByEffect:ActionsByEffect<State>;

function generateKeyFromResources(resources: [string, number|string][]):string {
  // consolidate all the same resources togetherby putting them in an ordered map
  // then sort the map by key
  const resourceMap:{[key:string]: number|string} = {};
  // const resourceMap = new Map<string, number>();
  for (const [key, value] of resources) {
    // resourceMap.set(key, (resourceMap.get(key) ?? 0) + Number(value));
    if (typeof value === "number" && typeof resourceMap[key] === "number") {
      resourceMap[key] = (resourceMap[key] ?? 0) + value;
    } else {
      resourceMap[key] = value;
    }
  }
  return JSON.stringify([...Object.entries(resourceMap)].sort(([a], [b]) => a.localeCompare(b)));
}

export function* aStarPlanReversedGenerator<T extends State>(
  initialState: T,
  goalConditions: Conditions,
  actions: Action[],
  items: Record<string, Resource<T>>,
  maxCost = 999999
): Generator<AStarReturnValue<T>, AStarReturnValue<T>, AStarYieldParams> {
  performance.mark("start");
  console.log("starting aStarPlanReversed");
  const openSet = new PriorityQueue<{ 
    conditions: Conditions, 
    // state: T,
    plan: {action: Action, resources:[string, number|string][]}[], 
    cost: number 
  }>();
  console.log("before actionsByEffect");
  // Your indexing helpers
  if ( !actionsByEffect ) actionsByEffect = groupActionsByEffect(actions);
  // const actionsByEffect = groupActionsByEffect(actions);
  console.log("after actionsByEffect");

  // Start with the difference between initialState and goal.
  // (If we do backward planning, the "difference" is basically goalConditions itself to start.)
  const unmetGoalConditions = getUnmetConditions(initialState, goalConditions);
  console.log("after unmetGoalConditions");

  openSet.enqueue({ 
    // conditions: unmetGoalConditions,
    conditions: goalConditions,
    // state: initialState,
    plan: [],
    cost: 0 }
    , 0);
  console.log("after enqueue");

  const visited = new Map<string, number>();

  while (!openSet.isEmpty()) {
    const { 
      conditions,
      // state,
      plan,
      cost } = openSet.dequeue()!;
      
    const { kill }:AStarYieldParams = yield { plan, perf: null };
    // Check if initialState satisfies these conditions already
    const unmetConditions = getUnmetConditions(initialState, conditions);
    // console.log("unmetConditions", unmetConditions);
    if (kill || Object.keys(unmetConditions).length === 0) {
      // Goal reached
      performance.mark("success");
      return {plan, perf: performance.measure("A* plan success", "start", "success")};
    }
    
    // For each condition, see if any action's effects can help
    // conditionsLoop: for (const [key, neededCond] of Object.entries(conditions)) {
    conditionsLoop: for (const [key, neededCond] of Object.entries(unmetConditions)) {
      if (!actionsByEffect[key]) {
        console.log("skipping condition due to no actions", key);
        continue conditionsLoop;
      }

      actionByEffectLoop: for (let action of actionsByEffect[key]) {
        // const repeats = minimumRepeatsToFulfillAtLeastOneCondition(conditions, action);
        const {repeats, resources} = repeatsToFulfillAllPossibleConditions(initialState, conditions, action);
        // const {repeats, resources} = repeatsToFulfillAllPossibleConditions(initialState, unmetConditions, action);
        const newCost = cost + (action.cost * repeats);
        if ( action.once && plan.some(({action: {name}}) => name === action.name) ) {
          console.log("skipping action due to once", action.name, plan);
          continue actionByEffectLoop;
        }
        if (newCost > maxCost) {
          console.log("skipping action due to cost:", newCost, ">", maxCost);
          continue actionByEffectLoop;
        }
        if (repeats !== 1 ) {
          action = multiplyActionEffects(action, repeats);
        }
        // Try to reduce 'conditions' using action's effects
        const { conditions: newConditions, state: newState } = applyAction(conditions, initialState, action);
        // console.log("repeats", repeats, "newConditions", newConditions, "oldConditions", conditions, "action", action);
        const newPlan = [{action, resources}, ...plan]
        // console.log("newConditions", Object.entries(newConditions).sort(([a], [b]) => a.localeCompare(b)));
        // const stateKey = JSON.stringify(buildTree(Object.entries(newConditions)));
        const stateKey = generateKeyFromResources(newPlan.map(({resources}) => resources).flat());
        // console.log("stateKey", stateKey);
        // const doesnthave = !visited.has(stateKey);
        // const isbetter = newCost < visited.get(stateKey)!;
        // const existingCost = visited.get(stateKey);
        // console.log({doesnthave, isbetter, newCost, existingCost, stateKey});
        if (!visited.has(stateKey) || newCost < visited.get(stateKey)!) {
          // console.log("adding to visited", stateKey, newCost);
          // const unmetConditions = getUnmetConditions(newState, newConditions);
          visited.set(stateKey, newCost);
          openSet.enqueue({
              conditions: newConditions, 
              // state: newState, 
              // plan: [{action, resources}, ...plan], 
              plan: newPlan, 
              // plan: [{action, resources: []}, ...plan], 
              cost: newCost
            },
            estimateHeuristic(newConditions, items) // your heuristic can be newCost + estimateHeuristic(…)
          );
        }
      }
    }
  }
  performance.mark("fail");
  return { plan: null, perf: performance.measure("A* plan failed", "start", "fail") }; // no plan found
}
