import React, { useState } from "react";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { Input } from "../ui/input/input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from "./string.module.css";

export const StringComponent: React.FC = () => {
  const [value, setValue] = useState("");
  const [active, setActive] = useState(false);
  const [isLoader, setIsLoader] = useState(false);

  const sortString = (string: string) => {
    setIsLoader(true);
    setActive(true);
    const result = [];
    for (let i = 0; i < string.length; i++) {
      for (let j = string.length - 1; j > 0; j--) {
        // setTimeout(() => {
          
        // }, 1000);
      }
    }

    setTimeout(() => {
      setIsLoader(false);
    }, string.length*1000)
  };

  console.log(value);
  return (
    <SolutionLayout title="Строка">
      <div className={styles.input}>
        <Input
          value={value}
          onChange={(e) => setValue(e.currentTarget.value)}
          maxLength={11}
          isLimitText
        />
        <Button
          onClick={() => {
            sortString(value);
          }}
          text="Развернуть"
          isLoader={isLoader}
        />
      </div>
      {active && (
        <div className={styles.circles}>
          {value.split("").map((el, index) => {
            return <Circle key={index} letter={el} />;
          })}
        </div>
      )}
    </SolutionLayout>
  );
};
