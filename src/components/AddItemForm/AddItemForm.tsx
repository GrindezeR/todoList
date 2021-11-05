import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import s from './AddItemForm.module.css';
import {IconButton, TextField} from "@mui/material";
import {AddCircle} from "@mui/icons-material";

type AddItemFormPropsType = {
    title?: string
    callback: (title: string) => void
}

export const AddItemForm = React.memo((props: AddItemFormPropsType) => {
    const {title, callback} = props
    const [inputValue, setInputValue] = useState('');
    const [error, setError] = useState(false);

    const inputChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        if (error) {
            setError(false);
        }
        setInputValue(e.currentTarget.value);
    }

    const addButton = () => {
        const value = inputValue.trim();
        if (value !== '') {
            callback(value);
            setInputValue('');
        } else {
            setError(true);
        }
    }

    const onKeyPressAdd = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            addButton();
        }
    }

    return (
        <div className={s.wrapper}>
            <h3>{title}</h3>
            <div className={s.addItemWrapper}>
                <TextField className={s.input}
                           error={error}
                           id={'standard-basic'}
                           label={'Insert name'}
                           variant={"standard"}
                           value={inputValue}
                           onChange={inputChangeHandler}
                           onKeyPress={onKeyPressAdd}
                />
                <IconButton onClick={addButton} color={'primary'} size={"small"}>
                    <AddCircle/>
                </IconButton>
            </div>
            {error && <div className={s.error}>Title is required!</div>}
        </div>
    );
});

export default AddItemForm;