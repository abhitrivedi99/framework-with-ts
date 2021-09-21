interface UserProps {
    name?: string
    age?: number
}

type Callback = () => void

export class User {
    events: { [key: string]: Callback[] } = {}

    constructor(private data: UserProps) {}

    get = (props: keyof UserProps): number | string | undefined => {
        return this.data[props]
    }

    set = (update: UserProps): void => {
        Object.assign(this.data, update)
    }

    on = (eventName: string, callback: Callback): void => {
        const handlers = this.events[eventName] || []
        handlers.push(callback)
        this.events[eventName] = handlers
    }
}
