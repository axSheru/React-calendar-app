import { Navigate } from "react-router-dom";

export const PrivateRoute = ({ children, isLoggedIn }) => {
	//NOTE: En un high order component (componente con hijos) sus hijos pasan como props.

	return isLoggedIn
		? children
		: <Navigate to='/login' />;
}
