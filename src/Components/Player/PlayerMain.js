import './player.css'
import { useState } from 'react'
import GetPlayers from './GetPlayers.js'

export default function PlayerMain(props) {
	const [msg, setMsg] = useState('')
	const [showGetPlayers, setShowGetPlayers] = useState(true)

	return(
		<div className='player-main'>
			<h1>Players</h1>
			<div className='message'><p>{msg}</p></div>
			<br/>
			{showGetPlayers && <GetPlayers setMsg={setMsg} baseUrl={props.baseUrl}/>}
		</div>
		
		)
}