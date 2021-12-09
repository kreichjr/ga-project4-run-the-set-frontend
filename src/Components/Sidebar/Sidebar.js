import './sidebar.css'

export default function Sidebar(props) {
	return(
		<div className='sidebar'>
			<nav>
				<ul>
					<li id='clickPlayer' onClick={props.selectPage}>Players</li>
					<li id='clickMatch' onClick={props.selectPage}>Matches</li>
				</ul>
			</nav>
		</div>
		)
}