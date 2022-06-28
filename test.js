const Voting = artifacts.require("./voting.sol");
const {BN, expectRevert, expectEvent} = require('@openzeppelin/test-helpers');
const {expect} =require ('chai');


contract ('Voting', accounts => {
    const owner = accounts[0];

    const voterA = accounts[1];
    const voterB = accounts[2];
    const voterC = accounts[3];
    const voterD = accounts[4];

    
    let votingInstance;
    
    describe("1 - Test des Events", function() {
         before(async function () {
             votingInstance = await Voting.deployed();
         });


    
        it("1.1 - Le voter doit etre enregistre", async () => {
            const e = await SpaInstance.Add("chien",100, 3, { from: owner });
            await SpaInstance.Add("chat",100, 3, { from: owner });
            expectEvent(findEvent,"animalAdded" ,{id: new BN(0)});
        });
    });
});