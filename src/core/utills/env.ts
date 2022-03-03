import fs from 'fs';
const env = JSON.parse(
    fs.readFileSync(__dirname+'/../../env.json', 'utf8')
);
export default env;