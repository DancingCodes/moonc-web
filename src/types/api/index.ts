export interface IApiResponse<T> {
    code: number;
    message: string;
    data: T;
}