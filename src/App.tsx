import ListGroup from "./components/ListGroup";
import { useEffect, useState } from "react";
import "./components/AddItemPopUp.css";
import ItemForm from "./components/ItemForm";
import Alert from "./components/Alert";

// localStorage.clear();
export type ToDoType = {
  title: string;
  desc: string;
  isDone: boolean;
};

function App() {
  const [toDoList, setToDoList] = useState<ToDoType[]>([]);
  const [selectedIndex, setSelectedIndex] = useState<any>(null);
  const [alertActive, setAlertActive] = useState(false);
  const [addItemVisible, setAddItemVisibility] = useState(false);

  // localStorage.clear();

  const getLocalToDo = () => {
    console.log("s", localStorage.getItem("mylist"));
    const local = localStorage.getItem("mylist");

    return local ? JSON.parse(local) : [];
  };

  const setLocalToDo = (todo: any) => {
    localStorage.setItem("mylist", JSON.stringify(todo));
  };
  // console.log("todo", toDoList);

  const handleAddItemFormOpen = () => {
    console.log("Add Item Button Clicked");
    setAddItemVisibility(true);
  };

  const handleItemFormClose = () => {
    console.log("Form Close CLicked");
    setAddItemVisibility(false);
    setSelectedIndex(null);
  };

  const handleCheckBox = (index: any) => {
    const isDoneArr = [...toDoList];

    isDoneArr[index].isDone = !isDoneArr[index].isDone;

    setLocalToDo(isDoneArr);
    setToDoList(isDoneArr);
    console.log("Checked:", index);
  };

  const handleItemDelete = (index: number) => {
    console.log("delete button clicked", index);
    console.log("length of todolist", toDoList.length);
    setToDoList((prev) => {
      const newArray = [...prev];
      newArray.splice(index, 1);
      setLocalToDo(newArray);
      return newArray;
    });
  };

  const handleSelectedItem = (item: object, index: number) => {
    console.log("Selected Index: ", index);
    console.log("Selected Items:", item);
    setSelectedIndex(index);
  };

  const handleSubmit = (
    title: string,
    desc: string,
    isDone: boolean = false
  ) => {
    console.log("Done Button Clicked");
    if (title === "") {
      setAddItemVisibility(false);
      setSelectedIndex(null);
      setAlertActive(true);
      console.log("Item Empty");

      return;
    }

    if (addItemVisible === true) {
      setToDoList((prev) => {
        const newArray = [...prev];
        newArray.push({ title: title, desc: desc, isDone: false });
        setLocalToDo(newArray);
        return newArray;
      });
    } else {
      setToDoList((prev) => {
        const clonedArray = [...prev];

        clonedArray[selectedIndex].title = title;
        clonedArray[selectedIndex].desc = desc;
        setLocalToDo(clonedArray);
        return clonedArray;
      });
    }
    setAddItemVisibility(false);
    setSelectedIndex(null);
  };

  useEffect(() => {
    //logic
    const value = getLocalToDo();
    console.log("value", value);

    setToDoList(value);
  }, []);

  return (
    <>
      <>
        <button
          type="button"
          className="add-item-btn"
          style={{
            position: "absolute",
            right: 0,
            width: "50px",
            height: "30px",
            fontSize: "8px",
          }}
          onClick={handleAddItemFormOpen}
        >
          Add Item
        </button>

        {(addItemVisible || selectedIndex !== null) && (
          <ItemForm
            defaultTodo={toDoList?.[selectedIndex]}
            onSubmit={handleSubmit}
            onClose={handleItemFormClose}
          ></ItemForm>
        )}

        <Alert isVisible={alertActive} onClose={() => setAlertActive(false)}>
          Make Sure To Add A Title!
        </Alert>
      </>

      <ListGroup
        itemList={toDoList}
        heading="To Do List"
        onSelectItem={handleSelectedItem}
        onCloseButton={handleItemDelete}
        onCheckBox={handleCheckBox}
      ></ListGroup>
    </>
  );
}

export default App;
