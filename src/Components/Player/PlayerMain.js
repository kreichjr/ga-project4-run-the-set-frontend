import './player.css'
import { useState } from 'react'
import GetPlayers from './GetPlayers.js'

export default function PlayerMain(props) {
	const [msg, setMsg] = useState('')
	const [showGetPlayers, setShowGetPlayers] = useState(true)

	return(
		<div className='player-main'>
			<h1>Player Main Page</h1>
			<br/>
			<div className='msg'>{msg}</div>
			<br/>
			{showGetPlayers && <GetPlayers setMsg={setMsg} baseUrl={props.baseUrl}/>}
		</div>
		
		)
}