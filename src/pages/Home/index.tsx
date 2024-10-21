import "@/pages/Home/style/index.scss"
import bg from '@/assets/video/bg.mp4'
import filings from "@/assets/image/filings.png"
import github from '@/assets/image/home/github.png'
import wechat from '@/assets/image/home/wechat.png'
import { useEffect, useState } from "react";
import getWeather, { IWeather } from "@/utils/getWeather";
import getTime from "@/utils/getTime"

let weather: IWeather | null = null
getWeather().then(res => weather = res)

const webList: {
    name: string,
    url: string
}[] = [{
    name: "音乐播放器",
    url: "https://music.moonc.love"
}, {
    name: "图床",
    url: "https://filepost.moonc.love"
}]
const Home = () => {
    const [dataTime, setDataTime] = useState(getTime())

    useEffect(() => {
        const interval = setInterval(() => {
            setDataTime(getTime());
        }, 1000);
        return () => clearInterval(interval);
    }, []);



    return (
        <div className={"Home"}>
            <video src={bg} className="bg" autoPlay muted loop></video>
            <div className="content">
                <div className="bodyer">
                    <div className="bodyLeft">
                        <div className="netName">moonc.love</div>
                        <div className="introduce">车轻马慢，静听溪水潺潺</div>
                        <div className="contact">
                            <img src={github} onClick={() => window.open('https://github.com/DancingCodes', "_blank")} />
                            <img src={wechat} />
                        </div>
                    </div>
                    <div className="bodyRight">
                        <div className="tools">
                            <div className="timeTool">
                                <div>{dataTime.date} {dataTime.day}</div>
                                <div className="timeText">{dataTime.time}</div>
                                {
                                    weather ?
                                        (<div>{weather.city} {weather.weather} {weather.temperature}°C {weather.winddirection}风 {weather.windpower} 级</div>)
                                        :
                                        ''
                                }

                            </div>
                        </div>
                        <div className="subsite">
                            <div className="siteTitle">
                                子系网站
                            </div>
                            <div className="siteList">
                                {webList.map(item => {
                                    return (
                                        <div key={item.name}
                                            onClick={() => window.open(item.url)}>
                                            {item.name}
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="footer">
                    <a href="https://beian.mps.gov.cn/#/query/webSearch?code=37010202700167"
                        rel="noreferrer" target="_blank">
                        <img src={filings} alt="filings" />
                        鲁公网安备37010202700167
                    </a>
                    -
                    <a href="https://beian.miit.gov.cn/"
                        target="_blank">鲁ICP备2024059990号</a>
                </div>
            </div>
        </div>
    );
}

export default Home
