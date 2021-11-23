import React, { Component } from "react";
import Web3 from "web3";
import "./App.css";
import BullDoge from "../abis/BullDoge.json";
import Navbar from "./Navbar";
import Main from "./Main";

class App extends Component {
  async componentWillMount() {
    await this.loadWeb3();
    await this.loadBlockchainData();
  }

  async loadBlockchainData() {
    const testnet =
      "https://kovan.infura.io/v3/" + process.env.WEB3_INFURA_PROJECT_ID;
    const web3 = new Web3(Web3.givenProvider || testnet);

    const accounts = await web3.eth.getAccounts();
    this.setState({ account: accounts[0] });

    const ethBalance = await web3.eth.getBalance(this.state.account);
    this.setState({ ethBalance });

    // Load BullDoge
    if (BullDoge) {
      const bullDoge = new web3.eth.Contract(
        BullDoge.abi,
        BullDoge.deployment.address
      );
      this.setState({ bullDoge });
      let bullDogeBalance = await bullDoge.methods
        .balanceOf(this.state.account)
        .call();
      this.setState({ bullDogeBalance: bullDogeBalance.toString() });
    }
  }

  async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.enable();
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
    } else {
      window.alert(
        "Non-Ethereum browser detected. You should consider trying MetaMask!"
      );
    }
  }

  constructor(props) {
    super(props);
    this.state = {
      account: "",
      taskCount: 0,
      tasks: [],
    };
  }

  render() {
    let content;
    if (this.state.loading) {
      content = (
        <p id="loader" className="text-center">
          Loading...
        </p>
      );
    } else {
      content = <Main bullDogeBalance={this.state.bullDogeBalance} />;
    }

    return (
      <div>
        <Navbar account={this.state.account} />
        <div className="container-fluid mt-5">
          <div className="row">
            <main
              role="main"
              className="col-lg-12 ml-auto mr-auto"
              style={{ maxWidth: "600px" }}
            >
              {content}
            </main>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
