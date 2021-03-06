import './player.css'
import { useState } from 'react'
import Button from 'react-bootstrap/Button'

export default function PlayerModal(props) {
	const [name, setName] = useState(props.name)
	const [charID, setCharID] = useState(props.charID)
	
	return(
		<div className='modal-container'>
			<div className="modal-content" id='player-modal-content'>
				<h2>{props.title}</h2>
				<form>
					<div>
						<label htmlFor='name'>Player Name:</label><br/>
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