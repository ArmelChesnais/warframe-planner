import type { FC } from "react";
import type { Action, AStarReturnValue, State } from "@/data/dataHelpers";

import { formatTime } from "@/utils/timeUtils";

import styles from "./PlanDisplay.module.scss";

type PlanDisplayProps = {
  className?: string;
  plan: AStarReturnValue<State>["plan"];
};

const PlanDisplay:FC<PlanDisplayProps> = ({
  className,
  plan
}) => {

  const classList = [ styles["plan-display"] ];
  if ( className ) {
    classList.push(className);
  }
  if ( !plan ) {
    return <div className={classList.join(" ")}>
      no Plan found
    </div>;
  }
  const totalTime = plan.reduce((acc, {action}) => acc + action.cost, 0);
  const formattedTime = formatTime(totalTime, "minutes", "HH:mm:ss", true);

  return <div className={classList.join(" ")}>
    Plan (estimated time: {formattedTime}):
    <div className={styles["plan-entries"]}>
      {plan.map(({action, resources}, index) => 
        <PlanEntry key={index} action={action} resources={resources} />
      )}
    </div>
  </div>;
}

type PlanEntryProps = {
  action: Action;
  resources: [string, string|number][];
}

const PlanEntry: FC<PlanEntryProps> = ({
  action,
  resources
}) => {
  return <div className={styles["plan-entry"]}>
    <div className={styles["plan-resource-name"]}>{action.name}</div>
    <div className={styles["plan-resource-list"]}>{resources.map(([name, count]) => <div key={name}>{name}: {count}</div>)}</div>
  </div>
}

export default PlanDisplay;