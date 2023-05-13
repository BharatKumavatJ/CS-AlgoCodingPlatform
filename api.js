const express = require("express")
const app = express()
const bodyP =  require("body-parser")

app.use(bodyP.json())
const compiler = require("compilex")
const options={ stats: true}

compiler.init(options)


app.use("/codemirror-5.65.13", express.static("C:/Users/HP/Desktop/FreeEducation.com/codemirror-5.65.13"))
app.get("/", function(req, res){
    

    compiler.flush( function() {
        console.log("Context Deleted");
    })
    res.sendFile("C:/Users/HP/Desktop/FreeEducation.com/editor.html")

})

app.post("/compile", function(req, res){
   
        let code = req.body.code
        let input = req.body.input
        let lang = req.body.lang

        
        try{
            if(lang == 'python'){
                if(input){
                    var envData = { OS : "windows"}; 
                    compiler.compilePythonWithInput( envData , code , input ,  function(data){
                        if(data.output){
                            res.send(data)
                        }else{
                            res.send("output:Error")
                        }        
                    });
                }else{
                    var envData = { OS : "windows"}; 
                    compiler.compilePython( envData , code , function(data){
                        if(data.output){
                            res.send(data)
                        }else{
                            res.send("output:Error")
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
                            res.send("output:Error")
                        }        
                    });

                }else{

                    var envData = { OS : "windows"}; 
                    compiler.compileJava( envData , code , function(data){
                        if(data.output){
                            res.send(data)
                        }else{
                            res.send("output:Error")
                        }
                    });
                }
            }else{ // c++ compiler 
                if(input){

                    var envData = { OS : "windows",  cmd : "g++", options: {timeout: 10000}}; 
                   
                    compiler.compileCppWithInput( envData , code , input ,  function(data){
                        if(data.output){
                            res.send(data)
                        }else{
                            res.send("output:Error")
                        }        
                    });

                }else{

                    var envData = { OS : "windows" , cmd : "g++", options: {timeout: 10000}}; 
                    compiler.compileCpp( envData , code , function(data){
                        if(data.output){
                            res.send(data)
                        }else{
                            res.send("output:Error")
                        }
                    });
                }
            }
    
        }
        catch(error){
           
            console.log("I heat")
            res.send("Please correct the code!!")
        }
 
         
})

app.listen(8000)

