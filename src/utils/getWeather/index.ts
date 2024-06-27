import request from "@/utils/request";
import {address} from "@/utils/getAddres";

const getWeather = async () => {
    type weatherType = {
        lives: {
            weather: string,
            temperature: string,
            winddirection: string,
            windpower: string
        }[],
    }
    const weather:weatherType = await request.get(`https://restapi.amap.com/v3/weather/weatherInfo?key=1487b4a88590a64de684333776633332&city=${address.adcode}`);
    return weather.lives[0]
}

export const weather= await getWeather()