import Web3 from 'web3'
import { useState } from 'react'

export default function Home() {
  const [web3, setWeb3] = useState(null)
  const [connected, setConnected] = useState(false)
  const [account, setAccount] = useState(null)
  const [balance, setBalance] = useState(0.0)

  const connectToWallet = async () => {
    if (process.isBrowser || typeof window !== 'undefined') {
      if (typeof window.ethereum !== 'undefined') {
        await window.ethereum.request({ method: "eth_requestAccounts" })
        const web3_ = new Web3(window.ethereum)
        setWeb3(web3_)
        setConnected(true)

        const accounts = await web3_.eth.getAccounts();
        setAccount(accounts[0])

        const balance_ = await web3_.eth.getBalance(accounts[0]);
        setBalance(balance_);
      } else {
        console.error("Please install metamask!")
      }
    }
  }

  const disconnectWallet = () => {
    setWeb3(null)
    setConnected(false)
  }


  return (
    <>
      {!connected && <button onClick={connectToWallet}>Connect Wallet</button>}

      {connected && (
        <>
          <button onClick={disconnectWallet}>Disconnect Wallet</button>
          <h1>{account}</h1>
          <p>balance: {web3.utils.fromWei(web3.utils.toBN(balance), "ether")}</p>
        </>
      )}
    </>
  )
}
