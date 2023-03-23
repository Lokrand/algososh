import { useState, FC } from "react";
import styles from "./string.module.css";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { ElementStates } from "../../types/element-states";
import { DELAY_IN_MS, SHORT_DELAY_IN_MS } from "../../constants/delays";
import { delay } from "../../utils/delay";

export const StringComponent: FC = () => {
  const [value, setValue] = useState("");
  const [arr, setArr] = useState<string[]>([]);
  const [isSorted, setIsSorted] = useState(false);
  const [start, setStart] = useState(-1);
  const [end, setEnd] = useState(12);
  const [isLoading, setIsLoading] = useState(false);

  const reverse = async (str: string) => {
    setIsLoading(true);
    setIsSorted(false);
    setStart(-1);
    setEnd(12);
    const splitStr = str.split("");
    setArr(splitStr);
    let start = 0;
    let end: number;
    str.length % 2 === 0
      ? (end = splitStr.length)
      : (end = splitStr.length - 1);
    await delay(SHORT_DELAY_IN_MS);
    setStart(start);
    str.length % 2 === 0 ? setEnd(end - 1) : setEnd(end);

    while (str.length % 2 === 0 ? start < end : start <= end) {
      setArr(splitStr);
      setStart(start);
      str.length % 2 === 0 ? setEnd(end - 1) : setEnd(end);
      await delay(DELAY_IN_MS);
      str.length % 2 === 0
        ? ([splitStr[start], splitStr[end - 1]] = [
            splitStr[end - 1],
            splitStr[start],
          ])
        : ([splitStr[start], splitStr[end]] = [splitStr[end], splitStr[start]]);
      start++;
      end--;
      setValue(splitStr.join(""));
    }
    setIsSorted(true);
    setIsLoading(false);
  };

  return (
    <SolutionLayout title="Строка">
      <div className={styles.header}>
        <Input
          maxLength={11}
          isLimitText={true}
          onChange={(e) => setValue(e.currentTarget.value)}
        />
        <Button
          id="stringButton"
          isLoader={isLoading}
          text="Развернуть"
          onClick={() => {
            reverse(value);
          }}
          style={{ minWidth: "178px" }}
          disabled={value === ""}
        />
      </div>
      <div className={styles.circles}>
        {isSorted &&
          arr.map((letter, i) => {
            return (
              <Circle key={i} letter={letter} state={ElementStates.Modified} />
            );
          })}
        {!isSorted &&
          arr.map((el, index) => {
            if (index === start || index === end) {
              return (
                <Circle
                  key={index}
                  letter={el}
                  state={ElementStates.Changing}
                />
              );
            }
            if (index < start || index > end) {
              return (
                <Circle
                  key={index}
                  letter={el}
                  state={ElementStates.Modified}
                />
              );
            } else if (index > start || index < end) {
              return (
                <Circle key={index} letter={el} state={ElementStates.Default} />
              );
            }
          })}
      </div>
    </SolutionLayout>
  );
};
