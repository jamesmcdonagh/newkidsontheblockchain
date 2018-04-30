# NewKidsOnTheBlockChain

-------------------------------------------------------------------
Creating a blockchain and cryptocurrency based off BTC whitepaper
-------------------------------------------------------------------

## DAY 1 - COMPLETE
- I will be coding the core blockchain


## DAY 2 - COMPLETE
- I'm building an API around the blockchain and 


## DAY 3 - COMPLETE
- I'm creating a dynamic p2p server for multiple contributors

## Day 4 - In progress
- Lastly I'll be implementing a proof-of-work system to balance users and creating a transaction system for a cryptocurrency

## DAY 5 - In progress 
Creating a transaction system for a cryptocurrency

# TERMS:
### The proof of work system: 
Overall the pow systems deters dishonest miners in the blockchain network and helps us control the rate at which new blocks are added to the chain. in is one that requires miners to spend some tim doing computational work to add blocks to the chain. This has the benefit of deterring dishonest peers from replacing the clock chain with corrupt and invalid data. To explain how dishonest notes are dissuaded consider that in our decentralize blockchain any peer has the capability of submitting a new chain to the system. As long as that chain is long enough it contains valid hash data. Starting from the Genesis block that change will be accepted by all the peers in the blockchain network. Yet to discourage this honest individuals in the network from taking over the entire blockchain with a corrupt chain in their favor that actually has valid hashes the proof of work system makes it computationally expensive and almost ridiculous to do so. The proof of work system makes it so that individual noes in the blockchain can put in unmanageable amount of computational work in order to add a block. However for a dishonest node the proof of work is it makes it vasly unproductive to try and take over with an entirely freshly generated chain. BTC uses hashcash (introduced in 1997 to prevent email spamming).
    
### HASHCASH: 
At any given point there is a level of difficulty in the blockchain system. depending on this diffiuclty when miners try to add a new block they will have to find a hash value for this block that matches this difficulty. For this matching, Miners have to find the same number of leading zeros, as the current difficulty for the generated hash of the new block to add to the chain. Finding this certain number of leading zeros randomly becomes exponentially harder as the difficulty itself rises [EXAMPLE: DIFFICULTY=6 HASH=`000000`haxi2910jasdflk]. In order to solve the proof of work a miner will have to generate a ton of hases in order to eventually find one that satisfies the difficulty. They will generate new hashes for the same block base on the block data as well as its adjusting value called the nonce. 
        
### Nonce: 
By changing the nonce value the miner generates new valid hashes for the current block and its data. a nonce is a term in cryoptography to refer to a value that can only be used once. since every unique nonce value will generate a unique hash the nonce can indeed only be used once to generate that new hash for the block. the nonce value starts at 0 and increments upward until a nonce is used that has a matching number of leading zeroes according to the set difficulty which generates the hash. this nonce value is then stored as part of the block and this act of generating new hashes with changing values takes quite a bit of computational work.so the act of spending this computational work is part of the reason why adding a block to the blockchain is caling mining. 

### Mining: 
Once a miner has successfully mined a block they will submit their block with th efound nonce value to other miners. once the other miners know this non-nonce value they can quickly verify the validity of that solution and add the new block to the chain, that way they don't have to redo the same computational work once they recieve a new block to add to their own block chain and stay up to date. because of this difficulty setting blockchains also have the ability to control the rate at which new blocks are added to the system. the harder=longer easier=shorter. btv sets the rate to a new block around every 10mins.

### 51% attack: 
A scenario where a dishonest miner has more than at aleast 51 percent of the computing power of the entire bc network. thus, they would have the power to replace the current blockchain with one in their favor, with this computing power they could create a generate long enough blockchain that has solved enough proof of work puzzles in order to generate a valid block chain that everyone will have to accept. however the proof of work system makes such a situation so computationally expensive that its absolutely rediculous to spend that costs in order to try and benefit from manipulating the blockchain. at this point in time, in order to take over the bc network in all its collective computing power the cost is estimated to be $6billion dollars. 

### Dynamic Block Difficulty: 
As more and more peers are added to this blockchain network, blocks will start to be discovered at a faster rate as there will be a higher chance for at least one miner to discover a valid hash at the set difficulty. Therefore we need a dynamic system that adjusts a block change difficulty level as more miners are added to the system. To achieve this we can add a difficulty attribute to each block. In addition we also set a time value called mine rate which represents the rate at which we want each block to be mined. The difficulty adjustment mechanism will work like this: we'll check the time stamp of the newly mined block and compare it to the time set of the previously mined block. if the difference between both time stamps is lower than mine rate then we know that the block was mined to difficulty, therefore add 1. Likewise if the difference in timestamps between our newest block and the block that came before it is bigger than our mine rate, we know that the block was mined too slowly, therefore subtract 1
