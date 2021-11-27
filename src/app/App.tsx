import React from 'react';
import AppBar from '@mui/material/AppBar';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import s from './App.module.css';
import {TodolistsList} from "../features/TodolistsList/TodolistsList";
import {LinearProgress} from "@mui/material";
import {RequestStatusType} from "./app-reducer";
import {useAppSelector} from "./store";
import {ErrorSnackBar} from "../components/ErrorSnackBar/ErrorSnackBar";

type PropsType = {
    demo?: boolean
}

function App({demo = false}: PropsType) {
    const status = useAppSelector<RequestStatusType>(state => state.app.status);

    return (
        <div className={s.mainApp}>
            <ErrorSnackBar/>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{mr: 2}}>
                        <MenuIcon/>
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                        Todolist
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
                {status === 'loading' && <LinearProgress color={'success'}/>}
            </AppBar>
            <Container className={s.todolistsContainer} fixed>
                <TodolistsList demo={demo}/>
            </Container>
        </div>
    );
}

export default App;


