import { render, screen } from "@testing-library/react";
import Contact from "@/pages/contact";
import "@testing-library/jest-dom";

it("renders About page correctly", () => {
	render(<Contact />);
	expect(screen.getByText("Contact")).toBeInTheDocument();
});