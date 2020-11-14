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

	const classNameFor = index => {
		if(index === 5){
			if( mark === 5) return ' green-text';
		}
		if(index === 4){
			if( mark === 5) return ' green-text';
			if( mark === 4) return ' blue-text';
		}
		if(index === 3){
			if( mark === 5) return ' green-text';
			if( mark === 4) return ' blue-text';
			if( mark === 3) return ' yellow-text';
		}
		if(index === 2){
			if( mark === 5) return ' green-text';
			if( mark === 4) return ' blue-text';
			if( mark === 3) return ' yellow-text';
			if( mark === 2) return ' orange-text';
		}
		if(index === 1) {
			if (mark === 5) return ' green-text';
			if (mark === 4) return ' blue-text';
			if (mark === 3) return ' yellow-text';
			if (mark === 2) return ' orange-text';
			if (mark === 1) return ' red-text';
		}
	};

	return (
		<div>
			<label> Wystaw ocenę</label>
			<div className="mark-stars" >
				<i
					className={`material-icons ${classNameFor(1)}`}
					onMouseOver={()=>setMark(1)}
					onMouseOut={()=>setMark(undefined)}
					onClick={onMark}>
					grade
				</i>
				<i
					className={`material-icons ${classNameFor(2)}`}
					onMouseOver={()=>setMark(2)}
					onMouseOut={()=>setMark(undefined)}
					onClick={onMark}>
					grade
				</i>
				<i
					className={`material-icons ${classNameFor(3)}`}
					onMouseOver={()=>setMark(3)}
					onMouseOut={()=>setMark(undefined)}
					onClick={onMark}>
					grade
				</i>
				<i
					className={`material-icons ${classNameFor(4)}`}
					onMouseOver={()=>setMark(4)}
					onMouseOut={()=>setMark(undefined)}
					onClick={onMark}>
					grade
				</i>
				<i
					className={`material-icons ${classNameFor(5)}`}
					onMouseOver={()=>setMark(5)}
					onMouseOut={()=>setMark(undefined)}
					onClick={onMark}>
					grade
				</i>
			</div>
		</div>
	);
};

MarkComponent.propTypes = {
	productId: PropTypes.string,
	refresh: PropTypes.func
};

export default MarkComponent;