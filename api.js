const express = require("express")
const app = express()
const bodyP =  require("body-parser")
const path = require('path');

app.use(bodyP.json())
const compiler = require("compilex")
const options={ stats: true}

compiler.init(options)


app.use("/codemirror-5.65.13", express.static(path.join(__dirname, "./codemirror-5.65.13")))
app.get("/", function(req, res){
    

    compiler.flush( function() {
        console.log("Context Deleted");
    })
    res.sendFile(path.join(__dirname,"./editor.html"));
})

app.post("/compile", function(req, res){
   
        let code = req.body.code
        let input = req.body.input
        let lang = req.body.lang

        console.log("I hit" + lang)

        
        try{
            if(lang == 'python'){
                if(input){
                    var envData = { OS : "windows"}; 
                    compiler.compilePythonWithInput( envData , code , input ,  function(data){
                        if(data.output){
                            res.send(data)
                        }else{
                             
                            const error  = data.error;
                            const err = error.split(',');
                            err[0] = '';
                            res.json({
                                error: err.join('')
                            })
                        }        
                    });
                }else{
                    var envData = { OS : "windows"}; 
                    compiler.compilePython( envData , code , function(data){
                        console.log('Error',JSON.stringify(data,null,4));
                        if(data.output){
                            res.json(data)
                        }else{
                            const error  = data.error;
                            const err = error.split(',');
                            err[0] = '';
                            res.json({
                                error: err.join('')
                            })
                        }
                    });
                }
            }else if(lang == 'java'){

                if(input){

                    var envData = { OS : "windows"}; 
                   
                    compiler.compileJavaWithInput( envData , code , input ,  function(data){
                        if(data.output){
                            res.send(data)
                        }else{
                            const error  = data.error;
                            res.json({
                                error: error
                            })
                        }        
                    });

                }else{

                    var envData = { OS : "windows"}; 
                    compiler.compileJava( envData , code , function(data){
                        if(data.output){
                            res.send(data)
                        }else{
                            const error  = data.error;
                            res.json({
                                error: error
                            })
                        }
                    });
                }
            }else if(lang == 'cpp'){ // c++ compiler 
                console.log('I am here in cpp')
                if(input){

                    console.log("I hit cpp")
                    var envData = { OS : "windows",  cmd : "g++", options: {timeout: 10000}}; 
                   
                    compiler.compileCppWithInput( envData , code , input ,  function(data){
                        if(data.output){
                            res.send(data)
                        }else{
                           res.send(data.error)
                        }       
                    });

                }else{

                    var envData = { OS : "windows" , cmd : "g++", options: {timeout: 10000}}; 
                    compiler.compileCpp( envData , code , function(data){
                        if(data.output){
                            res.send(data)
                        }else{
                            res.send(data.error)

                        }
                    });
                }
            }
    
        }
        catch(error){
           res.send("Unexpected Error")
        }
 
         
})

app.listen(8000,'localhost',()=>{
    console.log("Server is running");
})

