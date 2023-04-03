var fs = require("fs")
const { ethers } = require("ethers")
var tries = 0, hits = 0
const delay = time => new Promise(res => setTimeout(res, time));
var words = fs.readFileSync("bip39.txt", { encoding: 'utf8', flag: 'r' }).replace(/(\r)/gm, "").toLowerCase().split("\n")

function gen12(words) {
    var n = 12
    var shuffled = words.sort(function () { return .5 - Math.random() })
    return (shuffled.slice(0, n)).join(" ");
}
console.log("starting....")

async function doCheck() {
    tries++
    try {
        var wall = ethers.Wallet.fromMnemonic(gen12(words))
        fs.appendFileSync('hits.txt', wall.address + "," + wall.privateKey + "\n")
        hits++
        process.stdout.write("+")
    } catch (e) { }
    await delay(0) // Prevent Call Stack Overflow
    process.stdout.write("-")
    doCheck()
}
doCheck()