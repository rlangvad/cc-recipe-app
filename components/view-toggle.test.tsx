import { render, screen, fireEvent } from "@testing-library/react";
import { ViewToggle, ViewMode } from "./view-toggle";

describe("ViewToggle", () => {
  const mockOnViewModeChange = jest.fn();

  beforeEach(() => {
    mockOnViewModeChange.mockClear();
  });

  it("renders both grid and list buttons", () => {
    render(
      <ViewToggle viewMode="grid" onViewModeChange={mockOnViewModeChange} />
    );

    expect(screen.getByLabelText("Switch to grid view")).toBeInTheDocument();
    expect(screen.getByLabelText("Switch to list view")).toBeInTheDocument();
  });

  it("shows grid button as active when viewMode is grid", () => {
    render(
      <ViewToggle viewMode="grid" onViewModeChange={mockOnViewModeChange} />
    );

    const gridButton = screen.getByLabelText("Switch to grid view");
    expect(gridButton).toHaveAttribute("aria-pressed", "true");
    expect(gridButton).toHaveClass("bg-primary");
  });

  it("shows list button as active when viewMode is list", () => {
    render(
      <ViewToggle viewMode="list" onViewModeChange={mockOnViewModeChange} />
    );

    const listButton = screen.getByLabelText("Switch to list view");
    expect(listButton).toHaveAttribute("aria-pressed", "true");
    expect(listButton).toHaveClass("bg-primary");
  });

  it("calls onViewModeChange with 'grid' when grid button is clicked", () => {
    render(
      <ViewToggle viewMode="list" onViewModeChange={mockOnViewModeChange} />
    );

    const gridButton = screen.getByLabelText("Switch to grid view");
    fireEvent.click(gridButton);

    expect(mockOnViewModeChange).toHaveBeenCalledWith("grid");
  });

  it("calls onViewModeChange with 'list' when list button is clicked", () => {
    render(
      <ViewToggle viewMode="grid" onViewModeChange={mockOnViewModeChange} />
    );

    const listButton = screen.getByLabelText("Switch to list view");
    fireEvent.click(listButton);

    expect(mockOnViewModeChange).toHaveBeenCalledWith("list");
  });

  it("applies custom className", () => {
    const { container } = render(
      <ViewToggle
        viewMode="grid"
        onViewModeChange={mockOnViewModeChange}
        className="custom-class"
      />
    );

    expect(container.firstChild).toHaveClass("custom-class");
  });

  it("has proper accessibility attributes", () => {
    render(
      <ViewToggle viewMode="grid" onViewModeChange={mockOnViewModeChange} />
    );

    const gridButton = screen.getByLabelText("Switch to grid view");
    const listButton = screen.getByLabelText("Switch to list view");

    expect(gridButton).toHaveAttribute("aria-label", "Switch to grid view");
    expect(gridButton).toHaveAttribute("aria-pressed", "true");
    expect(listButton).toHaveAttribute("aria-label", "Switch to list view");
    expect(listButton).toHaveAttribute("aria-pressed", "false");
  });

  it("includes screen reader text for buttons", () => {
    render(
      <ViewToggle viewMode="grid" onViewModeChange={mockOnViewModeChange} />
    );

    expect(screen.getByText("Grid view")).toBeInTheDocument();
    expect(screen.getByText("List view")).toBeInTheDocument();
  });
});
