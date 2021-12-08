import './content.css'
import useFetch from '../../Hooks/useFetch.js'


export default function Content() {
	const { data: charData, msg: charMsg, isError: charIsError, isPending: charIsPending } = useFetch('http://localhost:8000/characters')
	
	return(
		<div className="content">
			{charData && charData.map(char => char.name)}
		</div>
		)
}