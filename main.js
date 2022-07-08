const { fork } = require("child_process");
var fs = require("fs")
var children = []
console.log("starting 12 processes")

for(var i = 0; i < 12; i++){
    children[i] = fork("test.js", [], { silent: true, detatched: false })
}

process.on("SIGTERM", () => {
    children.forEach((val) => {
        val.kill()
    })
})

console.log("all processes started")