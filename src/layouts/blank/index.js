/* eslint-disable */
// Chakra imports
import { Portal, Box, useDisclosure, Stack, useColorModeValue } from '@chakra-ui/react';
// Layout components
import { routeBlank } from '../../routes';
import React, { useEffect, useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import { useAuth } from '../../contexts/authenContext';
import history from '../../utils/history';
import { MESSSAGE_STATUS_CODE, MK_AGENCY_PROVIDER } from '../../variables';
import { useTranslation } from 'react-i18next';
import { fetchProfileDetail } from '../../api/Auth';
import { toast } from 'react-toastify';

// Custom Chakra theme
export default function Blank(props) {
	const { t } = useTranslation();
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
	const mappingRouteByRole = [];

	// Handle thêm trường hợp token hết hạn, không sử dụng được.
	routeBlank.map((object) => {
		if (profile !== null && object.role.includes(JSON.parse(profile).group.role)) {
			return mappingRouteByRole.push(object);
		}
		return;
	});

	const getRoutes = (routes) => {
		let routesFinal = []
		routes.map((prop, key) => {
			if (prop.layout === '/general') {
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
			<Box minH='100vh'>
				<Switch>
					{getRoutes([...mappingRouteByRole] || [])}
				</Switch>
			</Box>
		)
	}

	return (
		<Box
			bg="white"
			m="0px" p="0px"
			float='right'
			minHeight='100vh'
			height='100%'
			position='relative'
			w='100%'
			transition='all 0.33s cubic-bezier(0.685, 0.0473, 0.346, 1)'
			transitionDuration='.2s, .2s, .35s'
			transitionProperty='top, bottom, width'
			transitionTimingFunction='linear, linear, ease'>
			{ handleRenderRoutes() }
		</Box>
	);
}
