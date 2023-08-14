import { useContext } from "react"
import { dateFormat, hasAmPm, splitHour } from "../../../helper"
import { FilterContext } from "../../../context/filterContext"

export default function ForecastHour({ hourData }) {
    const { state, current } = useContext(FilterContext)

    const localtime = splitHour(state.data?.location.localtime ?? current.data.location.localtime)
    const fcTime = splitHour(hourData.time)

    let scale = 0.9
    let shadow = ""

    if (
        localtime === fcTime &&
        hasAmPm(state.data?.location.localtime ?? current.data.location.localtime, hourData.time)
    ) {
        scale = 1
        shadow = "0 0 5px 0 rgb(0 0 0)"
    }

    const style = {
        background: `var(${hourData.is_day ? '--fc-bg-day' : '--fc-bg-night'})`,
        color: `${hourData.is_day ? '#444' : '#eee'}`,
        transform: `scale(${scale})`,
        boxShadow: shadow
    }

    return (
        <div style={style}>
            <img src={hourData.condition.icon} alt="rain" />
            <span>{hourData.temp_c}&deg;C|{hourData.temp_f}&deg;F</span>
            <span>{dateFormat(hourData.time, { timeStyle: "short" })}</span>
        </div>
    )
}