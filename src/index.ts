import { User } from './models/User'

const user = new User({ name: 'new', age: 10 })
// console.log(user)

user.on('save', () => console.log('Data Saved!'))
user.on('err', () => console.log('Err Occured!'))

// user.set({ name: 'New Name' })

user.save()
