import useFetch from '../../Hooks/useFetch.js'
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button'

export default function GetPlayers(props) {
	const {data: players, msg, isError, isPending} = useFetch(props.baseUrl + '/players')
	

	return(
		<div className='get-players'>
			<div>{isPending && 'Loading...'}</div>
			<div className='message'>{msg}</div>
			<br/>
			<div className='table-container'>	
				<Table striped hover>
					<thead>
						<tr>
							<td>Player Name</td>
							<td>Main Character</td>
						</tr>	
					</thead>
					<tbody>
						{
							players && 
							players.map((player) => {
								return (
									<tr key={player.id}>
										<td>{player.name}</td>
										<td>{player.default_char.name}</td>
									</tr>
								)
							})
						}
					</tbody>
				</Table>
				<div className='add-player-container'><Button>Add Player</Button></div>
			</div>
		</div>
		)

}