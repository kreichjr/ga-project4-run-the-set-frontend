import { useState, useEffect } from 'react'

export default function useFetch(url) {
	const [data, setData] = useState(null)
	const [msg, setMsg] = useState(null)
	const [isError, setIsError] = useState(null)
	const [isPending, setIsPending] = useState(true)

	useEffect(async () => {
		const response = await fetch(url)
		const jsonData = await response.json()
		setIsPending(true)
		if (jsonData.status === 400) {
			setIsError(true)
		} else {
			setIsError(false)
		}
		setData(jsonData.data)
		setMsg(jsonData.message)
		setIsPending(false)
	}, [url])

	return {data, msg, isPending, isError}
}