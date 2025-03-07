import type { FC } from "react";
import type { Action, AStarReturnValue, State } from "@/data/dataHelpers";

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

  return <div className={classList.join(" ")}>
    Plan:
    {plan.map(({action, resources}, index) => 
      <PlanEntry key={index} action={action} resources={resources} />
    )}
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