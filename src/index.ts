import { User } from './models/User'

const user = new User({ name: 'Abhi', age: 31 })

console.log(user.get('name'))
console.log(user.get('age'))

user.set({ name: 'Hardik' })

console.log(user.get('name'))
console.log(user.get('age'))
