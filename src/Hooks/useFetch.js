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

	const urlWithFilters = (url, filters) => {
		if (Object.keys(filters) === 0 || filters.player === 0) {
			return [`${url}/`, false]
		}

		const queries = []

		if (filters?.char) {
			queries.push(`char=${filters.char}`)
		}
		if (filters?.opponent) {
			queries.push(`opponent=${filters.opponent}`)
		}

		let finalUrl = `${url}/filter/${filters.player}`
		let queryStr = queries.join('&')

		if (queryStr) {
			return [`${finalUrl}?${queryStr}`, true]
		}

		return [finalUrl, true]
	}	

	const updateFetch = (url, filters) => {
		setIsPending(true)
		const [newUrl, filtered] = urlWithFilters(url, filters)
		console.log(newUrl)
		async function fetchMe() {
			const response = await fetch(newUrl)
			const jsonData = await response.json()
			if (jsonData === 400) {
				setIsError(true)
			} else {
				setIsError(false)
			}
			
			if (filtered) {
				setData(jsonData.data.matches)
			} else {
				setData(jsonData.data)	
			}
			
			setMsg(jsonData.message)
			setIsPending(false)
		}
		fetchMe()
	}

	return {
		data, setData,
		msg, setMsg,
		isPending, 
		isError,
		updateFetch
	}
}