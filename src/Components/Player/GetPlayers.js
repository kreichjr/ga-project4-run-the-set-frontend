import useFetch from '../../Hooks/useFetch.js'

export default function GetPlayers(props) {
	const {data: players, msg, isError, isPending} = useFetch(props.baseUrl + '/players')
	

	return(
		<div>
			<div>{isPending && 'Loading...'}</div>
			<div>{msg}</div>
			<br/>
			<table>
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
			</table>
		</div>
		)

}