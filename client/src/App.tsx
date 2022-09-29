import { Route, Routes } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from './hooks/redux';
import Auth from './pages/Auth/Auth';
import { authSlice } from './store/reducers/AuthSlice';

function App() {
	return (
		<div>
			<Routes>
				<Route path="/" element={<Auth />} />
			</Routes>
		</div>
	);
}

export default App;
