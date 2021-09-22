import { User } from './models/User'

const user = User.buildUser({ id: 3 })
// console.log(user)

user.on('change', () => console.log(user))
// user.on('save', () => console.log('Data Saved!'))

// user.set({ name: 'New Name' })

user.fetch()
