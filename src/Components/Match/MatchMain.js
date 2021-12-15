import './match.css'
import { useState, useEffect } from 'react'
import GetMatches from './GetMatches.js'
import MatchModal from './MatchModal.js'
import useFetch from '../../Hooks/useFetch.js'
import Button from 'react-bootstrap/Button'

export default function MatchMain(props) {
	const [showGetMatches, setShowGetMatches] = useState(true)
	const [showModal, setShowModal] = useState(false)
	const [modalTitle, setModalTitle] = useState('')
	const [p1ID, setP1ID] = useState(0)
	const [p2ID, setP2ID] = useState(0)
	const [p1CharID, setP1CharID] = useState(0)
	const [p2CharID, setP2CharID] = useState(0)
	const [p1RoundsWon, setP1RoundsWon] = useState(0)
	const [p2RoundsWon, setP2RoundsWon] = useState(0)
	const [p1IsWinner, setP1IsWinner] = useState(null)

	const {data: players} = useFetch(props.baseUrl + '/players')
	const {data: matches, setData: setMatches,
		msg, setMsg, isError, isPending} = useFetch(props.baseUrl + '/matches')

	const generateComponentData = (validationState) => {
		return {
			p1ID,
			p2ID,
			p1CharID,
			p2CharID,
			p1RoundsWon,
			p2RoundsWon,
			p1IsWinner,
			validation: validationState
		}
	}

	const openModal = (text, p1, p1char, p2, p2char, p1rounds, p2rounds, winner, id) => {
		setModalTitle(text)
		setP1ID(p1)
		setP1CharID(p1char)
		setP2ID(p2)
		setP2CharID(p2char)
		setP1RoundsWon(p1rounds)
		setP2RoundsWon(p2rounds)
		setP1IsWinner(winner)
		setShowModal(true)
	}

	const closeModal = () => {
		setModalTitle('')
		setP1ID(0)
		setP1CharID(0)
		setP2ID(0)
		setP2CharID(0)
		setP1RoundsWon(0)
		setP2RoundsWon(0)
		setP1IsWinner(null)
		setShowModal(false)
	}

	const handleSubmit = (e, body, id) => {
		e.preventDefault()
		if (modalTitle === "Add Match") {
			addMatch(body)
		} else if (modalTitle === "Edit Match") {
			editMatch(body, id)
		}
	}

	const addMatch = (newMatch) => {
		async function fetchMe() {
			const response = await fetch(props.baseUrl + `/matches/`, {
				method: 'POST',
				body: JSON.stringify(newMatch),
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
			const matchesCopy = [...matches, jsonData.data]
			setMatches(matchesCopy)
			setMsg(jsonData.message)
			closeModal()
		}
		fetchMe()
	}

	const editMatch = (updatedMatch, id) => {
		
		async function fetchMe() {
			const response = await fetch(props.baseUrl + `/matches/${id}`, {
				method: 'PUT',
				body: JSON.stringify(updatedMatch),
				headers: {
					"Content-Type": "application/json"
				}
			})
			const jsonData = await response.json()
			
			if (jsonData.status !== 200) {
				setMsg(jsonData.msg)
				return
			}
			const matchesCopy = [...matches]
			const foundIndex = matchesCopy.findIndex((match) => match.id === jsonData.data.id)
			matchesCopy[foundIndex] = jsonData.data
			setMatches(matchesCopy)
			setMsg(jsonData.message)
			closeModal()
		}
		fetchMe()
		
	}

	const deleteMatch = (e, id) => {
		e.preventDefault()

		async function fetchMe() {
			const response = await fetch(props.baseUrl + `/matches/${id}`, {
				method: 'DELETE'
			})
			const jsonData = await response.json()
			if (jsonData.status !== 200) {
				setMsg(jsonData.msg)
				return
			}
			const matchesCopy = [...matches]
			const foundIndex = matchesCopy.findIndex(match => match.id === jsonData.data.id)
			matchesCopy.splice(foundIndex, 1)
			setMatches(matchesCopy)
			setMsg(jsonData.message)
		}
		fetchMe()
	}

	return(
		<div className='match-main'>
			<h1>Matches</h1>
			<div>{isPending && 'Loading...'}</div>
			<div className='message'>{msg}</div>
			<div className='add-match-container'>
				<Button 
					onClick={()=>{openModal(
						'Add Match', 
						p1ID, 
						p1CharID, 
						p2ID, 
						p2CharID, 
						p1RoundsWon, 
						p2RoundsWon, 
						p1IsWinner
						)
				}}>Add Match</Button></div>
			<br/>
			{showGetMatches && 
				<GetMatches 
					matches={matches} 
					msg={msg}
					editMatch={editMatch} 
					deleteMatch={deleteMatch}
					openModal={openModal}
					/>
			}
			{showModal && 
				<MatchModal 
					characters={props.characters}
					players={players} 
					active={showModal} 
					title={modalTitle} 
					closeModal={closeModal}
					handleSubmit={handleSubmit}
					initialState={generateComponentData(true)}
					/>
			}
		</div>
		)
}