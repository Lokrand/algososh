import React, { useState } from "react";
import { Button } from "../ui/button/button";
import { Column } from "../ui/column/column";
import { RadioInput } from "../ui/radio-input/radio-input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from "./sorting-page.module.css";

const randomArr = () => {
  const result: number[] = [];
  const resultLength = Math.floor(Math.random() * 18);
  for (let i = 0; i < (resultLength > 3 ? resultLength : 3); i++) {
    result.push(Math.floor(Math.random() * 101));
  }
  return result;
};

export const SortingPage: React.FC = () => {
  const [arr, setArr] = useState<number[]>([]);

  

  return (
    <SolutionLayout title="Сортировка массива">
      <div className={styles.header}>
        <div className={styles.header__radioInputs}>
          <RadioInput label="Выбор" />
          <RadioInput label="Пузырёк" />
        </div>
        <div className={styles.header__sortButtons}>
          <Button text="По возрастанию" />
          <Button text="По убыванию" />
        </div>
        <Button
          text="Новый массив"
          onClick={() => {
            console.log("generate random arr", setArr(randomArr()));
          }}
        />
      </div>
      <div>
        {arr.map((el, index) => {
          return <Column key={index} index={el} />;
        })}
      </div>
    </SolutionLayout>
  );
};
