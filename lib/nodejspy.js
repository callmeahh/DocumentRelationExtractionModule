// const exec = require('child_process').exec

import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const { spawn } = require('child_process');

function relationExtraction() {
    var a = '123a';
    axios.get('index.cgi', {
        params: {
            v: a
        }
    }).then(
        res => this.result = res.data)

};
function exec1(command) {
    var ws = new ActiveXObject("WScript.Shell");
    ws.run(command);
};
function goPython() {
    $.ajax({
        url: "test.py",
        context: document.body
    }).done(function (response) {
        console.log(response.data);
        alert('Finished');;
    })
};
function exeCmd() {
    var file = spawn("curl",['test.py']);
    var fdata = '';
    file.stdout.on('data',function(data){
        fdata = fdata+data;
    });
    file.stdout.on('end',function(data){
        console.log(fdata);
    });
    // app.get("data",(req,res) =>{
    // 	const msg = 'hello'
    // 	const py = spawn('python3', ['test.py',msg])
    // 	py.stdout.on('d',func)
    // }
    // )

    // exec('python test.py ' + "123a", function (error, stdout, stderr) {
    //     if (error) {
    //         console.error(error);
    //         return;
    //     }
    //     console.log(stdout);
    // })
}