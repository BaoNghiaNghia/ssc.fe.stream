/* eslint-disable */
// Chakra imports
import { Portal, Box, useDisclosure } from '@chakra-ui/react';
// Layout components
import Navbar from '../../components/navbar/NavbarAdmin';
import Sidebar from '../../components/sidebar/Sidebar';
import SidebarContext from '../../contexts/index';
import { routesForAuthenticated, routePayments } from '../../routes';
import React, { useEffect, useState } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { useAuth } from '../../contexts/authenContext';
import { MESSSAGE_STATUS_CODE, MK_AGENCY_PROVIDER } from '../../variables';
import { useTranslation } from 'react-i18next';
import { fetchProfileDetail } from '../../api/Auth';
import { toast } from 'react-toastify';

// Custom Chakra theme
export default function Dashboard(props) {
	const { ...rest } = props;
	const { t } = useTranslation();

	const [ fixed ] = useState(false);
	const btnRef = React.useRef();
	const [ toggleSidebar, setToggleSidebar ] = useState(false);

	const { 
		isOpen: isOpenLeftMenu,
		onOpen: onOpenLeftMenu,
		onClose: onCloseLeftMenu
	  } = useDisclosure();

	const {
		profile,
		setProfile
	} = useAuth();

    const fetchCurrentUser = async () => {
		try {
			const responseProfile = await fetchProfileDetail({}, {
				headers: {
					Agency: MK_AGENCY_PROVIDER
				}
			});
			if (responseProfile.status === MESSSAGE_STATUS_CODE.SUCCESS.code) {
				setProfile(JSON.stringify(responseProfile.data.data));
			}
		} catch (err) {
            if (err.response) {
                toast.error(t(`error_code.${err.response.data.error_code}`));
            }
        }
    }

	useEffect(() => {
		fetchCurrentUser();
	}, []);

	document.documentElement.dir = 'ltr';
	const { onOpen } = useDisclosure();
	
	
	const mappingRouteByRole = [];

	let routeForRender = [...routesForAuthenticated];

	if (profile !== null && JSON.parse(profile).other_info?.show_payment === true) {
		routeForRender = [...routesForAuthenticated, ...routePayments];
	}

	// Handle thêm trường hợp token hết hạn, không sử dụng được.
	routeForRender.map((object) => {
		if (profile !== null && object.role.includes(JSON.parse(profile).group.role)) {
			return mappingRouteByRole.push(object);
		}
		return;
	});

	// functions for changing the states from components
	const getRoute = () => {
		return window.location.pathname !== '/admin/full-screen-maps';
	};
	const getActiveRoute = (routes) => {
		let activeRoute = 'MKStream';
		for (let i = 0; i < routes.length; i++) {
			if (routes[i].collapse) {
				let collapseActiveRoute = getActiveRoute(routes[i].items);
				if (collapseActiveRoute !== activeRoute) {
					return collapseActiveRoute;
				}
			} else if (routes[i].category) {
				let categoryActiveRoute = getActiveRoute(routes[i].items);
				if (categoryActiveRoute !== activeRoute) {
					return categoryActiveRoute;
				}
			} else {
				if (window.location.href.indexOf(routes[i].layout + routes[i].path) !== -1) {
					return routes[i].name;
				}
			}
		}
		return activeRoute;
	};

	const getActiveNavbar = (routes) => {
		let activeNavbar = false;
		for (let i = 0; i < routes.length; i++) {
			if (routes[i].collapse) {
				let collapseActiveNavbar = getActiveNavbar(routes[i].items);
				if (collapseActiveNavbar !== activeNavbar) {
					return collapseActiveNavbar;
				}
			} else if (routes[i].category) {
				let categoryActiveNavbar = getActiveNavbar(routes[i].items);
				if (categoryActiveNavbar !== activeNavbar) {
					return categoryActiveNavbar;
				}
			} else {
				if (window.location.href.indexOf(routes[i].layout + routes[i].path) !== -1) {
					return routes[i].secondary;
				}
			}
		}
		return activeNavbar;
	};

	const getActiveNavbarText = (routes) => {
		let activeNavbar = false;
		for (let i = 0; i < routes.length; i++) {
			if (routes[i].collapse) {
				let collapseActiveNavbar = getActiveNavbarText(routes[i].items);
				if (collapseActiveNavbar !== activeNavbar) {
					return collapseActiveNavbar;
				}
			} else if (routes[i].category) {
				let categoryActiveNavbar = getActiveNavbarText(routes[i].items);
				if (categoryActiveNavbar !== activeNavbar) {
					return categoryActiveNavbar;
				}
			} else {
				if (window.location.href.indexOf(routes[i].layout + routes[i].path) !== -1) {
					return routes[i].messageNavbar;
				}
			}
		}
		return activeNavbar;
	};

	const getRoutes = (routes) => {
		let routesFinal = []
		routes.map((prop, key) => {
			if (prop.layout === '/admin') {
				if (prop.children && prop.children.length != 0) {
					routesFinal.push(prop.children.map((child, key_child) => {
						return <Route path={prop.layout + child.path} exact component={child.component} key={key_child} />;
					}));
				}
				routesFinal.push(<Route path={prop.layout + prop.path} exact component={prop.component} key={key} />);
			}
			if (prop.collapse) {
				routesFinal.push(getRoutes(prop.items));
			}
			if (prop.children) {
				routesFinal.push(<Route path={prop.layout + prop.children.path} component={prop.children.component} key={`${key}-children`} />);
			}
			if (prop.category) {
				routesFinal.push(getRoutes(prop.items));
			}
		});
		return routesFinal;
	};

	const handleRenderRoutes = () => {
		return (
			<Box mx='auto' p={{ base: '20px', md: '30px' }} pe='20px' minH='100vh' pt='30px'>
				<Switch>
					{getRoutes([...mappingRouteByRole] || [])}
					<Redirect from='/' to='/admin/home-page' />
				</Switch>
			</Box>
		)
	}

	return (
		<Box>
				<SidebarContext.Provider
					value={{
						toggleSidebar,
						setToggleSidebar
					}}>
					<Sidebar
						isOpen={isOpenLeftMenu}
						onOpen={onOpenLeftMenu}
						onClose={onCloseLeftMenu}
						routes={mappingRouteByRole || []}
						btnRef={btnRef}
						display='none'
						{...rest} 
					/>
					<Box
						float='right'
						minHeight='100vh'
						height='100%'
						overflow='auto'
						position='relative'
						maxHeight='100%'
						w={{ base: '100%', xl: 'calc( 100% - 290px )' }}
						maxWidth={{ base: '100%', xl: 'calc( 100% - 290px )' }}
						transition='all 0.33s cubic-bezier(0.685, 0.0473, 0.346, 1)'
						transitionDuration='.2s, .2s, .35s'
						transitionProperty='top, bottom, width'
						transitionTimingFunction='linear, linear, ease'>
						<Portal>
							<Navbar
								onOpen={onOpen}
								onOpenLeftMenu={onOpenLeftMenu}
								btnRef={btnRef}
								logoText={'MKStream Dashboard'}
								brandText={getActiveRoute(mappingRouteByRole || [])}
								secondary={getActiveNavbar(mappingRouteByRole || [])}
								message={getActiveNavbarText(mappingRouteByRole || [])}
								fixed={false}
								{...rest}
							/>
						</Portal>
						{ getRoute() ?  handleRenderRoutes() : null }
					</Box>
				</SidebarContext.Provider>
		</Box>
	);
}
