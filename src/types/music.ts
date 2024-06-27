export type musicType = {
    id: string;
    lyric: string;
    name: string;
    singer: {
        id: string,
        name: string
    }[];
    url: string;
}