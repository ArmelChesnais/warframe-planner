'use client'

import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";

// import { goalState } from "@/data/data";

import type { State, Action, AStarReturnValue } from "@/data/dataHelpers";
import { aStarPlanReversedGenerator } from "@/data/dataHelpers";
import actions from "@/data/data";
import { itemMap } from "@/data/items";
import PlanDisplay from "@/components/PlanDisplay/PlanDisplay";

import type { Resource } from "@/data/items/types";

import styles from "./testpage.module.scss";
import InitialStateDisplay from "@/components/InitialStateDisplay/InitialStateDisplay";


// A large initial state space
// const initialState = {
// };

// const goalState: State = {
//   // "The Hex": "complete",
//   // "Ember": { ">=": 1 },
//   // "Excalibur": { ">=": 1 },
//   "Ash": { ">=": 1 },
//   // "Ember Neuroptics Blueprint": { ">=": 1 },
// };

type InitialItemsState = (Resource<State>&{count: number})[]
type InitialQuestState = {name: string, state: null|string, possibleState: (null|string)[]}[]

function convertInitialItemsQuestsToInitialState(initialItemsState: InitialItemsState, initialQuestState: InitialQuestState): State {
  const initialState: State = {};
  for (const item of initialItemsState) {
    initialState[item.name] = item.count;
  }
  for (const quest of initialQuestState) {
    initialState[quest.name] = quest.state;
  }
  return initialState;
}

function convertGoalItemsQuestsToGoalState(itemGoals: InitialItemsState, questGoals: InitialQuestState): State {
  const goalState: State = {};
  for (const item of itemGoals) {
    goalState[item.name] = { ">=": item.count };
  }
  for (const quest of questGoals) {
    goalState[quest.name] = quest.state;
  }
  return goalState;
}

