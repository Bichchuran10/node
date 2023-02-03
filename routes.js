const fs=require('fs');

const requestHandler=(req,res)=>{

    const url=req.url
    const method=req.method

    if(url ==='/home')
    {
        fs.readFile('home.txt',{encoding:'utf-8'},(err,data)=>{
            if(err){
                console.log(err)
            }
        console.log('data from file'+data)
        res.write('<html>')
        res.write('<head><title>My first page</title></head')
        res.write(`<body><h1>${data}</h1>`)
        res.write('<form action="/message" method="POST"><input type="text" name="message"><button type="submit">Send</button></form></body>')
        res.write('</html>')
        return res.end()  
        })
    }

    if(url==='/message' && method==="POST")
    {
        const body=[]
        req.on('data',(chunk)=>{
            console.log(chunk)
            body.push(chunk)

        })

        return req.on('end',()=>{
            const parseBody=Buffer.concat(body).toString()
            const message=parseBody.split("=")[1]
            console.log(parseBody)
            fs.writeFile('home.txt',message,err=>{
                if(err){
                    console.log(err)
                }
                console.log('indise fs.writeFile')
                res.statusCode=302
                res.setHeader('Location','/home')
                //res.writeHead()
                return res.end()
            })
        })
        
    }

}

exports.handler=requestHandler
exports.someText="Hello I am Bichchuran"