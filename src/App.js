import { Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import './App.css';
import AddService from './Pages/AddService/AddService';
import Checkout from './Pages/Checkout/Checkout/Checkout';
import Home from './Pages/Home/Home/Home';
import Login from './Pages/Login/Login/Login';
import Register from './Pages/Login/Register/Register';
import RequireAuth from './Pages/Login/RequireAuth/RequireAuth';
import ServiceDetail from './Pages/ServiceDetail/ServiceDetail';
import Footer from './Pages/Shared/Footer/Footer';
import Header from './Pages/Shared/Header/Header';
import NotFound from './Pages/Shared/NotFound/NotFound';

import 'react-toastify/dist/ReactToastify.css';
import DeleteService from './Pages/DeleteService/DeleteService';
import Orders from './Pages/Orders/Orders';

function App() {
	return (
		<div>
			<Header></Header>
			<Routes>
				<Route path='/' element={<Home></Home>}></Route>
				<Route path='/home' element={<Home></Home>}></Route>
				<Route
					path='/service/:serviceId'
					element={<ServiceDetail></ServiceDetail>}
				></Route>
				<Route path='/login' element={<Login></Login>}></Route>
				<Route path='/register' element={<Register></Register>}></Route>
				<Route
					path='/checkout/:id'
					element={
						<RequireAuth>
							<Checkout></Checkout>
						</RequireAuth>
					}
				></Route>
				<Route
					path='/addservice'
					element={
						<RequireAuth>
							<AddService></AddService>
						</RequireAuth>
					}
				></Route>
				<Route
					path='/orders'
					element={
						<RequireAuth>
							<Orders></Orders>
						</RequireAuth>
					}
				></Route>
				<Route
					path='/deleteservice'
					element={
						<RequireAuth>
							<DeleteService></DeleteService>
						</RequireAuth>
					}
				></Route>
				<Route path='*' element={<NotFound></NotFound>}></Route>
			</Routes>
			<Footer></Footer>
			<ToastContainer
				position='top-right'
				autoClose={5000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				theme='light'
			/>

			<ToastContainer />
		</div>
	);
}

export default App;
