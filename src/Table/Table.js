import React from "react"

export default props => (
	<table className="table table-striped table-dark" style={{ opacity: '0.7', cursor: 'pointer' }}>
		<thead>
			<tr>
				<th onClick={props.onSort.bind(null, 'dob.age')} scope="col">
					Age {props.sortItems === 'dob.age' ? <small>{props.sortTwo}</small> : null}
				</th>
				<th onClick={props.onSort.bind(null, 'name.first')} scope="col">
					First Name {props.sortItems === 'name.first' ? <small>{props.sortTwo}</small> : null}
				</th>
				<th onClick={props.onSort.bind(null, 'name.last')} scope="col">
					Last Name {props.sortItems === 'name.last' ? <small>{props.sortTwo}</small> : null}
				</th>
				<th onClick={props.onSort.bind(null, 'email')} scope="col">
					E-mail {props.sortItems === 'email' ? <small>{props.sortTwo}</small> : null}
				</th>
				<th onClick={props.onSort.bind(null, 'phone')} scope="col">
					Phone {props.sortItems === 'phone' ? <small>{props.sortTwo}</small> : null}
				</th>
			</tr>
		</thead>
		<tbody>
			{
				props.data.map(item => (
					<tr key={item.login.uuid}>
						<td>{item.dob.age}</td>
						<td>{item.name.first}</td>
						<td>{item.name.last}</td>
						<td>{item.email}</td>
						<td>{item.phone}</td>
					</tr>
				))
			}
		</tbody>
	</table>
)