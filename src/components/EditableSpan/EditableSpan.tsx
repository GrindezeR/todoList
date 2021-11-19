import TextField from "@mui/material/TextField/TextField";
import React, {ChangeEvent, useState, KeyboardEvent} from "react";
import s from './EditableSpan.module.css';

type EditableSpanPropsType = {
    title: string
    callback: (title: string) => void
}

export const EditableSpan = React.memo((props: EditableSpanPropsType) => {
    const {title, callback} = props

    const [editMode, setEditMode] = useState(false);
    const [inputValue, setInputValue] = useState(title);

    const inputChangeHandler = (e: ChangeEvent<HTMLInputElement>) => setInputValue(e.currentTarget.value);
    const enableEditMode = () => {
        setEditMode(true);
    }
    const disableEditMode = () => {
        const value = inputValue.trim();
        //Check if title is same
        if (value !== '' && title !== value) {
            callback(value);
        } else {
            setInputValue(title); //If string = void, return latest value
        }
        setInputValue(value.trim()) //Clear spaces after edit
        setEditMode(false);
    }
    const onKeyPressEdit = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            disableEditMode();
        }
    }

    return (
        <>
            {editMode ?
                <TextField className={s.input}
                           size={"small"}
                           variant={"outlined"}
                           value={inputValue}
                           onBlur={disableEditMode}
                           onChange={inputChangeHandler}
                           onKeyPress={onKeyPressEdit}
                           onFocus={e => e.currentTarget.select()}
                           autoFocus

                />
                :
                <span className={s.task}
                      onDoubleClick={enableEditMode}>
                    {title}
                </span>}
        </>
    );
});