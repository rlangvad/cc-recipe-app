import { render, screen, fireEvent } from "@testing-library/react";
import { ViewToggle, ViewMode } from "./view-toggle";

describe("ViewToggle", () => {
  const mockOnViewChange = jest.fn();

  beforeEach(() => {
    mockOnViewChange.mockClear();
  });

  it("renders both grid and list buttons", () => {
    render(<ViewToggle currentView="grid" onViewChange={mockOnViewChange} />);
    
    expect(screen.getByLabelText("Switch to grid view")).toBeInTheDocument();
    expect(screen.getByLabelText("Switch to list view")).toBeInTheDocument();
  });

  it("shows grid button as active when currentView is grid", () => {
    render(<ViewToggle currentView="grid" onViewChange={mockOnViewChange} />);
    
    const gridButton = screen.getByLabelText("Switch to grid view");
    expect(gridButton).toHaveAttribute("aria-pressed", "true");
    expect(gridButton).toHaveClass("bg-primary");
  });

  it("shows list button as active when currentView is list", () => {
    render(<ViewToggle currentView="list" onViewChange={mockOnViewChange} />);
    
    const listButton = screen.getByLabelText("Switch to list view");
    expect(listButton).toHaveAttribute("aria-pressed", "true");
    expect(listButton).toHaveClass("bg-primary");
  });

  it("calls onViewChange with 'list' when list button is clicked", () => {
    render(<ViewToggle currentView="grid" onViewChange={mockOnViewChange} />);
    
    const listButton = screen.getByLabelText("Switch to list view");
    fireEvent.click(listButton);
    
    expect(mockOnViewChange).toHaveBeenCalledWith("list");
  });

  it("calls onViewChange with 'grid' when grid button is clicked", () => {
    render(<ViewToggle currentView="list" onViewChange={mockOnViewChange} />);
    
    const gridButton = screen.getByLabelText("Switch to grid view");
    fireEvent.click(gridButton);
    
    expect(mockOnViewChange).toHaveBeenCalledWith("grid");
  });

  it("applies custom className", () => {
    const { container } = render(
      <ViewToggle 
        currentView="grid" 
        onViewChange={mockOnViewChange} 
        className="custom-class"
      />
    );
    
    expect(container.firstChild).toHaveClass("custom-class");
  });

  it("has proper accessibility attributes", () => {
    render(<ViewToggle currentView="grid" onViewChange={mockOnViewChange} />);
    
    const gridButton = screen.getByLabelText("Switch to grid view");
    const listButton = screen.getByLabelText("Switch to list view");
    
    expect(gridButton).toHaveAttribute("aria-pressed", "true");
    expect(listButton).toHaveAttribute("aria-pressed", "false");
  });

  it("includes screen reader text for icons", () => {
    render(<ViewToggle currentView="grid" onViewChange={mockOnViewChange} />);
    
    expect(screen.getByText("Grid view")).toBeInTheDocument();
    expect(screen.getByText("List view")).toBeInTheDocument();
  });
});