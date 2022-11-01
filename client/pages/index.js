import Web3 from 'web3'
import { useRef, useState } from 'react'

export default function Home() {
  const [web3, setWeb3] = useState(null)
  const [connected, setConnected] = useState(false)
  const [account, setAccount] = useState(null)
  const [balance, setBalance] = useState(0.0)

  const [todos, setTodos] = useState([]);
  const inputRef = useRef();

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

  const onAddToDo = (e) => {
    e.preventDefault();
    let data = [...todos]
    data.push(inputRef.current.value)
    setTodos(data)

    inputRef.current.value = ''
  }

  return (
    <div className='App'>
      {!connected && <button onClick={connectToWallet}>Connect Wallet</button>}

      {connected && (
        <>
          <button onClick={disconnectWallet}>Disconnect Wallet</button>
          <h3>
            Current account <br></br> {account}
          </h3>

          <form onSubmit={onAddToDo}>
            <input
              label="Insert Todo"
              ref={inputRef}
            />
            <button type="submit">
              ADD
            </button>
          </form>

          <h3>Todos</h3>
          <ul>
            {todos?.map((todo, i) => (
              <li key={i}>
                <p>{todo}</p>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  )
}
