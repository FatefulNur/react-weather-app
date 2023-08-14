import Loader from "../../components/UI/Loader/Loader"
import ForecastDay from "./ForecastDay/ForecastDay"

export default function Forecast({ forecast }) {
    const { data, isLoading, error } = forecast

    let output = ""
    if(isLoading) {
        output = <Loader />
    } else if(error) {
        output = "Error Fetching Data..."
    } else {
        output = (
            data.forecast?.forecastday.map(fcstDay => (
                <ForecastDay key={fcstDay.date_epoch} dayData={fcstDay} current={data.current} />
            ))
        )
    }

    return (
        <div className="Forecast">
            {output}
        </div>
    )
}