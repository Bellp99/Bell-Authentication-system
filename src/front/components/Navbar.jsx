import { Link, useNavigate } from "react-router-dom";
import { logout } from "../fetch";
import useGlobalReducer from "../hooks/useGlobalReducer";

export const Navbar = () => {
	const { store, dispatch } = useGlobalReducer();
	const navigate = useNavigate();

	const handleClick = () => {
		logout(dispatch)
		navigate("/login");   // redirect to login

	}

	
	const isLoggedIn = !!store.token; 

	return (
		<nav className="navbar navbar-light bg-light">
			<div className="container">
				<Link to="/">
					<span className="navbar-brand mb-0 h1">React Boilerplate</span>
				</Link>
				<div className="ml-auto">

				{isLoggedIn ? (
					<>
					<Link to="/login">
						<button className="btn btn-danger" onClick={handleClick}>
							Logout
						</button>
					</Link>						
					</>			
					)
					: 
					(
					<>
						<Link to="/login">
							<span className="navbar-brand mb-0 h1">Login</span>
						</Link>
						<Link to="/signup">
							<button className="btn btn-primary">Signup</button>
						</Link>
						
					</>
					)}
				</div>
			</div>
		</nav>
	);
};