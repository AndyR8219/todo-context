import { useState, useEffect } from 'react'
import { URL_TODOS } from './constants/constants'
import { TodoList, TodoOptions } from './components/'
import { TodoContext } from './context'

import styles from './App.module.css'

function App() {
  const [todos, setTodos] = useState([])
  const [valueInput, setValueInput] = useState('')
  const [isSearch, setIsSearch] = useState('')
  const [isSorted, setIsSorted] = useState(false)
  const [isCreating, setIsCreating] = useState(false)
  const [idItem, setIdItem] = useState('')
  const [refreshFlag, setRefreshFlag] = useState(false)

  const refreshTodos = () => setRefreshFlag(!refreshFlag)

  useEffect(() => {
    let sort = '?_sort=title&_order=asc'
    if (!isSorted) {
      sort = ''
    }
    fetch(URL_TODOS + sort, {
      method: 'GET',
      headers: { 'Content-type': 'application/json;charset=utf-8' },
    })
      .then((rawResponse) => rawResponse.json())
      .then((res) => {
        setTodos(res)
      })
      .catch((err) => console.log('Ошибка', err))
  }, [isSorted, refreshFlag])

  return (
    <TodoContext.Provider
      value={{
        todos,
        setTodos,
        valueInput,
        setValueInput,
        isSearch,
        setIsSearch,
        isSorted,
        setIsSorted,
        isCreating,
        setIsCreating,
        idItem,
        setIdItem,
        refreshFlag,
        setRefreshFlag,
        refreshTodos,
      }}
    >
      <form className={styles.form}>
        <TodoOptions />
        <TodoList />
      </form>
    </TodoContext.Provider>
  )
}

export default App
