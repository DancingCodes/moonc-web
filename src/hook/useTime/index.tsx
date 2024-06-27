import {useEffect, useState} from "react";
import moment from 'moment'

const useTime = () => {
    const [date, setDate] = useState<string>()
    const [time, setTime] = useState<string>()

    useEffect(() => {
        const dayList = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']
        // 格式化时间
        const updateDateTime = () => {
            const currentDate = moment();
            // 设置日期
            setDate(`${currentDate.format('YYYY 年 MM 月 DD 日')} ${dayList[currentDate.day()]}`);
            // 设置时间
            setTime(currentDate.format('HH:mm:ss'));
        };
        // 初始更新
        updateDateTime()
        // 每秒更新一次
        const intervalId = setInterval(updateDateTime, 1000)
        // 清除定时器
        return () => {
            clearInterval(intervalId);
        };
    }, [])
    return {
        date,
        time
    }
}
export default useTime