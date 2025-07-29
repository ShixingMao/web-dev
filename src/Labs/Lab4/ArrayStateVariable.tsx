import { useState } from "react";
import { Button, ListGroup } from "react-bootstrap";

export default function ArrayStateVariable() {
  const [array, setArray] = useState([1, 2, 3, 4, 5]);

  const addElement = () => {
    setArray([...array, Math.floor(Math.random() * 100)]);
  };

  const deleteElement = (index: number) => {
    setArray(array.filter((_, i) => i !== index));
  };

  return (
    <div id="wd-array-state-variables" className="p-3">
      <h2 className="mb-3">Array State Variable</h2>

      <Button variant="success" className="mb-3" onClick={addElement}>
        Add Element
      </Button>

      <ListGroup>
        {array.map((item, index) => (
          <ListGroup.Item key={index} className="d-flex justify-content-between align-items-center">
            <span className="fw-bold">{item}</span>
            <Button
              variant="danger"
              size="sm"
              onClick={() => deleteElement(index)}
            >
              Delete
            </Button>
          </ListGroup.Item>
        ))}
      </ListGroup>

      <hr />
    </div>
  );
}
