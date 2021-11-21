import React, { Component } from 'react'
import Web3 from 'web3'
import './App.css'
import BullDoge from './abis/BullDoge.json'

class App extends Component {
  componentWillMount() {
    this.loadBlockchainData()
  }

  async loadBlockchainData() {
    const testnet = "https://kovan.infura.io/v3/" + process.env.WEB3_INFURA_PROJECT_ID
    const web3 = new Web3(Web3.givenProvider || testnet)
    const accounts = await web3.eth.getAccounts()
    this.setState({ account: accounts[0] })
    const bullDoge = new web3.eth.Contract(BullDoge.abi, BullDoge.deployment.address)
    this.setState({ bullDoge })
    const bullDogeBalance = await bullDoge.methods.balanceOf(this.state.account).call()
    this.setState({ bullDogeBalance: bullDogeBalance.toString() })
  }
  
  constructor(props) {
    super(props)
    this.state = {
      account: '',
      taskCount: 0,
      tasks: []
    }
  }

  render() {
    return (
      <div className="container">
        <h1>Hello, World!</h1>
        <p>Your account: {this.state.account}</p>
      </div>
    );
  }
}

export default App;