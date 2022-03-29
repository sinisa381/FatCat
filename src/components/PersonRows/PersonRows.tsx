import { Person, PersonEvent } from "../../types";
import { PersonInputs } from "../PersonInputs";
import { PersonOutputs } from "../PersonOutputs";

const PersonRows = (props: {
  person: Person;
  index: number;
  onChange: (e: PersonEvent, index: number, name: string) => void;
}) => {
  return (
    <div
      style={{
        borderBottom: "1px solid rgba(0,0,0,0.08)",
        background: "#fafafa",
        margin: "10px 0",
      }}
    >
      <PersonOutputs {...props.person} />
      {!props.person.id && <PersonInputs {...props} />}
    </div>
  );
};
export default PersonRows;
