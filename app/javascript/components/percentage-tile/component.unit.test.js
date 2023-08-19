import { render } from "@testing-library/react";

import "@testing-library/jest-dom/extend-expect";
import PercentageTile from "./component";

describe("<PercentageTile />", () => {
  const defaultProps = {
    color: "#ff0000",
    count: 100,
    label: "Test Label",
    percentage: 50
  };

  it("renders the component with provided props", () => {
    const { getByText, container } = render(<PercentageTile {...defaultProps} />);

    // Check if percentage and count are rendered
    expect(getByText("50%")).toBeInTheDocument();
    expect(getByText("(100)")).toBeInTheDocument();

    // Check if label is rendered
    expect(getByText("Test Label")).toBeInTheDocument();

    // Check if background color is applied
    const divElement = container.firstChild;

    expect(divElement).toHaveStyle(`background-color: ${defaultProps.color}`);
  });

  it("has correct displayName", () => {
    expect(PercentageTile.displayName).toBe("PercentageTile");
  });
});
