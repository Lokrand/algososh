import { FC, useEffect, useState } from "react";
import { Button } from "../ui/button/button";
import { Column } from "../ui/column/column";
import { RadioInput } from "../ui/radio-input/radio-input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from "./sorting-page.module.css";
import { ElementStates } from "../../types/element-states";
import { Direction } from "../../types/direction";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { randomArr } from "../../utils/ramdomArr";
import { delay } from "../../utils/delay";

export const SortingPage: FC = () => {
  const [array, setArr] = useState<number[] | []>([]);
  const [sorted, setSorted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [right, setRight] = useState(-2);
  const [left, setLeft] = useState(-2);
  const [counter, setCounter] = useState(18);
  const [incButActive, setIncButActive] = useState(false);
  const [decButActive, setDecBtnActive] = useState(false);
  const [selection, setSelection] = useState(false);
  const [bubble, setBubble] = useState(false);

  useEffect(() => {
    setArr(randomArr(18, false));
  }, []);

  const handleSelectClick = () => {
    setSelection(true);
    setBubble(false);
  };
  const handleBubbleClick = () => {
    setBubble(true);
    setSelection(false);
  };

  const generateArr = () => {
    setSorted(false);
    setLeft(-2);
    setRight(-2);
    setCounter(18);
    setArr(randomArr(18, false));
  };

  const selectIncreaceSort = async (arr: number[]) => {
    setIsLoading(true);
    setSorted(false);
    let min: number;
    for (let i = 0; i < arr.length; i++) {
      min = i;
      for (let j = i; j < arr.length; j++) {
        if (arr[min] > arr[j]) {
          await delay(SHORT_DELAY_IN_MS);
          [arr[j], arr[min]] = [arr[min], arr[j]];
          const arrSorted = [...arr];
          setArr(arrSorted);
          setLeft(j);
          setRight(min);
        }
      }
    }
    setSorted(true);
    setIsLoading(false);
    setIncButActive(false);
    setDecBtnActive(false);
  };

  const selectionDecreaceSort = async (arr: number[]) => {
    setIsLoading(true);
    setSorted(false);
    let min: number;
    for (let i = 0; i < arr.length; i++) {
      min = i;
      for (let j = i; j < arr.length; j++) {
        if (arr[min] < arr[j]) {
          await delay(SHORT_DELAY_IN_MS);
          [arr[j], arr[min]] = [arr[min], arr[j]];
          const arrSorted = [...arr];
          setArr(arrSorted);
          setLeft(j);
          setRight(min);
        }
      }
    }
    setSorted(true);
    setIsLoading(false);
    setIncButActive(false);
    setDecBtnActive(false);
  };

  const bubbleIncreaceSort = async (arr: number[]) => {
    setIsLoading(true);
    setSorted(false);
    let elSorted = arr.length;
    for (let i = 0; i < arr.length; i++) {
      elSorted--;
      for (let j = 0; j < arr.length - 1 - i; j++) {
        if (arr[j] > arr[j + 1]) {
          await delay(SHORT_DELAY_IN_MS);
          [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
          const arrSorted = [...arr];
          setArr(arrSorted);
          setCounter(elSorted);
          setLeft(j);
          setRight(j + 1);
        }
      }
    }
    setSorted(true);
    setIsLoading(false);
    setIncButActive(false);
    setDecBtnActive(false);
  };
  const bubbleDecreaceSort = async (arr: number[]) => {
    setIsLoading(true);
    setSorted(false);
    let elSorted = arr.length;
    for (let i = 0; i < arr.length; i++) {
      elSorted--;
      for (let j = 0; j < arr.length - 1 - i; j++) {
        if (arr[j] < arr[j + 1]) {
          await delay(SHORT_DELAY_IN_MS);
          [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
          const arrSorted = [...arr];
          setArr(arrSorted);
          setCounter(elSorted);
          setLeft(j);
          setRight(j + 1);
        }
      }
    }
    setSorted(true);
    setIsLoading(false);
    setIncButActive(false);
    setDecBtnActive(false);
  };

  return (
    <SolutionLayout title="Сортировка массива">
      <div className={styles.header}>
        <RadioInput
          label="Выбор"
          name="type"
          value="selection"
          onChange={handleSelectClick}
          checked={selection}
        />
        <RadioInput
          label="Пузырёк"
          name="type"
          value="bubble"
          onChange={handleBubbleClick}
          checked={bubble}
        />
        <Button
          disabled={incButActive}
          isLoader={isLoading}
          text="По возрастанию"
          sorting={Direction.Ascending}
          style={{ minWidth: "210px" }}
          onClick={() => {
            setDecBtnActive(true);
            if (selection) {
              selectIncreaceSort(array);
            } else bubbleIncreaceSort(array);
          }}
        />
        <Button
          disabled={decButActive}
          isLoader={isLoading}
          text="По убыванию"
          sorting={Direction.Descending}
          style={{ minWidth: "210px", marginRight: "60px" }}
          onClick={() => {
            setIncButActive(true);
            if (selection) {
              selectionDecreaceSort(array);
            } else bubbleDecreaceSort(array);
          }}
        />
        <Button
          disabled={isLoading}
          onClick={generateArr}
          text="Новый массив"
          style={{ minWidth: "170px" }}
        />
      </div>
      <div className={styles.graph}>
        {sorted &&
          array.map((el, i) => {
            return <Column key={i} index={el} state={ElementStates.Modified} />;
          })}
        {!sorted &&
          array.map((el, index) => {
            if (index === right || index === left) {
              return (
                <Column key={index} index={el} state={ElementStates.Changing} />
              );
            }
            if (bubble && index > counter) {
              return (
                <Column key={index} index={el} state={ElementStates.Modified} />
              );
            }
            if (selection && index < right) {
              return (
                <Column key={index} index={el} state={ElementStates.Modified} />
              );
            } else
              return (
                <Column key={index} index={el} state={ElementStates.Default} />
              );
          })}
      </div>
    </SolutionLayout>
  );
};
