import { State } from "@/data/dataHelpers";
import { Resource } from "@/data/items/types";
import { FC, useState } from "react";

import styles from "./InitialStateDisplay.module.scss";

type InitialStateDisplayProps = {
  className?: string;
  headerLabel: string;
  initialItemState: (Resource<State>&{ count: number})[];
  updateItemState: (name: string, count: number) => void;
  initialQuestState: {
    name: string;
    state: null | string;
    possibleState: (null | string)[];
  }[];
  updateQuestState: (name: string, state: string|null) => void;
};

const InitialStateDisplay:FC<InitialStateDisplayProps> = ({
  className,
  headerLabel,
  initialItemState,
  updateItemState,
  initialQuestState,
  updateQuestState,
}) => {
  const [tab, setTab] = useState("items");
  const [search, setSearch] = useState("");
  const lowerSearch = search.toLowerCase();
  // const itemSearchFilter = (item: Resource<State>&{ count: number }) => {
  //   if ( search === "" ) {  return true; }
  //   return item.name.toLowerCase().includes(search);
  // }
  // const questSearchFilter = (quest: {name: string, state: null | string, possibleState: (null | string)[]}) => {
  //   if ( search === "" ) {  return true; }
  //   return quest.name.toLowerCase().includes(search);
  // }

  // places items with a count of 0 at the end of the list
  const itemSorter = (a: Resource<State>&{ count: number }, b: Resource<State>&{ count: number }) => {
    const aIncludesSearch = a.name.toLowerCase().includes(lowerSearch);
    const bIncludesSearch = b.name.toLowerCase().includes(lowerSearch);
    if ( ! (aIncludesSearch && bIncludesSearch) ) {
      if ( aIncludesSearch ) {
        return -1;
      }
      if ( bIncludesSearch ) {
        return 1;
      }
    }
    
    if ( !( a.count > 0 && b.count > 0 )) {
      if ( a.count > 0 ) {
        return -1;
      }
      if ( b.count > 0 ) {
        return 1;
      }
    }
    return 0;
  }

  const questSorter = (
    a: {name: string,
      state: null | string,
      possibleState: (null | string)[]
    },
    b: {
      name: string,
      state: null | string,
      possibleState: (null | string)[]
    }
  ) => {
    const aIncludesSearch = a.name.toLowerCase().includes(lowerSearch);
    const bIncludesSearch = b.name.toLowerCase().includes(lowerSearch);
    if ( ! (aIncludesSearch && bIncludesSearch) ) {
      if ( aIncludesSearch ) {
        return -1;
      }
      if ( bIncludesSearch ) {
        return 1;
      }
    }


    if ( a.state === null && b.state === null ) {
      return 0;
    }
    if ( a.state === null ) {
      return 1;
    }
    if ( b.state === null ) {
      return -1;
    }
    return 0;
  }

  const classList = [ styles["initial-state-display"] ];
  if ( className ) {
    classList.push(className);
  }
  return <div className={classList.join(" ")}>
    <div className={styles["initial-state-search"]}>
      <label htmlFor={styles["initial-state-search-input"]}>search:</label>
      <input id={styles["initial-state-search-input"]} name="search" type="text" value={search} onChange={(e) => setSearch(e.target.value)} />
    </div>
    <h2>{headerLabel}</h2>
    <div className="tabs">
      <button className={styles["tab"]} onClick={() => setTab("items")}>Items</button>
      <button className={styles["tab"]} onClick={() => setTab("quests")}>Quests</button>
    </div>
    <div className={styles["tab-content"]}>
      {/* <div> */}
        {tab === "items" && initialItemState/*.filter(itemSearchFilter)*/.sort(itemSorter).map((item, index, arr) => 
          <ItemEntry
            key={item.name}
            className={item.name.toLowerCase().includes(lowerSearch) && lowerSearch ? styles["highlight"] : ""}
            item={item}
            onChange={updateItemState}
            separator={item.count > 0 && arr[index + 1]?.count === 0}
          />
        )}
        {tab === "quests" && initialQuestState/*.filter(questSearchFilter)*/.sort(questSorter).map((quest, index, arr) => 
          <QuestEntry
            key={quest.name}
            className={quest.name.toLowerCase().includes(lowerSearch) && lowerSearch ? styles["highlight"] : ""}
            quest={quest}
            onChange={updateQuestState}
            separator={quest.state !== null && arr[index + 1]?.state === null}
          />
        )}
      {/* </div> */}
    </div>
  </div>;
}

type ItemEntryProps = {
  className?: string;
  item: Resource<State>&{ count: number };
  onChange: (name: string, count: number) => void;
  separator: boolean;
}

function ItemEntry({
  className = "",
  item,
  onChange,
  separator,
}:ItemEntryProps) {
  return <>
    <label className={styles["state-entry"]+ " " + className}>
      {item.name}:  
      <input
        className={styles["initial-state-item-input"]}
        type="number"
        value={item.count}
        onChange={(e) => onChange(item.name, parseInt(e.target.value || "0"))}
      />
    </label>
    {separator ? <Separator /> : null}
  </>;
};

type QuestEntryProps = {
  className?: string;
  quest: {name: string, state: null | string, possibleState: (null | string)[]};
  onChange: (name: string, state: string|null) => void;
  separator: boolean;
}

function QuestEntry({
  className = "",
  quest,
  onChange,
  separator,
}:QuestEntryProps) {
  return <>
    <label className={styles["state-entry"] + " " + className}>
      {quest.name}:
      <select
        className={styles["initial-state-quest-select"]}
        onChange={(e) => onChange(quest.name, e.target.value ?? null)}
        value={quest.state ?? undefined}
      >
        {quest.possibleState.map((state) => 
        <option 
          key={state ?? "incomplete"}
          value={state ?? "incomplete"}
        >
          {state ?? "incomplete"}
        </option>)}
      </select>
    </label>
    {separator ? <Separator /> : null}
  </>;
}

function Separator() {
  return <div className={styles["separator"]} />;
}

export default InitialStateDisplay;
