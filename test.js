var fs = require("fs")
const { ethers } = require("ethers");
var words = fs.readFileSync("wordlist.txt", {encoding:'utf8', flag:'r'}).replace(/(\r)/gm, "").toLowerCase().split("\n")

function gen12(words) {
    var n = 12  
    var shuffled = words.sort(function(){return .5 - Math.random()})
    return (shuffled.slice(0,n)).join(" ");
}
console.log("starting....")
setInterval(function () {
    try {    
        var wall = ethers.Wallet.fromMnemonic(gen12(words))
        fs.appendFileSync('hits.txt', wall.address + wall.privateKey);
    } catch (e) {}
}, 0)

