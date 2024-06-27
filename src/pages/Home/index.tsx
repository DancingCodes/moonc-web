import "@/pages/Home/style/index.scss"
import {Modal} from 'antd';
import {address} from "@/utils/getAddres";
import {weather} from "@/utils/getWeather";
import useTime from "@/hook/useTime";
import useMusic from "@/hook/useMusic";

import filings from "@/assets/image/filings.png"
import github from '@/assets/image/home/github.png'
import wechat from '@/assets/image/home/wechat.png'
import mychat from '@/assets/image/home/mychat.jpg'
import {CaretRightOutlined, PauseOutlined, StepBackwardOutlined, StepForwardOutlined} from "@ant-design/icons";

import {useState} from "react";

const Home = () => {
    const {date, time} = useTime()

    const {
        playState, currentMusic, currentMusicLyric, playMusic, pauseMusic, preMusic, nextMusic
    } = useMusic()


    const webList: {
        name: string,
        url: string
    }[] = [{
        name: "图床",
        url: "https://filepost.moonc.love"
    }]

    // 弹窗开关
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <div className={"Home"}>
            <div className={"header"}>
                <div className={"musicLyric"}>{currentMusicLyric?.text}</div>
            </div>
            <div className={"bodyer"}>
                <div className={"center-one"}>
                <div className={"title"}>
                        Moonc.love
                    </div>
                    <div className={"introduce card"}>
                        <div>车轻马慢，静听溪水潺潺</div>
                    </div>
                    <div className={"contact"}>
                        <img src={github} alt="github logo"
                             onClick={() => window.open('https://github.com/DancingCodes', "_blank")}/>
                        <img src={wechat} alt="wechat logo" onClick={() => setIsModalOpen(true)}/>
                    </div>
                </div>
                <div className={"center-two"}>
                    <div className={"tools"}>
                        <div className={"timeTool card"}>
                            <div className={"dateInfo"}>{date}</div>
                            <div className={"timeInfo"}>{time}</div>
                            <div
                                className={"addressInfo"}>{address.city} {weather.weather} {weather.temperature}°C {weather.winddirection}风 {weather.windpower} 级
                            </div>
                        </div>
                        <div className={"musicTool card"}>
                            <div className={"musicIcons"}>
                                <StepBackwardOutlined className={"Icon"} onClick={preMusic}/>
                                {
                                    playState ?
                                        <PauseOutlined className={"Icon"} onClick={pauseMusic}/>
                                        :
                                        <CaretRightOutlined className={"Icon"} onClick={() => playMusic()}/>
                                }
                                <StepForwardOutlined className={"Icon"} onClick={nextMusic}/>
                            </div>
                            <div className={"musicInfo"}>{currentMusic?.name}</div>
                            <div
                                className={"musicAuthorInfo"}>{currentMusic?.singer.map(item => item.name).join('/')}</div>
                            <div className={"musicLyric"}>{currentMusicLyric?.text}</div>
                        </div>
                    </div>
                    <div className={"subsite"}>
                        <div className={"subsiteTitle"}>
                            子系网站
                        </div>
                        <div className={"subsiteTitleList"}>
                            {webList.map(item => {
                                return (
                                    <div key={item.name} className={"center-right-bottom-main-item card"}
                                         onClick={() => window.open(item.url)}>
                                        {item.name}
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </div>
            <div className={"footer"}>
                <a href="https://beian.mps.gov.cn/#/query/webSearch?code=37010202700167"
                   rel="noreferrer" target="_blank">
                    <img src={filings} alt="filings"/>
                    鲁公网安备37010202700167
                </a>
                -
                <a href="https://beian.miit.gov.cn/"
                   target="_blank">鲁ICP备2024059990号</a>
            </div>
            <Modal open={isModalOpen} footer={null} closeIcon={false} onCancel={() => setIsModalOpen(false)}
                   getContainer={false} wrapClassName={"homeModal"}>
                <img src={mychat} alt="mychat" className={"mychat"}/>
            </Modal>
        </div>
    );
}

export default Home
