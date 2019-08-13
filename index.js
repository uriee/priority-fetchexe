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
        var count = 1;       
        /*-contruct the work report file-*/

        if (data) {   
            const first = '1\t1\t'+ date 
            
            const reportLines = data.map(x=> {
                console.log(x,x.identifiers)
                const line2 =  [(++count).toString(),'2','', x.wo.toString() ,  x.act.toString() , (x.quant * 1000).toString() ,x.id.toString(),''].join('\t')
                 
                const line3 =  x.identifiers.map(i =>  `${(++count).toString()}\t3\t\t\t\t\t\t${i.name}\t\t\t${i.mac_address}\t\t${i.secondary}\r\n` + 
                                                 i.sons.map(son => {
                                                    if (!son) return ''
                                                    const s = son.split('|')
                                                    const s_serial = s && s[0]
                                                    const s_pn = s && s[1]
                                                    return  `${(++count).toString()}\t4\t\t\t\t\t\t\t${s_pn}\t${s_serial}\r\n`
                                                }).join('')
                ).join('')
                
                                                  
 
                    console.log("----",line2,line3)
            return [line2,line3].join('\r\n')}).join('\r\n')

        const output = first + '\r\n' + reportLines
        fs.writeFileSync(fileFullPath,output)
    }
        return         
       
    }catch(e){
        console.log("--",e)
        return 0;
    }

}
xxx()
