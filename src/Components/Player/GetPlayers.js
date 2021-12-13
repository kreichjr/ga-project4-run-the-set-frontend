import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button'

export default function GetPlayers(props) {
	
	

	return(
		<div className='get-players'>
			
			<div className='table-container'>	
				<Table striped hover>
					<thead>
						<tr>
							<td>Player Name</td>
							<td>Main Character</td>
							<td></td>
							<td></td>
						</tr>	
					</thead>
					<tbody>
						{
							props.players && 
							props.players.map((player) => {
								return (
									<tr key={player.id}>
										<td>{player.name}</td>
										<td>{player.default_char.name}</td>
										<td><Button variant="outline-primary" onClick={() => {props.openModal("Edit Player", player.name, player.default_char.id, player.id)}}>Edit</Button></td>
										<td><Button variant="outline-danger" disabled={true} onClick={(e) => {props.deletePlayer(e, player.id)}}>Delete</Button></td>
									</tr>
								)
							})
						}
					</tbody>
				</Table>
			</div>
		</div>
		)

}