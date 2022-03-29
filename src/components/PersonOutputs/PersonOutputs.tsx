// import { memo } from "react";
import { Person } from "../../types";
import { COL_WIDTHS } from "../../utils/size";

const PersonOutputs = (props: Person) => {
  const { id, ...rest } = props;
  const year = new Date(rest["registered"]).getFullYear();
  const month = String(new Date(rest["registered"]).getMonth() + 1).padStart(
    2,
    "0",
  );
  const day = String(new Date(rest["registered"]).getDate()).padStart(2, "0");
  const finalDate = `${day}-${month}-${year}`;
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "center",
      }}
    >
      {Object.keys(rest).map((key) => {
        const result = rest[key as keyof Omit<Person, "id">];
        return (
          <div
            key={key}
            style={{
              marginRight: 5,
              width: `${COL_WIDTHS[key as keyof Omit<Person, "id">]}vw`,
            }}
          >
            <strong>{key}</strong>:{" "}
            {key === "registered"
              ? finalDate
              : key === "isActive"
              ? JSON.stringify(result)
              : result}
          </div>
        );
      })}
    </div>
  );
};
// export default memo(PersonOutputs);
export default PersonOutputs;
