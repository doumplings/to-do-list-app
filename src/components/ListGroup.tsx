import { useEffect } from "react";
import { ToDoType } from "../App";
import "./ListGroup.css";

interface ListGroupProps {
  itemList: ToDoType[];
  heading: string;
  onSelectItem: (index: any, item: any) => void;
  onCloseButton: (index: any) => void;
  onCheckBox: (index: any) => void;
}

function ListGroup({
  itemList,
  heading,
  onSelectItem,
  onCloseButton,
  onCheckBox,
}: ListGroupProps) {
  // {
  //   itemList.length === 0
  //     ? console.log("there are no items")
  //     : localStorage.setItem("mylist", JSON.stringify(itemList));
  // }
  // const listArr = JSON.parse(localStorage.getItem("mylist"));

  // console.log("parsedlist", listArr);
  // console.log(localStorage);

  return (
    <>
      <h1>
        {heading}
        <hr />
      </h1>
      <ul className="list-group">
        {itemList?.length === 0 ? (
          <p>No item found</p>
        ) : (
          itemList.map((item: ToDoType, index: number) => (
            <li
              className="list-group-item"
              key={item.title}
              // item and not calling the function
            >
              <input
                className="form-check-input me-1"
                type="checkbox"
                value=""
                checked={item.isDone}
                readOnly
                id="firstCheckbox"
                onClick={() => onCheckBox(index)}
              ></input>
              <div
                className="item-name"
                onClick={() => {
                  onSelectItem(item, index);
                }}
                style={{
                  textDecoration: item.isDone ? "line-through" : undefined,
                  color: item.isDone ? "#777" : undefined,
                }}
              >
                {item.title}
              </div>
              <button
                type="button"
                className="btn-close"
                aria-label="Close"
                onClick={() => {
                  onCloseButton(index);
                }}
              ></button>
            </li>
          ))
        )}
      </ul>
    </>
  );
}

export default ListGroup;
