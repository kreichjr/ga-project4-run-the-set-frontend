import './header.css'
import Logo from '../Logo/Logo.js'


export default function Header() {
	return(
		<>
			<div className='logo-container'><Logo /></div>
			<div className='admin-container'><a href={process.env.REACT_APP_BASEURL + "/admin"}>Administrator Login</a></div>
		</>
		)
}