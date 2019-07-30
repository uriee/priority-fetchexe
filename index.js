const fs = require('fs')
const axios = require('axios')
var dateFormat = require('dateformat');
var now = new Date();
const fetchJson = (filePath) =>JSON.parse(fs.readFileSync(filePath).toString())

//module.exports = async function() {
const xxx = async function() {
    const conf = await fetchJson('./importer.json')
    const {host, url, fileFullPath} = conf

    try {
       
        const input =  await axios.get(host + url)
        const data = input.data.data
        const date = dateFormat(now, "dd/mm/yy");     
        if (!data) throw new Error('No Data')
        let count = 1;
        const first = '1\t1\t'+ date 
        const reportLines = data.map(x=> {console.log('___',x);
            const line2 =  [(++count).toString(),'2','', x.wo.toString() ,  x.act.toString() , (x.quant * 1000).toString() ,x.id.toString(),''].join('\t')
            const line3 =  x.identifiers.map(i =>  [(++count).toString(),'3', '','' , '' , '' , '' , i.name].join('\t')).join('\n')
            return [line2,line3].join('\n')}).join('\n')
        const output = first + '\n' + reportLines
        return fs.writeFileSync(fileFullPath,output)
       
    }catch(e){
        console.log(e)
        return 0;
    }

}
xxx()
