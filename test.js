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
    
    describe("1 - Test ", function() {
         beforeEach(async function () {
             votingInstance = await Voting.new({from:owner});
             await votingInstance.addVoter(voterA,{from:owner});
         });
    
        it("    1.1 - Revert parce que l'enregistrement n'est pas ouvert", async () => {
            await expectRevert(votingInstance.addVoter(voterB,{from:owner}));            
        });

        it("    1.2 - Revert parce que pas le owner", async () => {
            await expectRevert(votingInstance.addVoter(voterB,{from:voterA}));            
        });

        it("    1.3 - Revert parce que deja enregistre", async () => {
            await expectRevert(votingInstance.addVoter(voterA,{from:owner}));            
        });

        it("    1.4 - Enregistrer un voter", async () => {
            await votingInstance.addVoter(voterC,{from:owner});
            const voter = await votingInstance.getVoter(voterC,{from:voterA});
            expect(voter.isRegistered).to.be.true;
        });
        it("    1.5 - Emettre emit apres le vote", async () => {
            const findEvent = await votingInstance.setVote(0, { from: voterA });
            expectEvent(findEvent, "Voté", {voter: voterA, proposalId: new BN(0)});
        });        
    });
});
