export class Response<T> {
    status: string;
    code: number;
    message: string;
    params: T;
}
