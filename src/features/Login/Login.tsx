import React from 'react'
import Grid from '@mui/material/Grid';
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import s from './Login.module.css';
import {useFormik} from "formik";
import {useDispatch} from "react-redux";
import {loginTC} from "./auth-reducer";
import {useAppSelector} from "../../state/store";
import {Navigate} from 'react-router-dom';

type FormikErrorType = {
    email?: string
    password?: string
    rememberMe?: boolean
}

export const Login = () => {
    const isLoggedIn = useAppSelector<boolean>(state => state.auth.isLoggedIn);
    const dispatch = useDispatch();


    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            rememberMe: false,
        },
        onSubmit: values => {
            dispatch(loginTC(values));
            formik.resetForm();
        },
        validate: values => {
            const errors: FormikErrorType = {};

            if (!values.email) errors.email = 'Email is required';
            else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = 'Invalid email address';
            }

            if (!values.password) errors.password = 'Password required';
            else if (values.password.length < 3) errors.password = 'Min length 3 characters';

            return errors;
        }
    })

    if (isLoggedIn) {
        return <Navigate to={'/'}/>
    }

    return (
        <Grid className={s.loginWrapper} container justifyContent={'center'}>
            <Grid item justifyContent={'center'}>
                <h1>Log In</h1>
                <FormControl>
                    <form onSubmit={formik.handleSubmit}>
                        <FormGroup>
                            <TextField className={s.inputs}
                                       label='Email'
                                       margin='normal'
                                       {...formik.getFieldProps('email')}
                            />
                            {formik.touched.email && formik.errors.email &&
                                <div className={s.error}>{formik.errors.email}</div>}

                            <TextField className={s.inputs}
                                       type='password'
                                       label='Password'
                                       margin="normal"
                                       {...formik.getFieldProps('password')}
                            />
                            {formik.touched.password && formik.errors.password &&
                                <div className={s.error}>{formik.errors.password}</div>}

                            <FormControlLabel label={'Remember me'} control={
                                <Checkbox
                                    color={'success'}
                                    {...formik.getFieldProps('rememberMe')}
                                />
                            }/>

                            <Button type={'submit'} variant={'contained'} color={'primary'}>
                                Login
                            </Button>
                        </FormGroup>
                        <div className={s.freeAccInfo}>
                            <span>Free account data:</span>
                            <span>Email: free@samuraijs.com</span>
                            <span>Password: free</span>
                        </div>
                    </form>
                </FormControl>
            </Grid>
        </Grid>
    );
}
