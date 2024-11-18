import Web3 from 'web3'
import { AbiItem } from 'web3-utils'
import RADTokenABI from '../contracts/RADToken.json'

const RAD_TOKEN_ADDRESS = process.env.NEXT_PUBLIC_RAD_TOKEN_ADDRESS

export class Web3Service {
  private web3: Web3
  private radTokenContract: any

  constructor() {
    if (typeof window !== 'undefined' && typeof window.ethereum !== 'undefined') {
      this.web3 = new Web3(window.ethereum)
      this.radTokenContract = new this.web3.eth.Contract(
        RADTokenABI as AbiItem[],
        RAD_TOKEN_ADDRESS
      )
    } else {
      console.error('Web3 not detected. Please install MetaMask.')
    }
  }

  async connectWallet(): Promise<string[]> {
    try {
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
      return accounts
    } catch (error) {
      console.error('Failed to connect wallet:', error)
      throw error
    }
  }

  async getBalance(address: string): Promise<string> {
    try {
      const balance = await this.radTokenContract.methods.balanceOf(address).call()
      return this.web3.utils.fromWei(balance, 'ether')
    } catch (error) {
      console.error('Failed to get balance:', error)
      throw error
    }
  }

  async transfer(to: string, amount: string): Promise<string> {
    try {
      const accounts = await this.web3.eth.getAccounts()
      const amountWei = this.web3.utils.toWei(amount, 'ether')
      const result = await this.radTokenContract.methods.transfer(to, amountWei).send({
        from: accounts[0],
      })
      return result.transactionHash
    } catch (error) {
      console.error('Failed to transfer tokens:', error)
      throw error
    }
  }
}

export const web3Service = new Web3Service()
