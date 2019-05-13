const fs = require('fs')
const axios = require('axios')

const fetchJson = (filePath) =>JSON.parse(fs.readFileSync(filePath).toString())

module.exports = async function() {
//const xxx = async function() {
    const conf = await fetchJson('./importer.json')
    const {host, url, fileFullPath} = conf

    try {
       
        const input =  await axios.get(host + url)
        const data = input.data.data
        const date = input.data.date
        console.log('~~~~~~~~1',date,data)         
        if (!data) throw new Error('No Data')
        let count = 1;
        const first = '1       1   '+ date +' '.repeat(10+15+16+6+3+13+13+3+13+5+5+5+5+15) + 'בוקר'
        const lines = data.map(x=> {console.log('___',x);
            return (++count).toString().concat(' '.repeat(8)).slice(0,8) + '2   ' +
                                        ' '.repeat(8) +
                                        x.wo.toString().concat(' '.repeat(10)).slice(0,10) +
                                        ' '.repeat(15) +
                                        x.act.toString().concat(' '.repeat(16)).slice(0,16) +
                                        ' '.repeat(9) +
                                        (x.quant * 1000).toString().concat(' '.repeat(13)).slice(0,13) +
                                        ' '.repeat(91) +
                                        x.id.toString().concat(' '.repeat(13)).slice(0,13)  
                                    })
        const output = first + '\n\r' + lines.join('\n\r')
        console.log('~~~~~~~~2',count,output,fileFullPath,host,url)
        return fs.writeFileSync(fileFullPath,output)
       
    }catch(e){
        console.log(e)
        return 0;
    }

}
//xxx()
