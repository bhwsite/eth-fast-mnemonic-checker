var fs = require("fs")
const { ethers } = require("ethers")
var tries = 0, hits = 0
const delay = time => new Promise(res => setTimeout(res, time));
var words = fs.readFileSync("bip39.txt", { encoding: 'utf8', flag: 'r' }).replace(/(\r)/gm, "").toLowerCase().split("\n")

/**
 * This function generates a 12-word mnemonic phrase from a given list of words.
 * It is designed to be efficient and quick in selecting words for the phrase.
 *
 * How it works:
 * - It randomly selects 12 words from the provided list without repeating any word.
 * - The selection is done by generating random indices for the array of words,
 *   ensuring that each word in the phrase is unique and randomly chosen.
 * 
 * Why it's good:
 * - Efficiency: Unlike methods that require shuffling the entire list of words 
 *   each time a new word is needed, this function simply picks a random word 
 *   from the list, which is computationally less expensive.
 * - Simplicity: The logic is straightforward and easy to understand, making 
 *   the function maintainable and modifiable.
 * - Flexibility: It can easily be adapted to generate phrases of different lengths 
 *   or from different word lists by adjusting the parameters.
 */
function gen12(words) {
    var n = 12; // Set the number of words in the mnemonic phrase (12 words)

    var phrase = []; // Initialize an empty array to store the selected words

    // Continue the loop until the phrase array reaches 12 words
    while (phrase.length < n) {
        // Generate a random index within the range of the words array length
        let index = Math.floor(Math.random() * words.length);

        // Add the word at the randomly chosen index to the phrase array
        phrase.push(words[index]);
    }

    // Join the words in the phrase array into a single string, separated by spaces, and return this string
    return phrase.join(" ");
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
