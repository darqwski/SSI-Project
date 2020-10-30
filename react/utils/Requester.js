export const Requester = ({
	url = '/',
	data= undefined,
	method='POST',
	...rest
}) => fetch(url, {
	...rest,
	body: data,
	method,
	headers: {
		'Content-Type': 'application/x-www-form-urlencoded',
		...(rest.headers || {}),
	}
})
	.then(data=>data.json());
