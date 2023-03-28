import { render, screen, fireEvent } from "@testing-library/react";
import renderer from "react-test-renderer";
import { Button } from "./button";

describe("test <Button /> component", () => {
  it("Button render without text", () => {
    const tree = renderer.create(<Button />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("Button render with text", () => {
    const tree = renderer.create(<Button text="Добавить" />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("when Button disabled", () => {
    const tree = renderer.create(<Button disabled />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("Button with loading", () => {
    const tree = renderer.create(<Button isLoader />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("Button with callback", () => {
    window.alert = jest.fn();
    render(<Button text="Добавить" onClick={alert("Добавлено")} />);
    const button = screen.getByText("Добавить");
    fireEvent.click(button);
    expect(window.alert).toHaveBeenCalledWith("Добавлено");
  });
});
