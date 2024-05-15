import { Forecast, WeatherRequest, geoDirect } from "./interfaces";

const ApiKey = "ab3ce49fefd88f7d1913f3272bb48a09"
const CoordsCache: {[city: string]: {lat: number, lon: number}} = {}

async function AskApi(url: string, args: {[index: string]: Number | string}) {
    var packed = "";

    for (let i in args) {
        packed += i + "=" + args[i] + '&';
    }

    let Out;

    try {
        const request = await fetch(`${url}?${packed}appid=${ApiKey}`)
        if (request.ok) {
            Out = await request.json();
        } else {
            throw new Error(request.statusText);
        }
    } catch (error) {
        console.warn("Request error: " + error);
        Out = undefined;
    }

    return Out;
}

async function GetCityCoords(city: string) {
    if (CoordsCache[city]) {
        return CoordsCache[city];
    }

    const reqGet: geoDirect[] = await AskApi("http://api.openweathermap.org/geo/1.0/direct", { q: city, limit: 1 });
    
    if (reqGet && reqGet.length > 0) {
        const getCoords = reqGet[0];
        const PackCord = {lat: getCoords.lat, lon: getCoords.lon}

        CoordsCache[city] = PackCord;

        return PackCord
    }
}

async function WeatherData(lat: number, lon: number) {
    const reqGet: WeatherRequest = await AskApi("http://api.openweathermap.org/data/2.5/weather", { lat: lat, lon: lon, units: "metric", lang: "pl" });
    
    return reqGet;
}

export async function GetWeather(cityName: string) {
    const coords = await GetCityCoords(cityName);

    if (coords) {
        return WeatherData(coords.lat, coords.lon);
    }
}
    
export async function GetForecast(cityName: string): Promise<Forecast | undefined> {
    const coords = await GetCityCoords(cityName);

    if (coords) {
        return AskApi("http://api.openweathermap.org/data/2.5/forecast", { lat: coords.lat, lon: coords.lon, units: "metric", lang: "pl" });
    }
}



export async function Sleep(Seconds: number) {
    return new Promise(resolve => setTimeout(resolve, Seconds * 1000));
}