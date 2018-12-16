const StarNotary = artifacts.require('StarNotary');

contract('StarNotary', accounts => {
  let user1 = accounts[1];
  let user2 = accounts[2];
  let randomMaliciousUser = accounts[3];

  let name = 'awesome star!';
  let starStory = "this star was bought for my wife's birthday";
  let ra = '1';
  let dec = '1';
  let mag = '1';
  let starId = 1;

  beforeEach(async function() {
    this.contract = await StarNotary.new({ from: accounts[0] });
  });

  describe('can create a star', () => {
    it('can create a star and get its name', async function() {
      await this.contract.createStar(name, starStory, ra, dec, mag, starId, {
        from: user1
      });

      let starInfo = await this.contract.tokenIdToStarInfo(starId);
      assert.equal(starInfo[0], name);
    });
  });

  describe('star uniqueness', () => {
    it('only stars unique stars can be minted', async function() {
      await this.contract.createStar(name, starStory, ra, dec, mag, starId, {
        from: user1
      });
      expectThrow(
        this.contract.createStar(name, starStory, ra, dec, mag, starId, {
          from: user1
        })
      );
    });

    it('only stars unique stars can be minted even if their ID is different', async function() {
      await this.contract.createStar(name, starStory, ra, dec, mag, starId, {
        from: user1
      });
      const newStarId = 2;
      expectThrow(
        this.contract.createStar(name, starStory, ra, dec, mag, newStarId, {
          from: user1
        })
      );
    });

    it('minting unique stars does not fail', async function() {
      for (let i = 0; i < 10; i++) {
        let id = i;
        let newRa = i.toString();
        let newDec = i.toString();
        let newMag = i.toString();

        await this.contract.createStar(
          name,
          starStory,
          newRa,
          newDec,
          newMag,
          id,
          { from: user1 }
        );

        let starInfo = await this.contract.tokenIdToStarInfo(id);
        assert.equal(starInfo[0], name);
      }
    });
  });

  describe('buying and selling stars', () => {
    let starPrice = web3.toWei(0.01, 'ether');

    beforeEach(async function() {
      await this.contract.createStar(name, starStory, ra, dec, mag, starId, {
        from: user1
      });
    });

    it('user1 can put up their star for sale', async function() {
      await this.contract.putStarUpForSale(starId, starPrice, {
        from: user1
      });

      let price = await this.contract.starsForSale(starId);
      assert.equal(price, starPrice);
    });

    describe('user2 can buy a star that was put up for sale', () => {
      beforeEach(async function() {
        await this.contract.putStarUpForSale(starId, starPrice, {
          from: user1
        });
      });

      it('user2 is the owner of the star after they buy it', async function() {
        await this.contract.buyStar(starId, { from: user2, value: starPrice });

        assert.equal(await this.contract.ownerOf(starId), user2);
      });

      it('user2 ether balance changed correctly', async function() {
        const overpaidAmmount = web3.toWei(0.05, 'ether');

        const balanceOfUser2BeforeTransaction = web3.eth.getBalance(user2);
        await this.contract.buyStar(starId, {
          from: user2,
          value: overpaidAmmount,
          gasPrice: 0
        });
        const balanceOfUser2AfterTransaction = web3.eth.getBalance(user2);

        assert.equal(
          balanceOfUser2BeforeTransaction.sub(balanceOfUser2AfterTransaction),
          starPrice
        );
      });
    });
  });
});

const expectThrow = async function(promise) {
  try {
    await promise;
  } catch (error) {
    assert.exists(error);
    return;
  }

  assert.fail('expected an error, but none was found');
};
