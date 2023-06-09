import { signOut } from 'firebase/auth';
import React from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link } from 'react-router-dom';
import auth from '../../../firebase.init';
import logo from '../../../images/logo.png';
const Header = () => {
	const [user] = useAuthState(auth);

	const handleSignOut = () => {
		signOut(auth);
	};

	return (
		<>
			<Navbar
				collapseOnSelect
				expand='lg'
				sticky='top'
				bg='primary'
				variant='dark'
			>
				<Container>
					<Navbar.Brand as={Link} to='/'>
						<img height={30} src={logo} alt='' />
					</Navbar.Brand>
					<Navbar.Toggle aria-controls='responsive-navbar-nav' />
					<Navbar.Collapse id='responsive-navbar-nav'>
						<Nav className='me-auto'>
							<Nav.Link as={Link} to='/home'>
								Home
							</Nav.Link>
							<Nav.Link href='/home#services'>Services</Nav.Link>
							<Nav.Link href='/home#experts'>Experts</Nav.Link>
						</Nav>
						<Nav className='d-flex justify-content-center  align-items-center'>
							{user && (
								<>
									<Nav.Link as={Link} to='/orders'>
										Orders
									</Nav.Link>
									<Nav.Link as={Link} to='/addservice'>
										Add Sevice
									</Nav.Link>
									<Nav.Link as={Link} to='/deleteservice'>
										Delete Service
									</Nav.Link>
									<Nav.Link className='text-white'>{user?.email}</Nav.Link>
								</>
							)}
							{user ? (
								<button
									className='btn btn-link text-white text-decoration-none'
									onClick={handleSignOut}
								>
									Log Out
								</button>
							) : (
								<Nav.Link as={Link} to='login'>
									Login
								</Nav.Link>
							)}
						</Nav>
					</Navbar.Collapse>
				</Container>
			</Navbar>
		</>
	);
};

export default Header;
