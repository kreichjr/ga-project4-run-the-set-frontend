import './content.css'
import useFetch from '../../Hooks/useFetch.js'
import PlayerMain from '../Player/PlayerMain.js'
import MatchMain from '../Match/MatchMain.js'

const baseUrl = process.env.REACT_APP_BASEURL || 'http://localhost:8000'

export default function Content(props) {
	const { data: charData,  
			isPending: charIsPending 
		} = useFetch(baseUrl + '/characters')
	
	return(
		<div className="content">
			{(!charIsPending && props.playerPageActive) && <PlayerMain baseUrl={baseUrl}/>}
			{(!charIsPending && props.matchPageActive) && <MatchMain />}
		</div>
		)
}