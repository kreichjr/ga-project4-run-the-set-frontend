import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button'

export default function GetMatches(props) {
	return(
		<div className='get-matches'>
			<div className='table-container'>	
				<Table striped hover>
					<thead>
						<tr>
							<td>Player 1</td>
							<td>Player 1 Character</td>
							<td>Player 2</td>
							<td>Player 2 Character</td>
							<td>P1 Rounds Won</td>
							<td>P2 Rounds Won</td>
							<td>Winner</td>
							<td></td>
							<td></td>
						</tr>	
					</thead>
					<tbody>
						{
							props.matches && 
							props.matches.map((match) => {
								return (
									<tr key={match.id}>
										<td>{match.player_1.name}</td>
										<td>{match.p1_char.name}</td>
										<td>{match.player_2.name}</td>
										<td>{match.p2_char.name}</td>
										<td>{match.p1_rounds_won}</td>
										<td>{match.p2_rounds_won}</td>
										<td>{match.p1_is_winner ? match.player_1.name : match.player_2.name}</td>
										<td><Button variant="outline-primary" size="sm">Edit</Button></td>
										<td><Button variant="outline-danger" disabled={false} size="sm" onClick={(e) => {props.deleteMatch(e, match.id)}}>Delete</Button></td>
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