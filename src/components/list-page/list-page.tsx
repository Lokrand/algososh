import {
  MutableRefObject,
  useEffect,
  useMemo,
  useRef,
  useState,
  FC,
} from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from "./list-page.module.css";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { List } from "./list";
import { Circle } from "../ui/circle/circle";
import { ArrowIcon } from "../ui/icons/arrow-icon";
import { ElementStates } from "../../types/element-states";
import { DELAY_IN_MS } from "../../constants/delays";
import { delay } from "../../utils/delay";
import { randomArr } from "../../utils/ramdomArr";

export const ListPage: FC = () => {
  const [textInput, setTextInput] = useState("");
  const [numberInput, setNumberInput] = useState("");
  const [list, setList] = useState<string[]>([]);
  const [removeHead, setRemoveHead] = useState(false);
  const [removeTail, setRemoveTail] = useState(false);
  const [removeIndex, setRemoveIndex] = useState(false);
  const [counter, setCounter] = useState(-1);
  const [changeTail, setChangeTail] = useState(false);
  const [changeHead, setChangeHead] = useState(false);
  const [isAddByIndex, setIsAddByIndex] = useState(false);
  const [onIndex, setOnIndex] = useState(false);
  const [borderColorHead, setBorderColorHead] = useState(ElementStates.Default);
  const [borderColorTail, setBorderColorTail] = useState(ElementStates.Default);
  const [size, setSize] = useState(0);
  const ref = useRef() as MutableRefObject<List<string>>;

  const changeColorHead = async () => {
    setBorderColorHead(ElementStates.Modified);
    await delay(DELAY_IN_MS);
    setBorderColorHead(ElementStates.Default);
  };

  const changeColorTail = async () => {
    setBorderColorTail(ElementStates.Modified);
    await delay(DELAY_IN_MS);
    setBorderColorTail(ElementStates.Default);
  };

  useEffect(() => {
    ref.current = new List<string>();
    const arrInit = randomArr(4, true);
    for (let i = 0; i < arrInit.length; i++) {
      ref.current.append(String(arrInit[i]));
    }
    const list = ref.current.toArr();
    const arr: string[] = [];
    if (list) {
      list.forEach((el) => arr.push(el.value));
      setList(arr);
    }
  }, []);

  useMemo(() => {
    if (ref.current) {
      const length = ref.current.getSize();
      setSize(length);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ref.current?.getSize()]);

  const append = async () => {
    setChangeTail(true);
    if (size === 0) setList([""]);
    await delay(DELAY_IN_MS);
    setChangeTail(false);
    ref.current?.append(textInput);
    const list = ref.current?.toArr();
    const arr: string[] = [];
    if (list) {
      list.forEach((el) => arr.push(el.value));
      setList(arr);
    }
    setTextInput("");
    setNumberInput("");
    changeColorTail();
  };

  const prepend = async () => {
    setChangeHead(true);
    if (ref.current?.getSize() === 0) setList([""]);
    await delay(DELAY_IN_MS);
    setChangeHead(false);
    ref.current?.prepend(textInput);
    const list = ref.current?.toArr();
    const arr: string[] = [];
    if (list) {
      list.forEach((el) => arr.push(el.value));
      setList(arr);
    }
    setTextInput("");
    setNumberInput("");
    changeColorHead();
  };

  const handleDeleteTailButtonClick = async () => {
    setChangeTail(true);
    setRemoveTail(true);
    ref.current?.removeTail();
    const list = ref.current?.toArr();
    const arr: string[] = [];
    await delay(DELAY_IN_MS);
    if (list) {
      list.forEach((el) => arr.push(el.value));
      setList(arr);
    }
    setRemoveTail(false);
    setChangeTail(false);
  };

  const handleDeleteHeadButtonClick = async () => {
    setChangeHead(true);
    setRemoveHead(true);
    ref.current?.removeHead();
    const list = ref.current?.toArr();
    const arr: string[] = [];
    await delay(DELAY_IN_MS);
    if (list) {
      list.forEach((el) => arr.push(el.value));
      setList(arr);
    }
    setRemoveHead(false);
    setChangeHead(false);
  };

  const showResult = async () => {
    let counter = -1;
    while (counter < +numberInput) {
      await delay(DELAY_IN_MS);
      counter++;
      setCounter(counter);
    }
  };

  const removeElByIndex = async () => {
    showResult();
    setRemoveIndex(true);
    const arr: string[] = [];
    await new Promise((resolve) =>
      setTimeout(resolve, (+numberInput + 2) * DELAY_IN_MS)
    );
    ref.current?.removeElByIndex(+numberInput);
    const list = ref.current?.toArr();
    if (list) {
      list.forEach((el) => arr.push(el.value));
      setList(arr);
    }
    setRemoveIndex(false);
    setCounter(-1);
    setNumberInput("");
    setTextInput("");
  };

  const addElByIndex = async () => {
    showResult();
    setIsAddByIndex(true);
    setOnIndex(true);
    const arr: string[] = [];
    await new Promise((resolve) =>
      setTimeout(resolve, (+numberInput + 1) * DELAY_IN_MS)
    );
    ref.current?.addElByIndex(textInput, +numberInput);
    const list = ref.current?.toArr();
    if (list) {
      list.forEach((el) => arr.push(el.value));
      setIsAddByIndex(false);
      setList(arr);
    }
    await delay(DELAY_IN_MS);
    setNumberInput("");
    setTextInput("");
    setCounter(-1);
    setOnIndex(false);
  };

  return (
    <SolutionLayout title="Связный список">
      <div className={styles.header}>
        <Input
          id="list-input-string"
          maxLength={4}
          isLimitText={true}
          onChange={(e) => setTextInput(e.currentTarget.value)}
          name="value"
          value={textInput}
          type="text"
          style={{ width: "210px" }}
          disabled={
            removeHead ||
            onIndex ||
            removeTail ||
            changeHead ||
            changeTail ||
            removeIndex
          }
        />
        <Button
          id="head-add"
          text="Добавить в head"
          onClick={prepend}
          style={{ width: "170px" }}
          disabled={textInput === "" || changeTail || onIndex}
          isLoader={changeHead && !removeHead}
        />
        <Button
          id="tail-add"
          text="Добавить в tail"
          onClick={append}
          style={{ width: "170px" }}
          disabled={textInput === "" || changeHead || onIndex}
          isLoader={changeTail && !removeTail}
        />
        <Button
          id="head-remove"
          text="Удалить из head"
          onClick={handleDeleteHeadButtonClick}
          style={{ width: "170px" }}
          disabled={
            changeTail || changeHead || onIndex || removeIndex || size === 0
          }
          isLoader={removeHead}
        />
        <Button
          id="tail-remove"
          text="Удалить из tail"
          onClick={handleDeleteTailButtonClick}
          style={{ width: "170px" }}
          disabled={
            changeTail || changeHead || onIndex || removeIndex || size === 0
          }
          isLoader={removeTail}
        />
      </div>
      <div className={styles.header}>
        <Input
          id="list-input-number"
          min={0}
          max={size}
          maxLength={2}
          onChange={(e) => setNumberInput(e.currentTarget.value)}
          name="index"
          value={numberInput}
          type="number"
          style={{ width: "210px" }}
          placeholder={"Введите число"}
          disabled={
            removeHead ||
            onIndex ||
            removeTail ||
            changeHead ||
            changeTail ||
            removeIndex
          }
        />
        <Button
          id="add-by-index"
          text="Добавить по индексу"
          onClick={addElByIndex}
          style={{ width: "352px" }}
          disabled={
            numberInput === "" || textInput === "" || +numberInput >= size
          }
          isLoader={onIndex}
        />
        <Button
          id="remove-by-index"
          text="Удалить по индексу"
          onClick={removeElByIndex}
          style={{ width: "352px" }}
          disabled={numberInput === "" || onIndex || +numberInput >= size}
          isLoader={removeIndex}
        />
      </div>
      <div className={styles.list}>
        {list.map((el, index) => {
          if (onIndex) {
            return (
              <div className={styles.items} key={index} id="list-circles">
                <Circle
                  letter={el}
                  index={index}
                  tail={index === list.length - 1 ? "tail" : ""}
                  head={
                    isAddByIndex && index === counter + 1 ? (
                      <Circle
                        isSmall={true}
                        letter={textInput}
                        state={ElementStates.Changing}
                      />
                    ) : index === 0 ? (
                      "head"
                    ) : (
                      ""
                    )
                  }
                  state={
                    index === counter && !isAddByIndex
                      ? ElementStates.Modified
                      : index < counter && !isAddByIndex
                      ? ElementStates.Changing
                      : index === counter
                      ? ElementStates.Changing
                      : index < counter
                      ? ElementStates.Changing
                      : ElementStates.Default
                  }
                />
                {list.length > 1 && index !== list.length - 1 && <ArrowIcon />}
              </div>
            );
          }
          if (removeIndex) {
            return (
              <div className={styles.items} key={index} id="list-circles">
                <Circle
                  letter={
                    index === +numberInput && counter === index ? undefined : el
                  }
                  index={index}
                  tail={
                    index === +numberInput && counter === index ? (
                      <Circle
                        isSmall={true}
                        letter={el}
                        state={ElementStates.Changing}
                      />
                    ) : index === list.length - 1 ? (
                      "tail"
                    ) : (
                      ""
                    )
                  }
                  head={index === 0 ? "head" : ""}
                  state={
                    index < counter + 1
                      ? ElementStates.Changing
                      : ElementStates.Default
                  }
                />
                {list.length > 1 && index !== list.length - 1 && <ArrowIcon />}
              </div>
            );
          }
          if (index === 0 && list.length > 1) {
            return (
              <div className={styles.items} key={index} id="list-circles">
                <Circle
                  letter={removeHead ? undefined : el}
                  index={index}
                  head={
                    changeHead ? (
                      <Circle
                        isSmall={true}
                        letter={removeHead ? el : textInput}
                        state={ElementStates.Changing}
                      />
                    ) : (
                      "head"
                    )
                  }
                  state={borderColorHead}
                />
                {list.length > 1 && <ArrowIcon />}
              </div>
            );
          }
          if (index === list.length - 1 && list.length > 1) {
            return (
              <div className={styles.items} key={index} id="list-circles">
                <Circle
                  letter={removeTail ? undefined : el}
                  index={index}
                  tail={
                    changeTail ? (
                      <Circle
                        isSmall={true}
                        letter={removeTail ? el : textInput}
                        state={ElementStates.Changing}
                      />
                    ) : (
                      "tail"
                    )
                  }
                  state={borderColorTail}
                />
              </div>
            );
          }
          if (list.length === 1) {
            return (
              <div className={styles.items} key={index} id="list-circles">
                <Circle
                  letter={removeTail ? undefined : el}
                  index={index}
                  head={
                    changeHead ? (
                      <Circle
                        isSmall={true}
                        letter={removeHead ? el : textInput}
                        state={ElementStates.Changing}
                      />
                    ) : (
                      "head"
                    )
                  }
                  tail={
                    changeTail ? (
                      <Circle
                        isSmall={true}
                        letter={removeTail ? el : textInput}
                        state={ElementStates.Changing}
                      />
                    ) : (
                      "tail"
                    )
                  }
                />
              </div>
            );
          } else
            return (
              <div className={styles.items} key={index} >
                <Circle letter={el} index={index} />
                <ArrowIcon />
              </div>
            );
        })}
      </div>
    </SolutionLayout>
  );
};
