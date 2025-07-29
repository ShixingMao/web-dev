import { Button, ListGroup } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { deleteTodo, setTodo } from "./todosReducer";
export default function TodoItem({ todo }: {
    todo: { id: string; title: string };
}) {
    const dispatch = useDispatch();

    return (
        <ListGroup.Item key={todo.id} className="d-flex justify-content-between align-items-center">

            {todo.title}
            <div className="d-flex gap-2">
                <Button onClick={() => dispatch(setTodo(todo))} id="wd-set-todo-click">
                    Edit
                </Button>
                <Button variant="danger" onClick={() => dispatch(deleteTodo(todo.id))} id="wd-delete-todo-click">
                    Delete
                </Button>
            </div>

        </ListGroup.Item>);
}

