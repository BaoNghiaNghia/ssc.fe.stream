/* eslint-disable */
import {
	Avatar,
	Flex,
	Menu,
	MenuButton,
	MenuItem,
	MenuList,
	Tooltip,
	Text,
	useColorModeValue
} from '@chakra-ui/react';

// Custom Components
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import history from '../../utils/history';
import { useAuth } from '../../contexts/authenContext';
import { MESSSAGE_STATUS_CODE, MK_AGENCY_PROVIDER } from '../../variables';

import avatar from "../../assets/img/avatars/avatar.png"
import { fetchProfileDetail } from '../../api/Auth';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';

export default function HeaderLinks(props) {
	const { secondary } = props;
	// Chakra Color Mode
	const textColor = useColorModeValue('secondaryGray.900', 'white');
	const borderColor = useColorModeValue('#E6ECFA', 'rgba(135, 140, 189, 0.3)');
	const shadow = useColorModeValue(
		'14px 17px 40px 4px rgba(112, 144, 176, 0.18)',
		'14px 17px 40px 4px rgba(112, 144, 176, 0.06)'
	);

	const [profile_, setProfile_]= useState({});

	const { t } = useTranslation();
    const fetchCurrentUser = async () => {
		const responseProfile = await fetchProfileDetail({}, {
			headers: {
				Agency: MK_AGENCY_PROVIDER
			}
		});
		if (responseProfile.status === MESSSAGE_STATUS_CODE.SUCCESS.code) {
			setProfile_(responseProfile?.data?.data);
		}
        try {
        } catch (err) {
            if (err?.response) {
                toast.error(t(`error_code.${err?.response?.data?.error_code}`));
            }
        }
    }

	useEffect(() => {
		fetchCurrentUser();
	}, []);

	const { setToken } = useAuth();

	const handleLogoutEvent = () => {
		setToken();
		history.push('#/auth/sign-in');
	};

	const handleRedirectPersonalProfile = () => {
		history.push('#/admin/profile');
		window.location.reload();
	}

	return (
		<Flex
			alignItems="center"
			flexDirection="row"
			flexWrap={secondary ? { base: 'wrap', md: 'nowrap' } : 'unset'}
			p="1px"
			bg="transparent"
			>
			<Menu>
				<MenuButton borderRadius="full" bg="transparent">
					<Avatar
						_hover={{ cursor: 'pointer' }}
						src={avatar}
						size="md"
						borderRadius="30px"
						w="45px"
						h="45px"
						bg="transparent"
					/>
				</MenuButton>
				<MenuList
				boxShadow={shadow}
				p="0px"
				mt="10px"
				borderRadius="8px"
				border="none"
				>
				<Flex w="100%" mb="0px">
					<Tooltip label={`Xin chào, ${profile_?.fullname}`} position="top">
					<Text
						ps="20px"
						pt="16px"
						pb="10px"
						w="100%"
						borderBottom="1px solid"
						borderColor={borderColor}
						fontSize="sm"
						fontWeight="600"
						color={textColor}
					>
						👋&nbsp;
						{profile_ ? (
						<span>Chào, {profile_?.fullname}</span>
						) : (
						<span>'Chào bạn'</span>
						)}
					</Text>
					</Tooltip>
				</Flex>
				<Flex flexDirection="column" p="10px">
					<MenuItem
					_hover={{ bg: 'none' }}
					_focus={{ bg: 'none' }}
					borderRadius="8px"
					px="14px"
					fontSize="md"
					onClick={handleRedirectPersonalProfile}
					>
					<Text fontSize="sm">Thông tin cá nhân</Text>
					</MenuItem>
					<MenuItem
					_hover={{ bg: 'none' }}
					_focus={{ bg: 'none' }}
					onClick={handleLogoutEvent}
					color="red.400"
					borderRadius="8px"
					fontSize="md"
					px="14px"
					>
					<Text fontSize="sm">Đăng xuất</Text>
					</MenuItem>
				</Flex>
				</MenuList>
			</Menu>
			</Flex>

	);
}

HeaderLinks.propTypes = {
	variant: PropTypes.string,
	fixed: PropTypes.bool,
	secondary: PropTypes.bool
};
