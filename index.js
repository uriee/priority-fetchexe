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
        const first = '1\t 1\t'+ date 
        const reportLines = data.map(x=> {console.log('___',x);
            return (++count).toString() + '\t2\t' +
                                        x.wo.toString() +
                                        '\t' +
                                        x.act.toString() +
                                        '\t' +
                                        (x.quant * 1000).toString() +
                                        '\t' +
                                        x.id.toString() + 
                                        '\n\r' +
                                        (x.identifiers ? x.identifiers.map(iden => (++count).toString() + '\t3\t' +iden.name + '\n\r')  : '').toString().replace(/,/g, '')
                                    })
        const output = first + '\n\r' + reportLines
        return fs.writeFileSync(fileFullPath,output)
       
    }catch(e){
        console.log(e)
        return 0;
    }

}
xxx()
