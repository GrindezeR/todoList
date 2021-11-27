import * as React from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, {AlertProps} from '@mui/material/Alert';
import {useDispatch} from "react-redux";
import {useAppSelector} from "../../app/store";
import {setAppErrorAC} from "../../app/app-reducer";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
    function Alert(props, ref) {
        return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
    });

export const ErrorSnackBar = () => {
    const dispatch = useDispatch();
    const error = useAppSelector<string | null>(state => state.app.error);

    const onCloseHandler = (event?: React.SyntheticEvent, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        dispatch(setAppErrorAC(null));
    };

    return (
        <Snackbar open={!!error}
                  autoHideDuration={2000}
                  onClose={onCloseHandler}>

            <Alert onClose={onCloseHandler} severity="error" sx={{width: '100%'}}>
                {error}
            </Alert>
        </Snackbar>
    );
}