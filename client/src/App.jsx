import { useState, useEffect } from 'react'
import abi from "./contractJson/chai.json"
import { ethers } from 'ethers'
import Memos from './components/Memos'
import Buy from './components/Buy'
import chai from "./chai.png";
import './App.css'

function App() {
  const [state, setState] = useState({
    provider: null,
    signer: null,
    contract: null
  })

  const [account, setAccount] = useState('Not connected');

  useEffect(() => {
    const template = async () => {
      const contractAddress = "0xD18E83Fc766Fa16f3F3e2Abb88abC75d8e5a62d5";
      const contractABI = abi.abi;
      // Metamask part
      // 1. In order to transsction on Sepolia
      // 2. Metamask consist of infura api which help in connecting to the blockchain
      try {
        const { ethereum } = window;

        const account = await ethereum.request({
          method: "eth_requestAccounts"
        })

        window.ethereum.on("accountsChanged", () => {
          window.location.reload();
        })
        setAccount(account[0]);

        // 在 ethers.js 库中，ethers.Contract 是一个类，用于创建和与智能合约进行交互的对象。你可以使用这个类来调用合约的函数、监听合约事件，以及创建与特定合约地址和ABI相关联的对象
        const provider = new ethers.providers.Web3Provider(ethereum); // read the blockchian
        const signer = provider.getSigner(); // write the blockchain

        // 创建合约对象
        const contract = new ethers.Contract(
          contractAddress,
          contractABI,
          signer
        )
        console.log(contract)
        setState({ provider, signer, contract });
      } catch (error) {
        alert(error);
      }


    }
    template();
  }, [])

  return (
    <div className='App'>
      <img src={chai} className="img-fluid" alt=".." width="100%" />
      <p style={{ marginTop: "10px", marginLeft: "5px" }}>
        <small>Connected Account - {account}</small>
      </p>
      <Buy state={state} />
      <Memos state={state} />
    </div>
  )
}

export default App
