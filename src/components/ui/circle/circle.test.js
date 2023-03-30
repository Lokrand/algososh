import renderer from "react-test-renderer";
import { ElementStates } from "../../../types/element-states";
import { Circle } from "./circle";

describe("Test <Circle /> component", () => {
  it("Circle render without text", () => {
    const tree = renderer.create(<Circle />).toJSON();
    expect(tree).toMatchSnapshot();
  });
  it("Circle render with text", () => {
    const tree = renderer.create(<Circle letter="cat" />).toJSON();
    expect(tree).toMatchSnapshot();
  });
  it("Circle render with head's text", () => {
    const tree = renderer.create(<Circle head="hat" />).toJSON();
    expect(tree).toMatchSnapshot();
  });
  it("Circle render with React element in head", () => {
    const tree = renderer.create(<Circle head={<Circle />} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
  it("Circle render with tail's text", () => {
    const tree = renderer.create(<Circle tail="back" />).toJSON();
    expect(tree).toMatchSnapshot();
  });
  it("Circle render with React element in tail", () => {
    const tree = renderer.create(<Circle tail={<Circle />} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
  it("Circle render with index", () => {
    const tree = renderer.create(<Circle index={2} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
  it("Circle render with <<isSmall === true>>", () => {
    const tree = renderer.create(<Circle isSmall={true} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
  it("Circle render with default state", () => {
    const tree = renderer
      .create(<Circle state={ElementStates.Default} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
  it("Circle render with changing state", () => {
    const tree = renderer
      .create(<Circle state={ElementStates.Changing} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
  it("Circle render with modified state", () => {
    const tree = renderer
      .create(<Circle state={ElementStates.Modified} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
