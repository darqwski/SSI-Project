import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Requester } from '../../utils/Requester';

const MarkComponent = ({ productId, refresh }) => {
	const [mark, setMark] = useState(null);
	const onMark = () => {
		Requester({
			url: '/API/marks',
			method: 'POST',
			data: 'mark='+mark+'&productId='+productId
		}).then(()=>{
			refresh();
		});
	};

	return (
		<div>
			<label> Wystaw ocene</label>
			<input name="mark" min="1" max="5" onChange={({ target:{ value } })=>setMark(+value)} value={mark} />
			<button className="btn-small" onClick={onMark}>Daj ocenę</button>
		</div>
	);
};

MarkComponent.propTypes = {
	productId: PropTypes.string,
	refresh: PropTypes.func
};

export default MarkComponent;