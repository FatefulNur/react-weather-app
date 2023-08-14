import { useState } from "react"
import useSWR from "swr"
import {
	current as currentCache,
	getCurrentApi,
	getCurrentByLocationName
} from "./api/weathesApi"
import Weathers from "./components/Weathers/Weathers"
import { FilterContext } from "./context/filterContext"


function App() {
	const [locationFilter, setLocationFilter] = useState("")
	const current = useSWR(currentCache, getCurrentApi)
	const state = useSWR(() => locationFilter ? locationFilter : null, getCurrentByLocationName)

	const {
		data,
		isLoading,
		error
	} = current

	const {
		data: stateData,
		error: stateError
	} = state

	let bg = ""
	let loading = ""

	if (isLoading) {
		bg = ""
		loading = "loading"
	} else if (error || stateError) {
		bg = "--bg-error"
		loading = ""
	} else if ((stateData && stateData.current.is_day)) {
		bg = "--bg-day"
		loading = ""
	} else if ((!stateData) && (data && data.current.is_day)) {
		bg = "--bg-day"
		loading = ""
	} else {
		bg = "--bg-night"
		loading = ""
	}

	return (
		<FilterContext.Provider
			value={{
				locationFilter: locationFilter,
				setLocationFilter: setLocationFilter,
				state: state,
				current: current
			}}>
			<div className={"Wrapper " + loading} style={{ background: `var(${bg})` }}>
				<Weathers />
			</div>
		</FilterContext.Provider>
	)
}

export default App
