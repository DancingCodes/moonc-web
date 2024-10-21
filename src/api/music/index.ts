import request from "@/utils/request";
import { IApiResponse } from "@/types/api";
import { IMusic } from "@/types/music";


export interface ISearchMusicParams {
    name?: string;
    pageNo?: number;
    pageSize?: number;
}

interface ISearchMusicResponse {
    total: number;
    list: IMusic[]
}


export const searchMusic = (params?: ISearchMusicParams): Promise<IApiResponse<ISearchMusicResponse>> => request.get('/music/searchMusic', { params })