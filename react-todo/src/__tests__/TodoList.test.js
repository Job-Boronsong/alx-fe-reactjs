import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import TodoList from "../components/TodoList";

describe("TodoList Component", () => {
  test("renders initial todos", () => {
    render(<TodoList />);
    expect(screen.getByText("Learn React")).toBeInTheDocument();
    expect(screen.getByText("Build Todo App")).toBeInTheDocument();
  });

  test("adds a new todo", () => {
    render(<TodoList />);
    fireEvent.change(screen.getByTestId("todo-input"), {
      target: { value: "New Task" },
    });
    fireEvent.submit(screen.getByTestId("add-form"));
    expect(screen.getByText("New Task")).toBeInTheDocument();
  });

  test("toggles a todo's completion", () => {
    render(<TodoList />);
    const todo = screen.getByText("Learn React");
    expect(todo).toHaveStyle("text-decoration: none");
    fireEvent.click(todo);
    expect(todo).toHaveStyle("text-decoration: line-through");
  });

  test("deletes a todo", () => {
    render(<TodoList />);
    const todo = screen.getByText("Learn React");
    const deleteBtn = screen.getByTestId(/delete-/);
    fireEvent.click(deleteBtn);
    expect(todo).not.toBeInTheDocument();
  });
});
