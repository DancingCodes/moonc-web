import dayjs from 'dayjs'
function getTime() {
    const dayList = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']
    const today = dayjs();
    const date = today.format('YYYY年MM月DD日');
    const time = today.format('HH:mm:ss');
    const day = dayList[today.day()];
    return {
        date,
        time,
        day
    }
}
export default getTime