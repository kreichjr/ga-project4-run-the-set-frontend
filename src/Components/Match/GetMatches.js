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
							<td>Player 2</td>
							<td>Score</td>
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
										<td>{match.player_1.name} ({match.p1_char.name})</td>
										<td>{match.player_2.name} ({match.p2_char.name})</td>
										<td>{match.p1_rounds_won}-{match.p2_rounds_won}</td>
										<td>{match.p1_is_winner ? match.player_1.name : match.player_2.name}</td>
										<td><Button variant="outline-primary" size="sm" onClick={(e) => {
											props.openModal(
												"Edit Match", 
												match.player_1.id, 
												match.p1_char.id, 
												match.player_2.id, 
												match.p2_char.id, 
												match.p1_rounds_won, 
												match.p2_rounds_won, 
												match.p1_is_winner,
												true, 
												match.id
											)
										}}>Edit</Button></td>
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