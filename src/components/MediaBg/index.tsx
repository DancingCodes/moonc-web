import './index.scss'
import {useRef} from "react";
import isMobileDevice from "@/utils/getIsMobileDevice";


const MediaBg = () => {
    // 视频
    const videoUrl: string = "https://filepostapi.moonc.love/images/392477e7-3363-4010-9615-305e4657949c.mp4";
    const videoRef = useRef<HTMLVideoElement>(null);

    // 图片
    const imageUrl: string = "https://filepostapi.moonc.love/images/775afe80-fb32-4aad-84a1-2fa2a6f964c1.jpg"
    const imageRef = useRef<HTMLImageElement>(null);

    // Loading
    const loadingRef = useRef<HTMLDivElement>(null);

    // 图片加载完成显示图片，用于优化图片开始时的闪烁问题
    const imageOnLoad = () => {
        imageRef.current!.style.opacity = '1';
        loadingRef.current!.style.display = 'none';
    }

    // 视频可以开始播放了，用于优化视频开始时的黑屏状态
    const videoOnCanPlay = () => {
        videoRef.current!.style.opacity = '1';
        videoRef.current!.play().then()
        loadingRef.current!.style.display = 'none';
    }

    return (
        <div className={"MediaBg"}>
            {
                isMobileDevice ?
                    <img className={"imageBg"} ref={imageRef} src={imageUrl} alt="imageBg" onLoad={imageOnLoad}/>
                    :
                    <video className={"videoBg"} ref={videoRef} src={videoUrl} muted loop
                           onCanPlay={videoOnCanPlay}></video>
            }
            <div className={"loadingBg"} ref={loadingRef}>
                {/*模拟心跳Loading*/}
                <div className={"heart"}></div>
            </div>
        </div>
    )
}
export default MediaBg