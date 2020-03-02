import React, { useState } from "react";
import { axiosWithAuth } from "../utils/axiosWithAuth";
const initialColor = {
  color: "",
  code: { hex: "" },
};

const ColorList = ({ colors, updateColors }) => {
  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);
  const [newColor, setNewColor] = useState(initialColor);

  console.log(newColor);

  const editColor = color => {
    setEditing(true);
    setColorToEdit(color);
  };

  const saveEdit = e => {
    e.preventDefault();
    const endP = `/api/colors/${colorToEdit.id}`;
    axiosWithAuth()
      .put(endP, colorToEdit)
      .then(res => {
        console.log("Edit Response", res);
        updateColors([
          ...colors.filter(color => color.id !== colorToEdit.id),
          colorToEdit,
        ]);
      })
      .catch(err => console.log("Edit Error", err));
  };

  const deleteColor = color => {
    const endP = `/api/colors/${color.id}`;
    axiosWithAuth()
      .delete(endP)
      .then(res => {
        console.log("Delete Response", res);
        updateColors([...colors.filter(col => col.id !== color.id)]);
      })
      .catch(err => console.log("Delete Error", err));
  };

  const addNewColor = e => {
    e.preventDefault();
    const endP = "/api/colors";
    axiosWithAuth()
      .post(endP, newColor)
      .then(res => {
        console.log("Add Response", res);
        updateColors([...colors, newColor]);
        setNewColor(initialColor);
      })
      .catch(err => console.log(err));
  };

  return (
    <div className='colors-wrap'>
      <p>colors</p>
      <ul>
        {colors.map(color => (
          <li key={color.color} onClick={() => editColor(color)}>
            <span>
              <span
                className='delete'
                onClick={e => {
                  e.stopPropagation();
                  deleteColor(color);
                }}>
                x
              </span>{" "}
              {color.color}
            </span>
            <div
              className='color-box'
              style={{ backgroundColor: color.code.hex }}
            />
          </li>
        ))}
      </ul>
      {editing && (
        <form onSubmit={saveEdit}>
          <legend>edit color</legend>
          <label>
            color name:
            <input
              onChange={e =>
                setColorToEdit({ ...colorToEdit, color: e.target.value })
              }
              value={colorToEdit.color}
            />
          </label>
          <label>
            hex code:
            <input
              onChange={e =>
                setColorToEdit({
                  ...colorToEdit,
                  code: { hex: e.target.value },
                })
              }
              value={colorToEdit.code.hex}
            />
          </label>
          <div className='button-row'>
            <button type='submit'>save</button>
            <button onClick={() => setEditing(false)}>cancel</button>
          </div>
        </form>
      )}
      <div className='spacer' />
      <form>
        <legend>add color</legend>
        <label>
          color name:
          <input
            name='color'
            type='text'
            onChange={e => setNewColor({ ...newColor, color: e.target.value })}
            value={newColor.color}
          />
        </label>
        <label>
          hex code:
          <input
            name='hex'
            type='text'
            onChange={e =>
              setNewColor({
                ...newColor,
                code: { hex: e.target.value },
              })
            }
            value={newColor.code.hex}
          />
        </label>
        <div className='button-row'>
          <button onClick={addNewColor}>save</button>
        </div>
      </form>
    </div>
  );
};
export default ColorList;
