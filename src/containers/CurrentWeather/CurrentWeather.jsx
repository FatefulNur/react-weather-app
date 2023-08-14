import { faLocationCrosshairs } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useContext, useRef, useState } from "react"
import Button from "../../components/UI/Button/Button"
import Input from "../../components/UI/Input/Input"
import Loader from "../../components/UI/Loader/Loader"
import { FilterContext } from "../../context/filterContext"
import { dateFormat } from "../../helper"

export default function CurrentWeather() {
    const [isCelcius, setIsCelcius] = useState(true)
    const filterRef = useRef(null)
    const { locationFilter, setLocationFilter, state, current } = useContext(FilterContext)

    const handleLocationClick = async () => {
        if (filterRef.current) {
            const location = null
            setLocationFilter(location)
            filterRef.current.value = location
            await current.mutate()
        }
    }

    const filterStateHandler = (event) => {
        if (event.key === "Enter") {
            setLocationFilter(event.target.value)
            state.mutate()
        }
    }

    let output = null
    let weather = null

    let icon = null
    let temp = null
    let last_updated = null
    let condition = null
    let tz = null
    let name = null
    let country = null
    let feels = null
    let cloud = null
    let humid = null
    let wind_dir = null
    let wind_spd = null
    let uv_index = null

    if (state.isLoading || current.isLoading) {
        output = <Loader />
    } else if (state.error || current.error) {
        output = "error data fetching..."
    } else {
        weather = state.data || current.data
        icon = weather.current.condition.icon
        temp = isCelcius ? weather.current.temp_c : weather.current.temp_f
        last_updated = dateFormat(weather.current.last_updated, { timeStyle: "short" })
        condition = weather.current.condition.text
        tz = weather.location.tz_id
        name = weather.location.name
        country = weather.location.country
        feels = isCelcius ? weather.current.feelslike_c : weather.current.feelslike_f
        cloud = weather.current.cloud
        humid = weather.current.humidity
        wind_dir = weather.current.wind_degree
        wind_spd = weather.current.wind_kph
        uv_index = weather.current.uv

        output = (
            <>
                <section>
                    <div className="left">
                        <img src={icon} alt="Cloudy" />
                        <div>
                            <h3>{temp}&deg;<span className="sub">{isCelcius ? "C" : "F"}</span></h3>
                            <span>{last_updated}</span>
                        </div>
                    </div>
                    <div className="right">
                        <div className="condition">
                            <h3>Cloud Condition</h3>
                            <h2>{condition}</h2>
                        </div>
                        <div className="tz">{tz}</div>
                        <div className="state">{name}, {country}</div>
                    </div>
                </section>
                <footer>
                    <div>Feels Like <span>{feels}&deg;{isCelcius ? "C" : "F"}</span></div>
                    <div>Cloud Coverage <span>{cloud}<span>%</span></span></div>
                    <div>Humidity <span>{humid}<span>%</span></span></div>
                    <div>Wind Direction <span>{wind_dir}&deg;</span></div>
                    <div>Wind Speed <span>{wind_spd}<span>kph</span></span></div>
                    <div>UV Index <span>{uv_index}</span></div>
                </footer>
            </>
        )
    }

    return (
        <div className="CurrentWeather">
            <header>
                <Input
                    ref={filterRef}
                    type="text"
                    className="ButtonSc"
                    onKeyPress={filterStateHandler}
                    placeholder="Filter by location" />
                <Button className={`ButtonIc ${locationFilter ? '' : 'grey'}`} onClick={handleLocationClick}>
                    <FontAwesomeIcon icon={faLocationCrosshairs} />
                </Button>
                <span className="CF">
                    <Button onClick={() => setIsCelcius(true)} className={`C ${isCelcius && 'active'}`}>C</Button>
                    <Button onClick={() => setIsCelcius(false)} className={`F ${!isCelcius && 'active'}`}>F</Button>
                </span>
            </header>
            {output && output}
        </div>
    )
}