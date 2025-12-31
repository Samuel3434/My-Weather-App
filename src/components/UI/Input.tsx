import { useState } from "react";



export default function Innut() {
  const [val, setVal] = useState<string>('');

  return (
    <>
      <input
        className="input"
        value={val}
        onChange={(e) => {
          setVal(e.target.value);
        }}
        type="text"
        placeholder="Enter the city..."
        id="inputfield"
      />
    </>
  );
}
