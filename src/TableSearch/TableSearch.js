import React, { useState } from 'react'

export default props => {
	const [value, setValue] = useState('')
	const valueChangeHandler = event => {
		setValue(event.target.value)
	}

	return (
		<div className="input-group mb-4">
			<input
				type="text"
				className="form-control"
				onChange={valueChangeHandler}
				onKeyUp={() => props.onSearch(value)}
				value={value}
				placeholder="Enter a name/e-mail/phone"
			/>
		</div>
	)
}