export default function Test() {
  const _initialItems:InitialItemsState = useMemo(() => Object.values(itemMap).sort((a, b) => a.name.localeCompare(b.name)).map((item) => ({...item, count: 0})), []);
  const [initialItemsState, setInitialItemsState] = useState(_initialItems);
  const [itemGoals, setItemGoals] = useState<InitialItemsState>(_initialItems);
  const [buttonLabel, setButtonLabel] = useState("Run");
  const _initialQuests: InitialQuestState = useMemo(() => {
    const questList: InitialQuestState = [];
    for (const action of actions) {
      effectsLoop: for ( const [key, value] of Object.entries(action.effects) ) {
        if ( typeof value !== "string" ) continue effectsLoop;
        const existingQuest = questList.find((quest) => quest.name === key);
        if ( !existingQuest ) {
          questList.push({name: key, state: null, possibleState: [null, value]});
        } else if ( !existingQuest.possibleState.includes(value) ) {
          existingQuest.possibleState.push(value);
        }
      }
    }
    return questList
  }, []);
  const [initialQuestState, setInitialQuestState] = useState(_initialQuests);
  const [questGoals, setQuestGoals] = useState(_initialQuests);

  // console.log("initialItemsState:", initialItemsState, initialQuestState);
  // console.log("itemGoals:", itemGoals, questGoals);
  const [plan, setPlan] = useState<AStarReturnValue<State>["plan"]|null>(null);
  const [perf, setPerf] = useState<string|null>(null);
  const [status, setStatus] = useState<string|null>("Awaiting Run");
  const animationFrameRef = useRef<number|null>(null);
  const killSignalRef = useRef<boolean>(false);

  function processPerf(perf: PerformanceEntry|null) {
    const duration = perf?.duration;
    if ( !duration ) {
      setPerf(null);
      return;
    }
    const toFormat = {
      seconds: Math.floor(duration / 1000),
      ms: Math.floor(duration % 1000)
    }
    const perfStringS = toFormat.seconds ? `${toFormat.seconds}s ` : "";
    const perfStringMS = toFormat.ms ? `${toFormat.ms}ms` : "";
    setPerf(`${perfStringS}${perfStringMS}`);
  }

  const startRun = () => {
    if ( animationFrameRef.current !== null ) {
      killSignalRef.current = true;
      return;
    }
    // const initialState = convertInitialItemsStateToInitialState(initialItemsState);
    const initialState = convertInitialItemsQuestsToInitialState(initialItemsState, initialQuestState);
    const goalState = convertGoalItemsQuestsToGoalState(itemGoals, questGoals);
    const generator = aStarPlanReversedGenerator(initialState, goalState, actions, itemMap, 10000);
    let lastMeasure:DOMHighResTimeStamp, currentMeasure:DOMHighResTimeStamp;
    let newPlan:typeof plan, newPerf:PerformanceEntry | null;
    newPlan = newPerf = null;
    const runGenerator = () => {
      setStatus("Running");
      lastMeasure = currentMeasure = performance.now();
      while ( currentMeasure - lastMeasure < 100 ) {
        const { value, done } = generator.next({kill:killSignalRef.current});
        if ( value.plan ) newPlan = value.plan;
        newPerf = value.perf;
        if (done) {
          setStatus(killSignalRef.current ? "Killed" : "Done");
          killSignalRef.current = false;
          setPlan(newPlan);
          setButtonLabel("Run");
          processPerf(newPerf);
          if (animationFrameRef.current !== null) {
            cancelAnimationFrame(animationFrameRef.current);
            animationFrameRef.current = null;
          }
          return;
        }
        currentMeasure = performance.now();
      }
      setPlan(newPlan);
      processPerf(newPerf);
      animationFrameRef.current = requestAnimationFrame(runGenerator);
    }
    setButtonLabel("Stop");
    runGenerator();
  };
      
  useEffect(() => {
    return () => {
      if (animationFrameRef.current !== null) {
        cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null
      }
    }
  }, []);

  const updateItemState = useCallback((name: string, count: number) => {
    setInitialItemsState((prev) => {
      const newItems = prev.map((item) => {
        if ( item.name === name ) {
          return {...item, count: Math.max(0, count)};
        }
        return item;
      });
      return newItems;
    });
  }, []);
  const updateQuestState = useCallback((name: string, state: null|string) => {
    setInitialQuestState((prev) => {
      const newQuests = prev.map((quest) => {
        if ( quest.name === name ) {
          return {...quest, state: state === "incomplete" ? null : state};
        }
        return quest;
      });
      return newQuests;
    });
  }, []);
  const updateItemGoal = useCallback((name: string, count: number) => {
    setItemGoals((prev) => {
      const newItems = prev.map((item) => {
        if ( item.name === name ) {
          return {...item, count: Math.max(0, count)};
        }
        return item;
      });
      return newItems;
    });
  }, []);
  const updateQuestGoal = useCallback((name: string, state: null|string) => {
    console.log("updateQuestGoal", name, state);
    setQuestGoals((prev) => {
      const newQuests = prev.map((quest) => {
        if ( quest.name === name ) {
          return {...quest, state: state === "incomplete" ? null : state};
        }
        return quest;
      });
      return newQuests;
    });
  }, []);

  // const { plan, perf } = React.useMemo(() => {
  //   return aStarPlanReversed(initialState, goalState, actions, 10000);
  // }, []);
  return (
  <div className={styles["planner-container"]}>
    <div className={styles["planner-header"]}>
      <h1>Warframe Planner</h1>
      <button className={styles["run-button"]} onClick={startRun}>
        {buttonLabel}
      </button>
      <div>{status}{perf ? <span className={styles["perf"]}> in {perf}</span> : null}</div>
      
    </div>
    <div className={styles["planner-main-view"]}>
      <InitialStateDisplay
        headerLabel="Initial State"
        initialItemState={initialItemsState}
        updateItemState={updateItemState}
        initialQuestState={initialQuestState}
        updateQuestState={updateQuestState}
      />
      <PlanDisplay plan={plan} />
      <InitialStateDisplay
        headerLabel="Goal State"
        initialItemState={itemGoals}
        updateItemState={updateItemGoal}
        initialQuestState={questGoals}
        updateQuestState={updateQuestGoal}
      />
    </div>
  </div>
  );
}

