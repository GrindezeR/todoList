import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import s from "./AddItemForm.module.css";
import {Button, IconButton, TextField} from "@mui/material";
import {AddBox, AddCircle} from "@mui/icons-material";

type addItemPropsType = {
    titleList?: string
    callback: (title: string) => void
}

export function AddItemForm({callback, titleList}: addItemPropsType) {
    let [title, setTitle] = useState("")
    let [error, setError] = useState<string | null>('')

    //Functions
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null);
        if (e.key === 'Enter') {
            addTask();
        }
    }
    const addTask = () => {
        if (title.trim() !== "") {
            callback(title.trim());
            setTitle("");
        } else {
            setError('Title is required!');
        }
    }

    // Styles
    const styleBtn = {
        minWidth: '40px',
        height: '48px',
    }

    return (
        <div>
            <h3>{titleList}</h3>
            <TextField
                error={!!error}
                id={'standard-basic'}
                label={'Insert name'}
                variant={"standard"}
                value={title}
                onChange={onChangeHandler}
                onKeyPress={onKeyPressHandler}
                helperText={error}
            />
            {/*<Button style={styleBtn} variant={"contained"} size={"small"} onClick={addTask}>+</Button>*/}
            <IconButton onClick={addTask} color={'primary'}>
                <AddCircle/>
            </IconButton>
        </div>
    );
}