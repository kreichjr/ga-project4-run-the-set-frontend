import './match.css'
import { useState, useEffect } from 'react'
import GetMatches from './GetMatches.js'
import useFetch from '../../Hooks/useFetch.js'
import Button from 'react-bootstrap/Button'

export default function MatchMain(props) {
	const [showGetMatches, setShowGetMatches] = useState(true)
	const [showModal, setShowModal] = useState(false)

	const {data: matches, setData: setMatches,
		msg, setMsg, isError, isPending} = useFetch(props.baseUrl + '/matches')

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
			<div className='add-match-container'><Button>Add Match</Button></div>
			<br/>
			{showGetMatches && 
				<GetMatches 
					matches={matches} 
					msg={msg}
					// editPlayer={editPlayer} 
					deleteMatch={deleteMatch}
					// openModal={openModal}
					/>
			}
			{/*{showModal && 
				<MatchModal 
					characters={props.characters} 
					active={showModal} 
					title={modalTitle} 
					name={formName} 
					charID={formCharID}
					closeModal={closeModal}
					handleSubmit={handleSubmit}
					/>
			}*/}
		</div>
		)
}