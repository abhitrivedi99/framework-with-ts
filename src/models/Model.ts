/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { AxiosPromise, AxiosResponse } from 'axios'

interface ModelAttributes<T> {
    set(update: T): void
    getAll(): T
    get<K extends keyof T>(key: K): T[K]
}

interface Sync<T> {
    fetch(id: number): AxiosPromise
    save(data: T): AxiosPromise
}

interface Events {
    on(eventName: string, callback: () => void): void
    trigger(eventName: string): void
}

interface HasId {
    id?: number
}

export class Model<T extends HasId> {
    constructor(private attributes: ModelAttributes<T>, private events: Events, private sync: Sync<T>) {}

    on = this.events.on
    trigger = this.events.trigger
    get = this.attributes.get

    set(update: T): void {
        this.attributes.set(update)
        this.events.trigger('change')
    }

    fetch(): void {
        const id = this.attributes.get('id')

        if (typeof id !== 'number') throw new Error('Cannot fetch without id')

        this.sync.fetch(id).then((response: AxiosResponse): void => {
            this.set(response.data)
        })
    }

    save(): void {
        this.sync
            .save(this.attributes.getAll())
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            .then((res: AxiosResponse): void => {
                this.trigger('save')
            })
            .catch(() => {
                this.trigger('error')
            })
    }
}
