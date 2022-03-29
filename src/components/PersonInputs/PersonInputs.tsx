import { Person, PersonEvent } from "../../types";
import { COL_WIDTHS } from "../../utils/size";

type ColumnProp = {
  name: keyof Omit<Person, "id">;
  type?: string;
};

const COLUMN_PROPS: ColumnProp[] = [
  {
    name: "isActive",
    type: "radio",
  },
  {
    name: "picture",
    type: "text",
  },
  {
    name: "age",
    type: "number",
  },
  {
    name: "name",
    type: "text",
  },
  {
    name: "email",
    type: "email",
  },
  {
    name: "address",
    type: "text",
  },
  {
    name: "about",
  },
  {
    name: "registered",
    type: "date",
  },
];

const PersonInputs = ({
  person,
  index,
  onChange,
}: {
  person: Person;
  index: number;
  onChange: (e: PersonEvent, index: number, name: string) => void;
}) => {
  const year = new Date(person.registered).getFullYear();
  const month = String(new Date(person.registered).getMonth() + 1).padStart(
    2,
    "0",
  );
  const day = String(new Date(person.registered).getDate()).padStart(2, "0");

  const columns = COLUMN_PROPS.map((item, i) => {
    const styles = { width: `${COL_WIDTHS[item.name]}vw`, marginRight: 5 };
    if (item.name === "isActive") {
      return (
        <div
          style={{ ...styles, display: "flex", flexDirection: "column" }}
          key={i}
        >
          <div style={{ marginLeft: 12 }}>
            <label htmlFor="active">active</label>
            <input
              style={{ width: "45%" }}
              {...item}
              name={`${item.name}${index}`}
              value="active"
              checked={person[item.name] === true}
              onChange={(e) => onChange(e, index, item.name)}
            />
          </div>
          <div>
            <label htmlFor="inactive">inactive</label>
            <input
              style={{ width: "45%" }}
              {...item}
              name={`${item.name}${index}`}
              checked={person[item.name] === false}
              value="inactive"
              onChange={(e) => onChange(e, index, item.name)}
            />
          </div>
        </div>
      );
    } else if (item.name === "about") {
      return (
        <div style={styles} key={i}>
          <textarea
            style={{ width: "90%" }}
            value={person[item.name]}
            onChange={(e) => onChange(e, index, item.name)}
          />
        </div>
      );
    } else {
      return (
        <div style={styles} key={i}>
          <input
            style={{ width: "90%" }}
            value={
              item.name === "registered"
                ? `${year}-${month}-${day}`
                : person[item.name]
            }
            {...item}
            onChange={(e) => onChange(e, index, item.name)}
          />
        </div>
      );
    }
  });
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "center",
      }}
    >
      {columns}
    </div>
  );
};
export default PersonInputs;
