import './main.css'
import Sidebar from '../Sidebar/Sidebar.js'
import Content from '../Content/Content.js'

export default function Main() {
	return(
		<div className='main-container'>
			<Sidebar />
			<Content />
		</div>
		)
}