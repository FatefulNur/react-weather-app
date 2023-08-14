import { useContext, useEffect } from "react"
import useSWR from "swr"
import { getHourlyForecastApi } from "../../api/weathesApi"
import CurrentWeather from "../../containers/CurrentWeather/CurrentWeather"
import Forecast from "../../containers/ForeCast/Forecast"
import { FilterContext } from "../../context/filterContext"

export default function Weathers() {
    const { current, state, locationFilter } = useContext(FilterContext)
	const forecast = useSWR(() => locationFilter ? locationFilter : "bangladesh", getHourlyForecastApi)

    useEffect(() => {
        forecast.mutate()
    }, [locationFilter])

    let forecastOutput = null

    if(current.data && forecast.data) {
        forecastOutput = <Forecast forecast={forecast} />
        if(state.isLoading) {
            forecastOutput = null
        } else if(state.error) {
            forecastOutput = null
        }
    }

    return (
        <div className="Weathers">
            <CurrentWeather />
           {forecastOutput}
        </div>
    )
}