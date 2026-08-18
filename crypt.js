import * as crypto from 'crypto';
import * as bcrypt from 'bcrypt';

const password = 'revou2026';
const hash = crypto.createHash('sha256').update(password).digest('hex');

console.log('Regular Hashing');
console.log({password});
console.log({hash});

async function demo() {
    const saltRounds = 10;

    const passwordHash = await bcrypt.hash(password, saltRounds);
    console.log('Bcrypt Hashing');
    console.log({passwordHash});

    const isMatch = await bcrypt.compare(password, passwordHash);
    console.log('Password Match?');
    console.log({isMatch});
}

demo();