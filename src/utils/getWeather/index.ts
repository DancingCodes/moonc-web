import request from "@/utils/request";
import getAddress from "@/utils/getAddres";

export interface IWeather {
    city: string,
    weather: string,
    temperature: string,
    winddirection: string,
    windpower: string
}

async function getWeather() {
    const address = await getAddress()
    const weather: { lives: IWeather[] } = await request.get(`https://restapi.amap.com/v3/weather/weatherInfo?key=1487b4a88590a64de684333776633332&city=${address.adcode}`);
    return weather.lives[0]
}

export default getWeather;
