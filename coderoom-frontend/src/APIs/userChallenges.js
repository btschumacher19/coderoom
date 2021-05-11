import axios from 'axios';

const BASE_URL = process.env.REACT_APP_BASE_URL
const AUTH_TOKEN = localStorage.getItem("token")

const fetchUserChallenges = async( )=> {

	const res = await axios(
		{
			method: 'GET',
			url: `${ BASE_URL }api/challenges/`,
			headers: {
                Authorization: `JWT ${ AUTH_TOKEN  }`
			},
		}
	)
    return res
	}


export default fetchUserChallenges