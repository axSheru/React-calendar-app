import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { startChecking } from '../actions/auth';
import { LoginScreen } from '../components/auth/LoginScreen';
import { CalendarScreen } from '../components/calendar/CalendarScreen';
import { PrivateRoute } from './PrivateRoute';
import { PublicRoute } from './PublicRoute';

export const AppRouter = () => {

    const dispatch = useDispatch();
    const { checking, uid } = useSelector( state => state.auth );

    useEffect(() => {
        dispatch( startChecking() );
    }, [ dispatch ]);

    if ( checking ) {
        return (<h5>Loading...</h5>);
    }
    

    return (
        <BrowserRouter>
            <Routes>
                <Route path='/login' element={
                    <PublicRoute
                        isLoggedIn={ !! uid }
                    >
                        <LoginScreen />
                    </PublicRoute>
                } />
                <Route path='/*' element={
                    <PrivateRoute
                        isLoggedIn={ !! uid }
                    >
                        <CalendarScreen />
                    </PrivateRoute>
                } />
                <Route path='*' element={ <Navigate to='/' replace /> } />
            </Routes>
        </BrowserRouter>
    );
};
