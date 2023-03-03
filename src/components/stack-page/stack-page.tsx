import { FC, useEffect, useRef, useState } from "react";
import styles from "./stack-page.module.css";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { Button } from "../ui/button/button";
import { Input } from "../ui/input/input";
import { Circle } from "../ui/circle/circle";
import { Stack } from "./stack";
import { ElementStates } from "../../types/element-states";
import { delay } from "../../utils/delay";

export const StackPage: FC = () => {
  const ref = useRef<Stack<string>>();
  const [value, setValue] = useState("");
  const [stack, setStack] = useState<string[]>();
  const [borderColor, setBorderColor] = useState(ElementStates.Default);
  const [removed, setRemoved] = useState(false);
  const [isAddEl, setIsAddEl] = useState(false);

  useEffect(() => {
    ref.current = new Stack<string>();
  }, []);

  const push = async () => {
    if (value === "") return;
    setBorderColor(ElementStates.Changing);
    setIsAddEl(true);
    ref.current?.push(value);
    setValue("");
    setStack(ref.current?.container);
    await delay(SHORT_DELAY_IN_MS);
    setIsAddEl(false);
    setBorderColor(ElementStates.Default);
  };

  const pop = async () => {
    setBorderColor(ElementStates.Changing);
    setRemoved(true);
    await delay(SHORT_DELAY_IN_MS);
    ref.current?.pop();
    setBorderColor(ElementStates.Default);
    setRemoved(false);
    setStack(ref.current?.container);
  };

  const clear = () => {
    ref.current?.clear();
    setStack(ref.current?.container);
  };

  const length = ref.current?.getSize();

  return (
    <SolutionLayout title="Стек">
      <div className={styles.header}>
        <Input
          value={value}
          isLimitText={true}
          maxLength={4}
          onChange={(e) => setValue(e.currentTarget.value)}
        />
        <Button
          text="Добавить"
          onClick={push}
          disabled={value === ""}
          style={{ minWidth: "120px" }}
          isLoader={isAddEl}
        />
        <Button
          text="Удалить"
          style={{ minWidth: "120px" }}
          onClick={pop}
          disabled={!stack || stack?.length === 0 || isAddEl}
          isLoader={removed}
        />
        <Button
          text="Очистить"
          onClick={clear}
          disabled={!stack || stack?.length === 0 || removed || isAddEl}
          style={{ minWidth: "120px", marginLeft: "60px" }}
        />
      </div>
      <div className={styles.stack}>
        {stack &&
          stack.map((el, index) => {
            if (length && index === length - 1) {
              return (
                <Circle
                  key={index}
                  letter={el}
                  index={index}
                  head={"top"}
                  state={borderColor}
                />
              );
            } else return <Circle key={index} letter={el} index={index} />;
          })}
      </div>
    </SolutionLayout>
  );
};
