import {musicType} from "@/types/music.ts";
import {pagingType} from "@/types/paging.ts";
import {getMusicListApi, getMusicLyricApi} from "@/api/music";
import {useEffect, useRef, useState} from "react";
import {musicLyricType} from "@/types/musicLyric.ts";

const useMusic = () => {
    // 初始化音乐列表
    useEffect(() => {
        // 获取音乐列表
        getMusicListApi(paging.current).then(res => {
            // 更新音乐列表
            musicList.current = res.data.list
            musicListTotal.current = res.data.total

            if (musicList.current.length) {
                // 设置默认当前音乐
                setCurrentMusic(musicList.current[0])
                // 设置当前歌词列表
                setCurrentMusicLyricList(musicList.current[0]!.lyric).then()
                // 为播放器设置音频
                musicAudio.current.src = musicList.current[0]!.url
            }
        })
    }, []);

    // 初始化播放器监听程序
    useEffect(() => {
        // 监听播放器读秒，并设置当前歌词
        musicAudio.current.addEventListener("timeupdate", () => setCurrentMusicForAudioTime());
        // 播放完成后切换下一首歌
        musicAudio.current.addEventListener("ended", () => nextMusic());
    }, []);

    // 播放器
    const musicAudio = useRef(new Audio());
    // 播放起始时间
    const startPlayTime = useRef(0);

    // 播放状态
    const [playState, setPlayState] = useState(false)

    // 音乐列表
    const musicList = useRef<musicType[]>([]);
    // 分页
    const paging = useRef<pagingType>({
        pageNo: 1,
        pageSize: 10
    })
    // 总数
    const musicListTotal = useRef(0)
    // 当前音乐
    const [currentMusic, setCurrentMusic] = useState<musicType>();
    
    
    // 当前音乐歌词列表
    const currentMusicLyricList = useRef<musicLyricType[]>([])
    // 当前音乐歌词
    const [currentMusicLyric, setCurrentMusicLyric] = useState<musicLyricType | null>()
    // 设置当前音乐歌词列表
    const setCurrentMusicLyricList = async (musicLyric: string) => {
        const res = await getMusicLyricApi(musicLyric)
        // 处理歌词,对歌词时间格式化,使其与Audio监听器的时间相对应
        currentMusicLyricList.current = res.toString().trim().split('\n').map(line => {
            const [time, text] = line.split(']');
            const [minutes, seconds] = time.substring(1).split(':').map(parseFloat);
            return {time: minutes * 60 + seconds, text: text.trim()};
        });
    }
    // 设置当前时间展示歌词（——--------------------------——）
    const setCurrentMusicForAudioTime = () => {
        const currentLyric = currentMusicLyricList.current.find((item: musicLyricType, index) => {
            const nextItem = currentMusicLyricList.current[index + 1];
            return item.time <= musicAudio.current.currentTime && (!nextItem || nextItem.time > musicAudio.current.currentTime);
        });

        setCurrentMusicLyric((prevState)=> {
            // 判断是否和上一句歌词是否相同的
            if (prevState?.text === currentLyric?.text) {
                return prevState
            }else {
                return currentLyric
            }
        })
    }

    // 播放音乐
    const playMusic = async (newMusic?:musicType) => {
        // 如果有新的音乐，开始新的播放
        if (newMusic) {
            // 清空残留歌词
            setCurrentMusicLyric(null)
            // 设置当前音乐
            setCurrentMusic(newMusic)
            // 为播放器设置音频
            musicAudio.current.src = newMusic!.url
            // 设置当前歌词列表
            await setCurrentMusicLyricList(newMusic!.lyric)
        }

        setPlayState(true)
        musicAudio.current.play().then()
    }
    // 暂停音乐
    const pauseMusic = () => {
        setPlayState(false)
        startPlayTime.current = musicAudio.current.currentTime
        musicAudio.current.pause()
    }
    // 上一曲
    const preMusic = async () => {
        // 如果音乐列表为空，结束
        if (musicList.current.length === 0) {
            alert('音乐列表是空的')
            return
        }
        // 如果已经是第一个，播放列表最后一个
        let preMusic = null
        if (currentMusic!.id === musicList.current[0].id) {
            preMusic = musicList.current[musicList.current.length - 1]
        } else {
            const preMusicIndex = musicList.current.findIndex(item => item.id === currentMusic!.id) - 1
            preMusic = musicList.current[preMusicIndex]
        }
        // 播放音乐
        await playMusic(preMusic)
    }
    // 下一曲
    const nextMusic = async () => {
        // 如果音乐列表为空，结束
        if (musicList.current.length === 0) {
            alert('音乐列表是空的')
            return
        }
        // 重置播放起始时间
        startPlayTime.current = 0
        // 如果当前音乐已经是音乐列表的最后一个，那么就去获取音乐
        let nextMusic = null
        if (currentMusic!.id === musicList.current[musicList.current.length - 1].id) {
            // 如果音乐列表的数量已经和音乐总数相同，那么就重新播放列表
            if (musicList.current.length === musicListTotal.current) {
                nextMusic = musicList.current[0]
            } else {
                // 获取音乐列表
                paging.current.pageNo++
                const {data} = await getMusicListApi(paging.current)
                // 更新音乐列表
                musicList.current = [...musicList.current, data.list]
                musicListTotal.current = data.total
                nextMusic = musicList.current[data.list[0]]
            }
        } else {
            // 播放下一个音乐
            const nextMusicIndex = musicList.current.findIndex(item => item.id === currentMusic!.id) + 1
            nextMusic = musicList.current[nextMusicIndex]
        }
        // 播放音乐
        await playMusic(nextMusic)
    }

    return {
        playState,
        currentMusic,
        currentMusicLyric,
        playMusic,
        pauseMusic,
        preMusic,
        nextMusic,
    }
}
export default useMusic