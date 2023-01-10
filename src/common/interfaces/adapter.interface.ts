import { AxiosResponse } from 'axios';

export interface httpAdapter {
    get<T>(url: string): Promise<T> | Promise<AxiosResponse<T> | T>
}