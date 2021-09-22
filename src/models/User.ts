/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Eventing } from './Eventing'
import { Sync } from './Sync'
import { Attributes } from './Attributes'
import { AxiosResponse } from 'axios'

export interface UserProps {
    id?: number
    name?: string
    age?: number
}

const rootUrl = 'http://localhost:3000/users'
export class User {
    public events: Eventing = new Eventing()
    public sync: Sync<UserProps> = new Sync<UserProps>(rootUrl)
    public attributes: Attributes<UserProps>

    constructor(attrs: UserProps) {
        this.attributes = new Attributes<UserProps>(attrs)
    }

    get on() {
        return this.events.on
    }

    get trigger() {
        return this.events.trigger
    }

    get get() {
        return this.attributes.get
    }

    set(update: UserProps): void {
        this.attributes.set(update)
        this.events.trigger('change')
    }

    fetch(): void {
        const id = this.attributes.get('id')

        if (typeof id !== 'number') throw new Error('Cannot fetch without id')

        this.sync.fetch(id).then((response: AxiosResponse): void => {
            this.attributes.set(response.data)
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
