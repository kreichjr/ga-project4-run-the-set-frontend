import { useState, useEffect } from 'react'

export default function useFetch(url, options={}) {
	const [data, setData] = useState(null)
	const [msg, setMsg] = useState(null)
	const [isError, setIsError] = useState(null)
	const [isPending, setIsPending] = useState(true)

	useEffect(() => {
		async function fetchMe() {
			const response = await fetch(url, options)
			const jsonData = await response.json()
			if (jsonData.status === 400) {
				setIsError(true)
			} else {
				setIsError(false)
			}
			setData(jsonData.data)
			setMsg(jsonData.message)
			setIsPending(false)
		}
		fetchMe()
	}, [url])

	return {
		data, setData,
		msg, setMsg,
		isPending, 
		isError
	}
}