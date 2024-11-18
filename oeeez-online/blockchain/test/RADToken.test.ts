import { expect } from "chai";
import { ethers } from "hardhat";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { RADToken } from "../typechain-types";

describe("RADToken", function () {
  let radToken: RADToken;
  let owner: SignerWithAddress;
  let addr1: SignerWithAddress;
  let addr2: SignerWithAddress;

  beforeEach(async function () {
    [owner, addr1, addr2] = await ethers.getSigners();
    const RADToken = await ethers.getContractFactory("RADToken");
    radToken = await RADToken.deploy();
    await radToken.deployed();
  });

  it("Should set the right owner", async function () {
    expect(await radToken.hasRole(await radToken.DEFAULT_ADMIN_ROLE(), owner.address)).to.equal(true);
  });

  it("Should assign the total supply of tokens to the owner", async function () {
    const ownerBalance = await radToken.balanceOf(owner.address);
    expect(await radToken.totalSupply()).to.equal(ownerBalance);
  });

  it("Should allow minting by minter role", async function () {
    await radToken.mint(addr1.address, 50);
    expect(await radToken.balanceOf(addr1.address)).to.equal(50);
  });

  it("Should not allow minting by non-minter role", async function () {
    await expect(radToken.connect(addr1).mint(addr2.address, 50)).to.be.revertedWith(
      "AccessControl: account " + addr1.address.toLowerCase() + " is missing role " + await radToken.MINTER_ROLE()
    );
  });

  it("Should allow burning tokens", async function () {
    await radToken.mint(addr1.address, 100);
    await radToken.connect(addr1).burn(50);
    expect(await radToken.balanceOf(addr1.address)).to.equal(50);
  });

  it("Should allow pausing and unpausing by pauser role", async function () {
    await radToken.pause();
    expect(await radToken.paused()).to.equal(true);
    await radToken.unpause();
    expect(await radToken.paused()).to.equal(false);
  });

  it("Should not allow transfers when paused", async function () {
    await radToken.mint(addr1.address, 100);
    await radToken.pause();
    await expect(radToken.connect(addr1).transfer(addr2.address, 50)).to.be.revertedWith("Pausable: paused");
  });
});
