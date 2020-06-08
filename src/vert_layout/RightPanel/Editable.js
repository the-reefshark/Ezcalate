import React, { useState, useEffect } from "react";

// Component accept text, placeholder values and also pass what type of Input - input, textarea so that we can use it for styling accordingly
const Editable = ({
    childRef,
    text,
    type,
    placeholder,
    children,
    update,
    id,
    currentTask,
    currentDetail,
    ...props
}) => {

// Manage the state whether to show the label or the input box. By default, label will be shown.
  const [isEditing, setEditing] = useState(false);
  
  useEffect(() => {
    if (childRef && childRef.current && isEditing === true) {
      childRef.current.focus();
    }
  }, [isEditing, childRef]);


// Event handler while pressing any key while editing
const handleKeyDown = (event, type) => {
    const { key } = event;
    const keys = ["Escape", "Tab"];
    const enterKey = "Enter";
    const allKeys = [...keys, enterKey]; // All keys array

  /* 
    - For textarea, check only Escape and Tab key and set the state to false
    - For everything else, all three keys will set the state to false
  */
    if (
      (type === "textarea" && keys.indexOf(key) > -1) ||
      (type !== "textarea" && allKeys.indexOf(key) > -1)
    ) {
      Handlefalse();
    }
}
    // Handle when key is pressed


    const Handlefalse = () => { // Added this extra function to simplify things
      setEditing(false)
      update(id, currentTask, currentDetail)
    }
    

/*
- It will display a label is `isEditing` is false
- It will display the children (input or textarea) if `isEditing` is true
- when input `onBlur`, we will set the default non edit mode
Note: For simplicity purpose, I removed all the classnames, you can check the repo for CSS styles
*/
  return (
    <section {...props}>
      {isEditing ? (
        <div
          onBlur={() => Handlefalse() }
          onKeyDown={e => handleKeyDown(e, type)}
        >
          {children}
        </div>
      ) : (
        <div
          onClick={() => setEditing(true)}
        >
          <span>
            {text || placeholder || ""}
          </span>
        </div>
      )}
    </section>
  );
};

export default Editable;