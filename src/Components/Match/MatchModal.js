import './match.css'
import { useState } from 'react'
import Button from 'react-bootstrap/Button'

export default function MatchModal(props) {
	const [p1ID, setP1ID] = useState(props.p1ID)
	const [p2ID, setP2ID] = useState(props.p2ID)
	const [p1CharID, setP1CharID] = useState(props.p1CharID)
	const [p2CharID, setP2CharID] = useState(props.p2CharID)
	const [p1RoundsWon, setP1RoundsWon] = useState(props.p1RoundsWon)
	const [p2RoundsWon, setP2RoundsWon] = useState(props.p2RoundsWon)
	const [p1IsWinner, setP1IsWinner] = useState(props.p1IsWinner)
	
	return(
		<div className='modal-container'>
			<div className="modal-content">
				<h2>{props.title}</h2>
				<form>
					<div>
						<label htmlFor='name'>Player 1:</label><br/>
						<input id='name' name="name" type="text" value={name} onChange={(e) => {setName(e.target.value)}}/><br/>
					</div>
					<div>
						<label htmlFor='default-char'>Main Character</label><br/>
						<select id='default-char' value={charID} onChange={(e) => setCharID(e.target.value)}>
							<option value={0}></option>
							{
								props.characters.map((character) => <option key={character.id + character.name} value={character.id}>{character.name}</option>)
							}
						</select>
					</div>
					<div className='modal-button-container'>
						<Button variant='danger' onClick={props.closeModal}>Cancel</Button>
						<Button type='submit' variant='success' onClick={(e) => {props.handleSubmit(e, name, charID)}}>Submit</Button>
					</div>
				</form>
			</div>
		</div>
		)
}