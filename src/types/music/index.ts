export interface IMusic {
    id: string,
    name: string,
    url: string,
    author: Array<{
        id: number,
        name: string
    }>,
    duration: number,
    album: {
        id: number,
        name: string,
        picUrl: string
    },
    lyric: string,
}