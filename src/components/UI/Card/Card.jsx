import { dateFormat } from "../../../helper"

export default function ({ data }) {
    return (
        <>
            <header>
                <span>Current Weather</span>
                <span>{dateFormat(data.last_updated, { timeStyle: "short" })}</span>
            </header>
            <section>
                <div>
                    <div>
                        <img src={data.condition.icon} alt="alt" />
                        <span>{data.temp_c}&deg;<span className="sub">C</span> </span>
                    </div>
                    <div>{data.condition.text}</div>
                </div>
                <div>
                    <span>Avg Temperature: {data.day.avgtemp_c}&deg;C</span>
                    <span>Avg Humidity: {data.day.avghumidity}%</span>
                    <span>{data.day.maxtemp_c}&deg;C|{data.day.mintemp_c}&deg;C</span>
                </div>
            </section>
            <footer>
                <span>Rain possibility <span className="item">{data.day.daily_chance_of_rain}%</span></span>
                <span>Precipitation <span className="item">{data.day.totalprecip_mm}mm</span></span>
                <span>Maximum Wind <span className="item">{data.day.maxwind_kph}kph</span></span>
                <span>Gust <span className="item">{data.gust_kph}kph</span></span>
                <span>Visibility <span className="item">{data.day.avgvis_km}km</span></span>
                <span>Pressure <span className="item">{data.pressure_mb}mb</span></span>
                <span>UV index <span className="item">{data.day.uv}</span></span>
                <span>Cloud <span className="item">{data.cloud}%</span></span>
            </footer>
        </>
    )
}