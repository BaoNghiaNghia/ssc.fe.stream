/* eslint-disable */
import {
	Flex,
	Menu,
	MenuButton,
	MenuItem,
	MenuList,
	Tooltip,
	Text,
	useColorModeValue,
	Icon
} from '@chakra-ui/react';

// Custom Components
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import history from '../../utils/history';
import { useAuth } from '../../contexts/authenContext';
import { MESSSAGE_STATUS_CODE, MK_AGENCY_PROVIDER } from '../../variables';
import { ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons';

// import avatar from "../../assets/img/avatars/avatar.png"
import { fetchProfileDetail } from '../../api/Auth';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import AvatarText from '../../components/AvatarText';

export default function HeaderLinks(props) {
	const { secondary } = props;
	// Chakra Color Mode
	const textColor = useColorModeValue('secondaryGray.900', 'white');
	const borderColor = useColorModeValue('#E6ECFA', 'rgba(135, 140, 189, 0.3)');
	const shadow = useColorModeValue(
		'14px 17px 40px 4px rgba(112, 144, 176, 0.18)',
		'14px 17px 40px 4px rgba(112, 144, 176, 0.06)'
	);

	const [profile_, setProfile_] = useState({});

	const { t } = useTranslation();

	const [isOpen, setIsOpen] = useState(false);

	const toggleMenu = () => {
		setIsOpen((prev) => !prev);
	};

	const fetchCurrentUser = async () => {
		try {
			const responseProfile = await fetchProfileDetail({}, {
				headers: {
					Agency: MK_AGENCY_PROVIDER
				}
			});
			if (responseProfile.status === MESSSAGE_STATUS_CODE.SUCCESS.code) {
				setProfile_(responseProfile?.data?.data);
			}
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
			<Menu isOpen={isOpen}>
				<MenuButton
					borderRadius="full"
					bg="transparent"
					onClick={toggleMenu}
					_hover={{ bg: 'gray.200' }}
					style={{ outline: '1px solid #9fae8e38', marginLeft: '-20px' }}
				>
					<Flex alignItems="center">
						<AvatarText name={profile_?.fullname} inputSize="lg" />
						<Icon
							as={isOpen ? ChevronUpIcon : ChevronDownIcon}
							w={5}
							h={5}
							color={'secondaryGray.700'}
						/>
					</Flex>
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
							_hover={{ bg: 'blue.100' }} // Change background color on hover for MenuItem
							_focus={{ bg: 'blue.100' }} // Optional: focus state styling
							borderRadius="8px"
							px="14px"
							fontSize="md"
							onClick={handleRedirectPersonalProfile}
						>
							<Text fontSize="sm">Thông tin cá nhân</Text>
						</MenuItem>
						<MenuItem
							_hover={{ bg: 'red.100' }} // Change background color on hover for logout MenuItem
							_focus={{ bg: 'red.100' }} // Optional: focus state styling
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
