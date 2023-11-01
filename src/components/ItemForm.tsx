import { useState } from "react";
import "./AddItemPopUp.css";

import { ToDoType } from "../App";

interface Props {
  defaultTodo?: ToDoType;
  onSubmit: (title: string, desc: string) => void;
  onClose: () => void;
}

function ItemForm({ defaultTodo, onClose, onSubmit }: Props) {
  const [inputTitle, setInputTitle] = useState(defaultTodo?.title || "");
  const [inputDesc, setInputDesc] = useState(defaultTodo?.desc || "");

  return (
    <>
      <div className="add-item-modal-bkg">
        <div className="add-item-modal-header">
          <h1 className="add-item-header">
            {defaultTodo ? "Editing Item" : "Add Item"}
            <button className="close-btn" onClick={onClose}>
              {" "}
              X{" "}
            </button>
          </h1>

          <div className="add-item-modal-desc">
            <input
              className="item-title"
              type="text"
              placeholder="Title"
              defaultValue={defaultTodo?.title}
              onChange={(event) => {
                event.target.value,
                  console.log(event.target.value),
                  setInputTitle(event.target.value);
              }}
            />
            <br />
            <br />
            <input
              className="item-desc"
              type="text"
              placeholder="Description"
              defaultValue={defaultTodo?.desc}
              onChange={(event) => {
                event.target.value,
                  console.log(event.target.value),
                  setInputDesc(event.target.value);
              }}
            />
            <br />
            <br />
            <button
              className="done-btn"
              onClick={() => onSubmit(inputTitle, inputDesc)}
            >
              Done
            </button>
            <div className="add-item-modal-footer"></div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ItemForm;
