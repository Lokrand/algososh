import React, { useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import styles from "./fibonacci-page.module.css";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";

export const FibonacciPage: React.FC = () => {
  const [arr, setArr] = useState<number[]>([]);
  const [value, setValue] = useState(1);
  const [active, setActive] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const generateFibArr = async (n: number) => {
    setActive(true);
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, SHORT_DELAY_IN_MS));
    setArr([1]);
    await new Promise((resolve) => setTimeout(resolve, SHORT_DELAY_IN_MS));
    setArr([1, 1]);
    let fib: number[] = [1, 1];
    for (let i = 2; i < n + 1; i++) {
      await new Promise((resolve) => setTimeout(resolve, SHORT_DELAY_IN_MS));
      fib[i] = fib[i - 2] + fib[i - 1];
      setArr((arr) => [...arr, fib[i]]);
    }
    setIsLoading(false);
  };

  return (
    <SolutionLayout title="Последовательность Фибоначчи">
      <div className={styles.header}>
        <Input
          min={1}
          max={19}
          type={"number"}
          onChange={(e) => setValue(+e.currentTarget.value)}
          isLimitText={true}
          disabled={isLoading}
        />
        <Button
          isLoader={isLoading}
          disabled={value <= 1 || value > 19}
          text="Рассчитать"
          onClick={() => {
            generateFibArr(value);
          }}
          style={{ minWidth: "180px" }}
        />
      </div>
      <div className={styles.circles}>
        {active &&
          arr.map((el, index) => {
            return (
              <Circle key={index} letter={String(el)} tail={String(index)} />
            );
          })}
      </div>
    </SolutionLayout>
  );
};
