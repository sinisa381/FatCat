import { useCallback, useRef, useState } from "react";
import { useVirtual } from "react-virtual";
import "./App.css";
import { PersonRows } from "./components/PersonRows";
import json from "./generated.json";
import { Person, PersonEvent } from "./types";

function App() {
  const [state, setState] = useState<Person[]>(json);
  const parentRef = useRef<HTMLDivElement>(null);

  const rowVirtualizer = useVirtual({
    size: json.length,
    parentRef,
    estimateSize: useCallback(() => 140, []),
  });

  const handleChange = useCallback(
    (e: PersonEvent, index: number, name: string) => {
      let value: string | boolean = e.target.value;

      setState((prevState) =>
        prevState.map((item, i) =>
          i === index
            ? {
                ...item,
                [name]:
                  value === "inactive"
                    ? false
                    : value === "active"
                    ? true
                    : value,
              }
            : item,
        ),
      );
    },
    [setState],
  );

  return (
    <div className="App">
      <div
        ref={parentRef}
        style={{
          height: `100vh`,
          width: `100%`,
          overflow: "auto",
        }}
      >
        <div
          style={{
            height: rowVirtualizer.totalSize,
            width: "100%",
            position: "relative",
          }}
        >
          {rowVirtualizer.virtualItems.map((virtualRow) => (
            <div
              key={virtualRow.index}
              ref={virtualRow.measureRef}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                transform: `translateY(${virtualRow.start}px)`,
              }}
            >
              <div style={{ height: `${state[virtualRow.index]}px` }}>
                <PersonRows
                  index={virtualRow.index}
                  key={virtualRow.index}
                  person={state[virtualRow.index]}
                  onChange={handleChange}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
