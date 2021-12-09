import './main.css'
import Sidebar from '../Sidebar/Sidebar.js'
import Content from '../Content/Content.js'
import { useState } from 'react'

export default function Main() {
	const [playerPageIsActive, setPlayerPageIsActive] = useState(true)
	const [matchPageIsActive, setMatchPageIsActive] = useState(false)

	const selectPage = (e) => {
		const content = {
			clickPlayer: () => {
				setPlayerPageIsActive(true)
				setMatchPageIsActive(false)
			},
			clickMatch: () => {
				setPlayerPageIsActive(false)
				setMatchPageIsActive(true)
			}
		}
		
		content[e.target.id]()
	}

	return(
		<div className='main-container'>
			<Sidebar 
				selectPage={selectPage}
				/>
			<Content 
				playerPageActive={playerPageIsActive}
				matchPageActive={matchPageIsActive}
				/>
		</div>
		)
}