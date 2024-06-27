import request from '@/utils/request'
import {pagingType} from "@/types/paging.ts";

// 网易云提供的获取随机免费歌曲
// export const getRandMusic = () => request.get("https://api.uomg.com/api/rand.music?format=json");

export const getMusicListApi = (data:pagingType) =>request.post('/getMusicList',data)

export const getMusicLyricApi = (lyricUrl:string) =>request.get(`/getMusicLyric?lyricUrl=${lyricUrl}`)
