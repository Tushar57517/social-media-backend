import crypto from 'crypto'

console.log(`Your JWT Secret for testing is: ${crypto.randomBytes(32).toString('hex')}`)