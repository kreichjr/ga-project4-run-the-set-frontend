import React, { useState } from 'react'
import GetPlayers from './GetPlayers.js'
import PlayerModal from './PlayerModal.js'
import useFetch from '../../Hooks/useFetch.js'
import Button from 'react-bootstrap/Button'
import './player.css'

export default function PlayerMain(props) {
	const [showGetPlayers, setShowGetPlayers] = useState(true)
	const [showModal, setShowModal] = useState(false)
	const [modalTitle, setModalTitle] = useState('')
	const [formName, setFormName] = useState('')
	const [formCharID, setFormCharID] = useState(0)
	const [targetPlayerID, setTargetPlayerID] = useState(0)

	const {data: players, setData: setPlayers,
		msg, setMsg, isError, isPending} = useFetch(props.baseUrl + '/players')

	const openModal = (text, name, charID, playerID) => {
		setModalTitle(text)
		setFormName(name)
		setFormCharID(charID)
		setShowModal(true)
		if (playerID) {
			setTargetPlayerID(playerID)
		}
	}

	const closeModal = () => {
		setShowModal(false)
		setFormCharID(0)
		setFormName('')
		setModalTitle('')
		setTargetPlayerID(0)
	}

	const handleSubmit = (e, name, charID) => {
		e.preventDefault()
		if (modalTitle === "Add Player") {
			addPlayer(name, charID)
		} else if (modalTitle === "Edit Player") {
			editPlayer(name, charID)
		}
	}

	const addPlayer = (name, charID) => {
		
		console.log(name, charID)
		if (!name) {
			alert("You must enter a player name!")
			return
		}
		if (charID === 0) {
			alert("You must choose a character!")
			return
		}

		async function fetchMe() {
			const newPlayer = {
				name: name,
				default_char: charID
			}
			const response = await fetch(props.baseUrl + `/players/`, {
				method: 'POST',
				body: JSON.stringify(newPlayer),
				headers: {
					"Content-Type": "application/json"
				}
			})
			const jsonData = await response.json()
			console.log(jsonData)
			if (jsonData.status !== 201) {
				setMsg(jsonData.msg)
				return
			}
			const playersCopy = [...players, jsonData.data]
			setPlayers(playersCopy)
			setMsg(jsonData.message)
			closeModal()
		}
		fetchMe()
	}

	const editPlayer = (name, charID) => {
		if (!name) {
			alert("You must enter a player name!")
			return
		}
		if (charID === 0) {
			alert("You must choose a character!")
			return
		}

		async function fetchMe() {
			const updatedPlayer = {
				name: name,
				default_char: charID
			}
			const response = await fetch(props.baseUrl + `/players/${targetPlayerID}`, {
				method: 'PUT',
				body: JSON.stringify(updatedPlayer),
				headers: {
					"Content-Type": "application/json"
				}
			})
			const jsonData = await response.json()
			console.log(jsonData)
			if (jsonData.status !== 200) {
				setMsg(jsonData.msg)
				return
			}
			const playersCopy = [...players]
			const foundIndex = playersCopy.findIndex((player) => player.id === jsonData.data.id)
			playersCopy[foundIndex] = jsonData.data
			setPlayers(playersCopy)
			setMsg(jsonData.message)
			closeModal()
		}
		fetchMe()
		
	}

	const deletePlayer = (e, id) => {
		e.preventDefault()

		async function fetchMe() {
			const response = await fetch(props.baseUrl + `/players/${id}`, {
				method: 'DELETE'
			})
			const jsonData = await response.json()
			if (jsonData.status !== 200) {
				setMsg(jsonData.msg)
				return
			}
			const playersCopy = [...players]
			const foundIndex = playersCopy.findIndex(player => player.id === jsonData.data.id)
			playersCopy.splice(foundIndex, 1)
			setPlayers(playersCopy)
			setMsg(jsonData.message)
		}
		fetchMe()
	}

	return(
		<div className='player-main'>
			<h1>Players</h1>
			<div>{isPending && 'Loading...'}</div>
			<div className='message'>{msg}</div>
			<div className='add-player-container'><Button onClick={()=>{openModal('Add Player', '', 0)}}>Add Player</Button></div>
			<br/>
			{showGetPlayers && 
				<GetPlayers 
					players={players} 
					msg={msg}
					editPlayer={editPlayer} 
					deletePlayer={deletePlayer}
					openModal={openModal}
					/>
			}
			{showModal && 
				<PlayerModal 
					characters={props.characters} 
					active={showModal} 
					title={modalTitle} 
					name={formName} 
					charID={formCharID}
					closeModal={closeModal}
					handleSubmit={handleSubmit}
					/>
			}
		</div>
		
		)
}