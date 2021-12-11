import './player.css'
import { useState } from 'react'
import GetPlayers from './GetPlayers.js'

export default function PlayerMain(props) {
	const [showGetPlayers, setShowGetPlayers] = useState(true)
	
	return(
		<div className='player-main'>
			<h1>Players</h1>
			{showGetPlayers && <GetPlayers baseUrl={props.baseUrl}/>}
		</div>
		
		)
}