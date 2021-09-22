import { User } from './models/User'

const user = new User({ name: 'Abhishek', age: 10 })

user.events.on('change', () => console.log('Hi'))

user.events.trigger('change')
