process.env.NODE_ENV = 'test';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const dotenv = require('dotenv');

dotenv.config({ path: '.env.test' });
dotenv.config({ path: '.env' });

