import React, {ChangeEvent, useState, KeyboardEvent} from "react";

type editableSpan = {
    title: string
    callback: (newTitle:string) => void
}

export function EditableSpan({title,callback}: editableSpan) {
    const [editMode, setEditMode] = useState<boolean>(false)
    const [inputValue, setInputValue] = useState<string>('')

    const activateEditMode = () => {
        setEditMode(true);
        setInputValue(title);
    }
    const activateViewMode = () => {
        setEditMode(false);
        callback(inputValue);
    }
    const onEnterAdd = (e:KeyboardEvent<HTMLInputElement>) => {
      if(e.key === 'Enter') {
          activateViewMode();
      }
    }
    const onChangeInputValue = (e: ChangeEvent<HTMLInputElement>) => setInputValue(e.currentTarget.value);

    return (
        editMode
            ?
            <input value={inputValue} onBlur={activateViewMode} onChange={onChangeInputValue} onKeyPress={onEnterAdd} autoFocus/>
            :
            <span onDoubleClick={activateEditMode}> {title} </span>
    );
}