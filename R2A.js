const path = require('path');
const fs = require('fs');
const config = require('./config.js');
let run_path = config[process.argv[2]];
let files = fs.readdirSync(run_path);
try{
    files.forEach(file => {
        let html = fs.readFileSync(path.resolve(run_path, file), 'utf-8');
        html = html.replace(/<link([^>]*)href="\.\.([\w\W]+?)"/g, '<link$1href="$2"');
        html = html.replace(/<script([^>]*)src="\.\.([\w\W]+?)"/g, '<script$1src="$2"');
        html = html.replace(/<img([^>]*)src="\.\.([\w\W]+?)"/g, '<img$1src="$2"');
        console.log(html);
        fs.writeFileSync(path.resolve(run_path, file), html, 'utf-8');
    })
}catch(err){
    console.log(err);
}
