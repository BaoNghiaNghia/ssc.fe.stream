/* eslint-disable */
import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
// import { ThemeEditorProvider } from '@hypertheme-editor/chakra-ui';
import { ToastContainer } from 'react-toastify';
// import { Router } from 'react-router';
import {
	HashRouter, Router,
	Route, Switch, Redirect
} from 'react-router-dom';

import history from './utils/history';
import theme from "./theme/theme";

// Translation
import i18n from './translation/i18n';
import { I18nextProvider } from 'react-i18next';

import AuthLayout from './layouts/auth';
import BlankLayout from './layouts/blank';
import AdminLayout from './layouts/admin';
import NotFound from './layouts/notfound/index';
import AuthProvider from './contexts/authenContext';
import PrivateRoute from './hook/protectedRoutes';

const App = () => {
	return (
		<ChakraProvider theme={theme}>
			<I18nextProvider i18n={i18n}>
				<ToastContainer
					position="bottom-center"
					autoClose={3000}
					hideProgressBar="true"
					limit={2}
					theme='light'
					i18nIsDynamicList={I18nextProvider}
				/>
				<AuthProvider>
					<Router history={history}>
						<HashRouter>
							<Switch>
								<PrivateRoute path="/admin" component={AdminLayout} />
								<PrivateRoute path="/general" component={BlankLayout} />
								<Route path='/auth' component={
									AuthLayout
								} />
								<Redirect from='/' exact to='/admin' />
								<Route path="*" component={NotFound} />
								<Route component={NotFound} />
							</Switch>
						</HashRouter>
					</Router>
				</AuthProvider>
			</I18nextProvider>
		</ChakraProvider>
	)
}

export default App;
