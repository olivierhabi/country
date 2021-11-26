import React, { useState } from "react";
import { Switch } from "@headlessui/react";

export default function Example() {
  const [isEnabled, setIsEnabled] = useState(false);

  return (
    <Switch checked={isEnabled} onChange={setIsEnabled}>
      <span className="block bg-white rounded-full border border-black p-1 h-20 w-36 mt-6">
        <span
          className={`block h-full w-1/2 rounded transition duration-300 ease-in-out transform ${
            isEnabled
              ? "bg-black rounded-full translate-x-full"
              : "bg-green-500 rounded-full"
          }`}
        ></span>
      </span>
    </Switch>
  );
}
