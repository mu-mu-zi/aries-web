export interface IResponseData<T> {
    code: number,
    data?: T,
    message: string,
    success: boolean
}
