import axios from "axios"

const axiosCurrent = axios.create({
    baseURL: 'http://api.weatherapi.com/v1'
})

const apiKey = '72d9ad9513ad4873afd94955231506'

export let current = '/current.json?key='+ apiKey +'&q='
export let astro = '/astronomy.json?key='+ apiKey +'&q='

export function getCurrentApi(url) {
    return getDataByGeolocation(url)
}

export function getAstroApi(url) {
    return getDataByGeolocation(url)
}

export async function getCurrentByLocationName(state) {
    try {
        const res = await axiosCurrent.get('/current.json?key='+ apiKey +'&q=' + state)
        return res.data
    } catch (error) {
        throw new Error(error.message)
    }
}

export async function getHourlyForecastApi(state) {
    try {
        const res = await axiosCurrent.get(`/forecast.json?key=${apiKey}&day=3&q=${state}`)
        return res.data
    } catch (error) {
        throw new Error(error.message)
    }
}

function getDataByGeolocation(apiEndpoint) {
    return new Promise((resolve, reject) => {
        if(navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (pos) => {
                    const lat = pos.coords.latitude;
                    const lon = pos.coords.longitude;
                    if (lat && lon) {
                        axiosCurrent.get(apiEndpoint + [lat, lon].join(","))
                            .then((res) => resolve(res.data))
                            .catch((error) => reject(error));
                    }
                },
                (err) => {
                    console.error(`${err.code}: ${err.message}`);
                    reject(err);
                }
            );
        }
    });
}