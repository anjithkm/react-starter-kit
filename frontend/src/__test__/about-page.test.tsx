import { render, screen } from "@testing-library/react";
import About from "../pages/about";
import "@testing-library/jest-dom";

it("renders About page correctly", () => {
	render(<About />);
	expect(screen.getByText("About")).toBeInTheDocument();
});
