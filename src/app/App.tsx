import React, {useEffect} from 'react';
import AppBar from '@mui/material/AppBar';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import s from './App.module.css';
import {TodolistsList} from "../features/TodolistsList/TodolistsList";
import CircularProgress from "@mui/material/CircularProgress";
import LinearProgress from "@mui/material/LinearProgress";
import {initializeAppTC, RequestStatusType} from "./app-reducer";
import {useAppSelector} from "./store";
import {ErrorSnackBar} from "../components/ErrorSnackBar/ErrorSnackBar";
import {Route, Routes, Navigate} from 'react-router-dom';
import {Login} from "../features/Login/Login";
import {useDispatch} from "react-redux";
import {logoutTC} from "../features/Login/auth-reducer";

type PropsType = {
    demo?: boolean
}

function App({demo = false}: PropsType) {
    const status = useAppSelector<RequestStatusType>(state => state.app.status);
    const isInitialized = useAppSelector<boolean>(state => state.app.isInitialized);
    const isLoggedIn = useAppSelector<boolean>(state => state.auth.isLoggedIn);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(initializeAppTC());
    }, [dispatch])


    const onLogoutClickHandler = () => {
        dispatch(logoutTC());
    }

    if (!isInitialized) {
        return (
            <div
                style={{position: 'fixed', top: '30%', textAlign: 'center', width: '100%'}}>
                <CircularProgress/>
            </div>
        );
    }


    return (
        <div className={s.mainApp}>

            <ErrorSnackBar/>

            <AppBar position='relative'>
                <Toolbar>
                    <IconButton
                        size='large'
                        edge='start'
                        color='inherit'
                        aria-label='menu'
                        sx={{mr: 2}}>
                        <MenuIcon/>
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                        TodoList Application
                    </Typography>
                    {isLoggedIn ?
                        <Button onClick={onLogoutClickHandler} color='inherit'>Logout</Button>
                        :
                        <Button color='inherit'>Login</Button>
                    }
                </Toolbar>
                {status === 'loading' && <LinearProgress className={s.loadingBar} color={'success'}/>}
            </AppBar>
            <Container className={s.todolistsContainer} fixed>
                <Routes>
                    <Route path={'/todolist'} element={<TodolistsList demo={demo}/>}/>
                    <Route path={'login'} element={<Login/>}/>
                    <Route path={'*'} element={
                        <div style={{margin: '10% auto'}}>
                            <h1 style={{textAlign: 'center', marginTop: '10%', color: 'red'}}>
                                404: Page NOT FOUND
                            </h1>
                        </div>
                    }/>
                </Routes>
            </Container>
        </div>
    );
}

export default App;


