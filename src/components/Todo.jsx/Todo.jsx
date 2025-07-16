import React, { useState, useEffect } from "react";

const Todo = () => {
  const [itemsArray, setItemsArray] = useState(
    JSON.parse(localStorage.getItem("items")) || []
  );
  const [completedArray, setCompletedArray] = useState(
    JSON.parse(localStorage.getItem("completed")) || []
  );
  const [input, setInput] = useState("");
  const [date, setDate] = useState("");

  useEffect(() => {
    const today = new Date();
    const parts = today.toString().split(" ");
    setDate(`${parts[2]} ${parts[1]} ${parts[3]}`);
  }, []);

  useEffect(() => {
    localStorage.setItem("items", JSON.stringify(itemsArray));
    localStorage.setItem("completed", JSON.stringify(completedArray));
  }, [itemsArray, completedArray]);

  const handleAdd = () => {
    if (input.trim() === "") return;
    setItemsArray([...itemsArray, input]);
    setInput("");
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") handleAdd();
  };

  const handleDelete = (index) => {
    const item = itemsArray[index];
    const updatedCompleted = [...completedArray, item].slice(-10);
    setCompletedArray(updatedCompleted);
    const newItems = [...itemsArray];
    newItems.splice(index, 1);
    setItemsArray(newItems);
  };

  const handleDeleteCompleted = (index) => {
    const updated = [...completedArray];
    updated.splice(completedArray.length - 1 - index, 1);
    setCompletedArray(updated);
  };

  const handleUpdate = (value, index) => {
    const updated = [...itemsArray];
    updated[index] = value;
    setItemsArray(updated);
  };

  return (
    <div className="app">
      <div className="banner">
        <span className="to">To</span>
        <span className="do">Do</span>
      </div>
      <div className="input-header">
        <h3 id="date">{date}</h3>
        <div className="to-do-input">
          <input
            id="item"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Add a task"
          />
          <button id="enter" onClick={handleAdd}>
            Add
          </button>
        </div>
      </div>
      <div className="to-do-list">
        {itemsArray.length === 0 && completedArray.length === 0 ? (
          <div className="emptybox">
            <h3>The list is empty</h3>
          </div>
        ) : (
          itemsArray.map((item, i) => (
            <Item
              key={i}
              index={i}
              item={item}
              onDelete={handleDelete}
              onUpdate={handleUpdate}
            />
          ))
        )}

        <div className="completedtitle">
          <div className="completedHeading">Completed</div>
        </div>

        {completedArray.length === 0 ? (
          <div className="emptybox">
            <h3>The list is empty</h3>
          </div>
        ) : (
          [...completedArray].reverse().map((item, i) => (
            <div className="completedbox" key={i}>
              <div className="completedtask">
                <h3>{item}</h3>
              </div>
              <div className="delete-button">
                <i
                  className="fa-solid fa-trash-can delBtn"
                  onClick={() => handleDeleteCompleted(i)}
                ></i>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

const Item = ({ item, index, onDelete, onUpdate }) => {
  const [editMode, setEditMode] = useState(false);
  const [text, setText] = useState(item);

  const handleSave = () => {
    onUpdate(text, index);
    setEditMode(false);
  };

  const handleCancel = () => {
    setText(item);
    setEditMode(false);
  };

  return (
    <div className="item">
      <div className="input-controller">
        <textarea
          disabled={!editMode}
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <div className="edit-controller">
          <i className="fa-solid fa-check deleteBtn" onClick={() => onDelete(index)}></i>
          <i className="fa-solid fa-pen-to-square editBtn" onClick={() => setEditMode(true)}></i>
        </div>
      </div>
      {editMode && (
        <div className="update-controller">
          <button className="saveBtn" onClick={handleSave}>Save</button>
          <button className="cancelBtn" onClick={handleCancel}>Cancel</button>
        </div>
      )}
    </div>
  );
};

export default Todo;
