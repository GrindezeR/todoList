import React from "react";

type buttonPropsType = {
    title: string
    className?: string
    callback: () => void
}

export function Button(props: buttonPropsType) {
    return (
            <button className={props.className} onClick={props.callback}>{props.title}</button>
    );
}