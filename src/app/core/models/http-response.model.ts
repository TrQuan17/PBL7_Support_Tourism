export interface HttpResponse<T> {
    status: 'SUCCESS' | 'FAILED',
    data: T[] | T
}