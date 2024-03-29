/* eslint-disable */
import React, { useEffect } from 'react';
import { Center, Spinner } from '@chakra-ui/react';
import { 
	HashRouter, Router,
	Route, Switch, Redirect
} from 'react-router-dom';

import { useAuth } from '../contexts/authenContext';
import jwtDecode from 'jwt-decode';
import { toast } from 'react-toastify';

const PrivateRoute = (props) => {
    const { token, profile, setProfile } = useAuth();
    const { t } = useAuth();

    if (token === null || profile === null) {
      localStorage.clear();
      return <Redirect from='/' to='/auth/sign-in' />;
    } else {
      try {
        let decodedToken = jwtDecode(token);
        let currentDate = new Date();
      
        // JWT exp is in seconds
        if (decodedToken?.expired_at*1000 < currentDate.getTime()) {
          toast.error('Token người dùng đã hết hạn');
          localStorage.clear();
          return <Redirect from='/' to='/auth/sign-in' />;
        } else {
          console.log("Valid token");
        }
      } catch (err) {
        console.log(err);
        localStorage.clear();
        return <Redirect from='/' to='/auth/sign-in' />;
      }

      return <Route {...props} />;
    }
  };

export default PrivateRoute;
