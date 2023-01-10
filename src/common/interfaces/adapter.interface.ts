import { Observable } from 'rxjs';

export interface httpAdapter {
    get<T>(url: string): Promise<T> | Observable<Promise<T>>
}