import { useCallback, useState } from "react";
import "./App.css";
import { PersonRows } from "./components/PersonRows";
import json from "./generated.json";
import { Person, PersonEvent } from "./types";

function App() {
  const [state, setState] = useState<Person[]>(json);

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
      <div style={{ display: "flex", flexDirection: "column" }}>
        {state.map((person, index) => (
          <PersonRows
            index={index}
            key={index}
            person={person}
            onChange={handleChange}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
