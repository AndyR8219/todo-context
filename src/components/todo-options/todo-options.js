import {
  OnChangeInputValue,
  RequestUpdateItem,
  CancelButton,
  RequestAddItem,
  SortedItems,
} from '../../components'
import { useContext } from 'react'
import styles from './todo-options.module.css'
import { TodoContext } from '../../context'

export const TodoOptions = () => {
  const {
    setValueInput,
    setIsSearch,
    setIsSorted,
    setIsCreating,
    setIdItem,
    isCreating,
    isSorted,
    idItem,
    valueInput,
    refreshTodos,
  } = useContext(TodoContext)

  return (
    <>
      <div className={styles.inputBlock}>
        <input
          className={styles.input}
          value={valueInput}
          type="text"
          onChange={(e) => OnChangeInputValue(e, setValueInput)}
          placeholder="Введите название заметки"
        />
        {idItem ? (
          <div>
            <button
              name="updateButton"
              className={styles.button}
              type="button"
              onClick={(e) =>
                RequestUpdateItem(
                  e,
                  refreshTodos,
                  valueInput,
                  setValueInput,
                  setIdItem,
                  idItem
                )
              }
            >
              Сохранить
            </button>
            <button
              name="cancelButton"
              className={styles.button}
              type="button"
              onClick={() => CancelButton(setValueInput, setIdItem)}
            >
              Отмена
            </button>
          </div>
        ) : (
          <button
            name="addButton"
            className={styles.button}
            type="submit"
            onClick={(e) =>
              RequestAddItem(
                e,
                setIsCreating,
                valueInput,
                refreshTodos,
                setValueInput
              )
            }
            disabled={isCreating}
          >
            Добавить запись
          </button>
        )}
      </div>
      <div className={styles.optionBlock}>
        <input
          className={styles.search}
          type="text"
          placeholder="Поиск"
          onChange={(e) => OnChangeInputValue(e, setIsSearch)}
        />
        <button
          name="sortedButton"
          type="button"
          className={isSorted ? styles.sorted : styles.notSorted}
          onClick={(e) => SortedItems(e, setIsSorted, isSorted)}
        >
          Сортировка
        </button>
      </div>
    </>
  )
}
