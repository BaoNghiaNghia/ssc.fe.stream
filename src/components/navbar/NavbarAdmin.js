/* eslint-disable */
import {
	Box,
	Flex, Icon, Link, Text, useColorModeValue,
	Grid, GridItem, useMediaQuery
} from '@chakra-ui/react';
import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import AdminNavbarLinks from './NavbarLinksAdmin';
import { IoMenuOutline } from 'react-icons/io5';

export default function AdminNavbar(props) {
	const [scrolled, setScrolled] = useState(false);
	const [isSmallThan1200] = useMediaQuery('(max-width: 1200px)')
	const changeNavbar = () => {
		if (window.scrollY > 1) {
			setScrolled(true);
		} else {
			setScrolled(false);
		}
	};

	useEffect(() => {
		window.addEventListener('scroll', changeNavbar);

		return () => {
			window.removeEventListener('scroll', changeNavbar);
		};
	});

	const { secondary, message, brandText, btnRef, onOpenLeftMenu } = props;

	// Here are all the props that may change depending on navbar's type or state.(secondary, variant, scrolled)
	const mainText = useColorModeValue('navy.700', 'white');
	const navbarPosition = 'fixed';
	const navbarFilter = 'none';
	const navbarBackdrop = 'blur(20px)';
	const navbarShadow = 'none';
	const navbarBg = useColorModeValue('rgba(244, 247, 254, 0.2)', 'rgba(11,20,55,0.5)');
	const navbarBorder = 'transparent';
	const secondaryMargin = '0px';
	const paddingX = '15px';
	let menuColor = useColorModeValue("gray.600", "white");
	const gap = '0px';

	return (
		<Box
			position={navbarPosition}
			boxShadow={navbarShadow}
			bg={navbarBg}
			borderColor={navbarBorder}
			filter={navbarFilter}
			backdropFilter={navbarBackdrop}
			backgroundPosition='center'
			backgroundSize='cover'
			borderRadius='16px'
			borderWidth='1.5px'
			borderStyle='solid'
			transitionDelay='0s, 0s, 0s, 0s'
			transitionDuration=' 0.25s, 0.25s, 0.25s, 0s'
			transition-property='box-shadow, background-color, filter, border'
			transitionTimingFunction='linear, linear, linear, linear'
			alignItems={{ xl: 'center' }}
			display={secondary ? 'block' : 'flex'}
			minH='75px'
			justifyContent={{ xl: 'center' }}
			lineHeight='25.6px'
			mx='auto'
			mt={secondaryMargin}
			pb='8px'
			right={{ base: '12px', md: '30px', lg: '30px', xl: '30px' }}
			px={{
				sm: paddingX,
				md: '10px'
			}}
			ps={{
				xl: '12px'
			}}
			pt='8px'
			top={{ base: '12px', md: '16px', lg: '20px', xl: '20px' }}
			w={{
				base: 'calc(100vw - 6%)',
				md: 'calc(100vw - 8%)',
				lg: 'calc(100vw - 6%)',
				xl: 'calc(100vw - 350px)',
				'2xl': 'calc(100vw - 365px)'
			}}>
			<Flex
				w='100%'
				flexDirection={{
					sm: 'column',
					md: 'row'
				}}
				alignItems={{ xl: 'center' }}
				mb={gap}>
				<Box mb={{ sm: '8px', md: '0px' }}>
					{ isSmallThan1200 ? (	
						<Grid
							templateRows='repeat(1, 1fr)'
							templateColumns='repeat(2, 1fr)'
							gap={2}
							>
							<GridItem colSpan={1} margin="auto 0">
								<Flex ref={btnRef} onClick={onOpenLeftMenu} >
									<Icon
										as={IoMenuOutline}
										color={menuColor}
										w='30px'
										h='30px'
										_hover={{ cursor: "pointer" }}
									/>
								</Flex>
							</GridItem>
							<GridItem colSpan={1} margin="auto 0">
								<Link
									color={mainText}
									href=''
									bg='inherit'
									borderRadius='inherit'
									fontWeight='bold'
									fontSize='27px'
									_hover={{ color: { mainText } }}
									_active={{
										bg: 'inherit',
										transform: 'none',
										borderColor: 'transparent'
									}}
									_focus={{
										boxShadow: 'none'
									}}>
									{brandText}
								</Link>
							</GridItem>
						</Grid>
						) : (		
							<Link
								color={mainText}
								href=''
								bg='inherit'
								borderRadius='inherit'
								fontWeight='bold'
								fontSize='27px'
								_hover={{ color: { mainText } }}
								_active={{
									bg: 'inherit',
									transform: 'none',
									borderColor: 'transparent'
								}}
								_focus={{
									boxShadow: 'none'
								}}>
								{brandText}
							</Link>
						) }
				</Box>
				<Box ms='auto' w={{ sm: '70%', md: 'unset' }}>
					<AdminNavbarLinks
						onOpen={props.onOpen}
						logoText={props.logoText}
						secondary={props.secondary}
						fixed={props.fixed}
						scrolled={scrolled}
					/>
				</Box>
			</Flex>
			{secondary ? <Text color='white'>{message}</Text> : null}
		</Box>
	);
}

AdminNavbar.propTypes = {
	brandText: PropTypes.string,
	variant: PropTypes.string,
	secondary: PropTypes.bool,
	fixed: PropTypes.bool,
	onOpen: PropTypes.func
};
