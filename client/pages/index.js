import Web3 from 'web3'
import { useCallback, useEffect, useRef, useState } from 'react'
import Tasks from "../lib/abis/Tasks.json"

export default function Home() {
  const [web3, setWeb3] = useState(null)
  const [connected, setConnected] = useState(false)
  const [account, setAccount] = useState(null)
  const [balance, setBalance] = useState(0.0)
  const [taskInstance, setTaskInstance] = useState(null)

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

  const loadTasks = useCallback(async () => {
    const _task = await taskInstance.methods.getTasks().call()
    setTodos(_task)
  }, [taskInstance])

  const init = useCallback(async () => {
    if (web3 !== null) {
      const networkId = await web3.eth.net.getId();
      console.log("🚀 ~ file: index.js ~ line 35 ~ init ~ networkId", networkId)

      const network = Tasks.networks[networkId];
      console.log("🚀 ~ file: index.js ~ line 40 ~ network", network.address)

      const taskInstance_ = new web3.eth.Contract(Tasks.abi, network.address)
      // console.log("🚀 ~ file: index.js ~ line 44 ~ taskInstance_", taskInstance_)
      if (taskInstance_) {
        setTaskInstance(taskInstance_)
        await loadTasks();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [web3])

  useEffect(() => {
    init()
  }, [init]);

  const disconnectWallet = () => {
    setWeb3(null)
    setConnected(false)
  }

  const onAddToDo = async (e) => {
    e.preventDefault();
    const value = inputRef.current.value;
    if (value) {
      await taskInstance.methods.
        setTasks(value).
        send({ from: account }).
        then(async (res) => {
          console.log("🚀 ~ file: index.js ~ line 74 ~ then ~ res", res)
          if (res.status) {
            await loadTasks()
          } else {
            console.log("Failed creating task")
          }
        })
    }

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
