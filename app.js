const http=require('http');
const fs=require('fs')
const server=http.createServer((req,res)=>{
    //console.log("Bichchuran")
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

    

    
    // if(url ==='/about')
    // {
    //     res.write('<html>')
    //     res.write('<head><title>My first page</title></head')
    //     res.write('<body>Welcome to About Us page</body>')
    //     res.write('</html>')
    //     return res.end()
    // }
    // if(url==='/node')
    // {
    //     res.write('<html>')
    //     res.write('<head><title>My first page</title></head')
    //     res.write('<body>Welcome to my Node Js project</body>')
    //     res.write('</html>')
    //     return res.end()
    // }


    // res.setHeader('Content-Type','text/html')
    // res.write('<html>')
    // res.write('<head><title>My first page</title></head')
    // res.write('<body>Hello and welcome everyone</body>')
    // res.write('</html>')
    // res.end()
})

server.listen(4000)