import React from "react";
import { Button } from "../ui/button/button";
import { RadioInput } from "../ui/radio-input/radio-input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from "./sorting-page.module.css";

const randomArr = () => {
  
}

export const SortingPage: React.FC = () => {

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
        <Button text="Новый массив" />
      </div>
    </SolutionLayout>
  );
};
