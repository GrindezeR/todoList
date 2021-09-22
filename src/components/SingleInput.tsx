import React, {ChangeEvent, KeyboardEvent} from "react";
import s from './TodoList.module.css';

type inputPropsType = {
    inputValue: string
    error: string | null
    setInputValue: (title: string) => void
    setError: (error: string | null) => void
    callback: () => void
}

export const SingleInput = ({callback, inputValue, setInputValue, error, setError, ...props}: inputPropsType) => {

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.currentTarget.value)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null);
        if (e.key === 'Enter') {
            callback();
        }
    }
    return (
        <div>
            <input value={inputValue}
                   onChange={onChangeHandler}
                   onKeyPress={onKeyPressHandler}
                   className={error ? s.errorInput : ""}/>
            {error && <div className={s.error}>{error}</div>}
        </div>
    );
}