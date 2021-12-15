import './match.css'
import { useState, useEffect } from 'react'
import Button from 'react-bootstrap/Button'

export default function MatchModal(props) {
	const [p1ID, setP1ID] = useState(String(props.initialState.p1ID))
	const [p2ID, setP2ID] = useState(String(props.initialState.p2ID))
	const [p1CharID, setP1CharID] = useState(String(props.initialState.p1CharID))
	const [p2CharID, setP2CharID] = useState(String(props.initialState.p2CharID))
	const [p1RoundsWon, setP1RoundsWon] = useState(String(props.initialState.p1RoundsWon))
	const [p2RoundsWon, setP2RoundsWon] = useState(String(props.initialState.p2RoundsWon))
	const [p1IsWinner, setP1IsWinner] = useState(props.initialState.p1IsWinner)
	const [validation, setValidation] = useState(props.initialState.validation)
	const [msg, setMsg] = useState('')

	const winnerStyle = {
		backgroundColor: "lightgreen"
	}

	const loserStyle = {
		backgroundColor: "white"
	}

	const validStyle = {
		color: "lightgreen"
	}

	const invalidStyle = {
		color: "red"
	}

	const generateFormData = () => {
		return {
			player_1:      Number(p1ID),
			player_2:      Number(p2ID),
			p1_char:       Number(p1CharID),
			p2_char:       Number(p2CharID),
			p1_rounds_won: Number(p1RoundsWon),
			p2_rounds_won: Number(p2RoundsWon),
			p1_is_winner:  p1IsWinner
		}
	}

	const handleP1Click = (e) => {
		setP1IsWinner(true)
	}

	const handleP2Click = (e) => {
		setP1IsWinner(false)
	}

	const validateData = () => {
		console.log({
			p1ID, p2ID, p1CharID, p2CharID, p1RoundsWon, p2RoundsWon, p1IsWinner
		})
		if (p1ID === p2ID) {
			setMsg('Players must not match')
			setValidation(false)
			return
		}

		if (p1ID === '0' || p2ID === '0') {
			setMsg('Both players must be set')
			setValidation(false)
			return	
		}

		if (p1IsWinner === null) {
			setMsg('A winner must be selected')
			setValidation(false)
			return			
		}

		if (p1IsWinner && Number(p1RoundsWon) < Number(p2RoundsWon)) {
			setMsg('Winner has won less rounds than the opponent')
			setValidation(false)
			return		
		}

		if (!p1IsWinner && Number(p1RoundsWon) > Number(p2RoundsWon)) {
			setMsg('Winner has won less rounds than the opponent')
			setValidation(false)
			return		
		}

		if ((p1IsWinner && Number(p1RoundsWon) != 2) || (!p1IsWinner && Number(p2RoundsWon) != 2)) {
			setMsg('Winner must have 2 rounds won')
			setValidation(false)
			return	
		}



		setMsg('Ready to Submit')
		setValidation(true)
	}

	useEffect(() => {
		validateData()
	}, [p1ID, p2ID, p1CharID, p2CharID, p1RoundsWon, p2RoundsWon, p1IsWinner])

	useEffect(() => {
		validateData()
	}, [])

	return(
		<div className='modal-container'>
			<div className="modal-content">
				<h2>{props.title}</h2>
				<p style={validation ? validStyle : invalidStyle}>{msg}</p>
				<form className="match-form">
					<div className="form-container">
						<div className="p1-form">
							<fieldset style={(!(p1IsWinner === null) && p1IsWinner) ? winnerStyle : loserStyle}>
								<legend>Player 1</legend>
								<label htmlFor='player-1'>Player</label><br/>
								<select id='player-1' value={p1ID} onChange={(e) => {setP1ID(e.target.value)}}>
									<option value={0}></option>
									{
										props.players.map((player) => <option key={'player_1 ' + player.id} value={player.id}>{player.name}</option>)
									}
								</select><br/>
								<label htmlFor='player-1-character'>Character</label><br/>
								<select id='player-1-character' value={p1CharID} onChange={(e) => {setP1CharID(e.target.value)}}>
									<option value={0}>Main Char</option>
									{
										props.characters.map((character) => <option key={'p1_char ' + character.id} value={character.id}>{character.name}</option>)
									}
								</select><br/>
								<label htmlFor='p1-rounds-won'>Rounds Won</label><br/>
								<input id='p1-rounds-won' className="rounds-won" type="number" value={p1RoundsWon} onChange={(e)=>{setP1RoundsWon(e.target.value)}}/><br/>
								<Button className="winner-button" size='sm' onClick={handleP1Click}>Set Winner</Button>
							</fieldset>
						</div>
						<div className="p2-form">
							<fieldset style={(!(p1IsWinner === null) && !p1IsWinner) ? winnerStyle : loserStyle}>
								<legend>Player 2</legend>								
								<label htmlFor='player-2'>Player</label><br/>
								<select id='player-2' value={p2ID} onChange={(e) => {setP2ID(e.target.value)}}>
									<option value={0}></option>
									{
										props.players.map((player) => <option key={'player_2 ' + player.id} value={player.id}>{player.name}</option>)
									}
								</select><br/>
								<label htmlFor='player-2-character'>Character</label><br/>
								<select id='player-2-character' value={p2CharID} onChange={(e) => {setP2CharID(e.target.value)}}>
									<option value={0}>Main Char</option>
									{
										props.characters.map((character) => <option key={'p1_char ' + character.id} value={character.id}>{character.name}</option>)
									}
								</select><br/>
								<label htmlFor='p2-rounds-won'>Rounds Won</label><br/>
								<input id='p2-rounds-won' className="rounds-won" type="number" min="0" max="2" value={p2RoundsWon} onChange={(e)=>{setP2RoundsWon(e.target.value)}}/><br/>
								<Button className="winner-button" size='sm' onClick={handleP2Click}>Set Winner</Button>
							</fieldset>
						</div>
					</div>
					<div className='modal-button-container'>
						<Button 
							variant='danger' 
							onClick={props.closeModal}
							>Cancel</Button>
						<Button 
							type='submit' 
							variant='success' 
							disabled={validation ? false : true}
							onClick={(e) => {props.handleSubmit(e, generateFormData())}}
							>Submit</Button>
					</div>
				</form>
			</div>
		</div>
		)
}