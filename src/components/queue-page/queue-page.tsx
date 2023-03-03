import { FC, useEffect, useRef, useState } from "react";
import styles from "./queue-page.module.css";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Queue } from "./queue";
import { Circle } from "../ui/circle/circle";
import { ElementStates } from "../../types/element-states";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { delay } from "../../utils/delay";

export const QueuePage: FC = () => {
  const ref = useRef<Queue<string>>();
  const [value, setValue] = useState("");
  const [queue, setQueue] = useState<(string | null)[] | undefined>([]);
  const [borderColor, setBorderColor] = useState(ElementStates.Default);
  const [borderColorOnHead, setBorderColorOnHead] = useState(
    ElementStates.Default
  );
  const [borderColorOnTail, setBorderColorOnTail] = useState(
    ElementStates.Default
  );

  useEffect(() => {
    ref.current = new Queue<string>();
    if (ref.current) setQueue(ref.current.elements);
  }, []);

  const changeBorderColor = async () => {
    setBorderColor(ElementStates.Changing);
    await delay(SHORT_DELAY_IN_MS);
    setBorderColor(ElementStates.Default);
  };

  const enqueue = async () => {
    changeBorderColor();
    await delay(SHORT_DELAY_IN_MS);
    setBorderColorOnTail(ElementStates.Changing);
    ref.current?.enqueue(value);
    setValue("");
    setQueue(ref.current?.elements);
    await delay(SHORT_DELAY_IN_MS);
    setBorderColorOnTail(ElementStates.Default);
    setBorderColorOnHead(ElementStates.Default);
  };

  const dequeue = async () => {
    setBorderColorOnHead(ElementStates.Changing);
    await delay(SHORT_DELAY_IN_MS);
    ref.current?.dequeue();
    if (ref.current) {
      const newQueue = [...ref.current.elements];
      setQueue(newQueue);
    }
    setBorderColorOnHead(ElementStates.Default);
  };

  const clear = () => {
    ref.current?.clear();
    setQueue(ref.current?.elements);
  };

  const isEmpty = ref.current?.isEmpty();
  return (
    <SolutionLayout title="Очередь">
      <div className={styles.header}>
        <Input
          maxLength={4}
          isLimitText={true}
          onChange={(e) => setValue(e.currentTarget.value)}
          value={value}
          disabled={
            borderColorOnTail === ElementStates.Changing ||
            borderColor === ElementStates.Changing
          }
        />
        <Button
          text="Добавить"
          onClick={enqueue}
          disabled={value === "" || ref.current?.tail === ref.current?.size}
          style={{ minWidth: "120px" }}
          isLoader={
            borderColorOnTail === ElementStates.Changing ||
            borderColor === ElementStates.Changing
          }
        />
        <Button
          text="Удалить"
          style={{ minWidth: "120px" }}
          onClick={dequeue}
          disabled={
            isEmpty ||
            borderColorOnHead === ElementStates.Changing ||
            borderColorOnTail === ElementStates.Changing ||
            borderColor === ElementStates.Changing
          }
          isLoader={borderColorOnHead === ElementStates.Changing}
        />
        <Button
          text="Очистить"
          onClick={clear}
          disabled={
            (isEmpty && ref.current?.tail !== ref.current?.size) ||
            borderColorOnHead === ElementStates.Changing ||
            borderColorOnTail === ElementStates.Changing ||
            borderColor === ElementStates.Changing
          }
          style={{ minWidth: "120px", marginLeft: "80px" }}
        />
      </div>
      <div className={styles.queue}>
        {queue?.map((el, index) => {
          if (
            ref.current &&
            el !== null &&
            ref.current?.head === ref.current?.tail - 1
          ) {
            return (
              <Circle
                key={index}
                letter={el}
                index={index}
                head={"head"}
                tail={"tail"}
                state={borderColorOnHead}
              />
            );
          }
          if (el !== null && index === ref?.current?.head)
            return (
              <Circle
                key={index}
                letter={el}
                index={index}
                head={"head"}
                state={borderColorOnHead}
              />
            );

          if (ref.current && el !== null && index === ref.current.tail - 1)
            return (
              <Circle
                key={index}
                letter={el}
                index={index}
                tail={"tail"}
                state={borderColorOnTail}
              />
            );
          else
            return (
              <Circle
                key={index}
                letter={el}
                index={index}
                state={
                  ref.current && index === ref.current?.tail
                    ? borderColor
                    : ElementStates.Default
                }
              />
            );
        })}
      </div>
    </SolutionLayout>
  );
};
