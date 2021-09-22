/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import axios, { AxiosResponse } from 'axios'
import { Eventing } from './Eventing'

export class Collection<T, K> {
    models: T[] = []
    events: Eventing = new Eventing()

    constructor(public rootUrl: string, public deserialize: (json: K) => T) {}

    get on() {
        return this.events.on
    }

    get trigger() {
        return this.events.trigger
    }

    fetch(): void {
        axios.get(this.rootUrl).then((res: AxiosResponse) => {
            res.data.forEach((element: K): void => {
                this.models.push(this.deserialize(element))
            })
        })

        this.trigger('change')
    }
}
