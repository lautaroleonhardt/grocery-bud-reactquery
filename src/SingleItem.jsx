import { useMutation, useQueryClient } from '@tanstack/react-query'
import customFetch from './utils'

const SingleItem = ({ item }) => {
  const queryClient = useQueryClient()
  const { mutate: editTask } = useMutation({
    mutationFn: async ({ taskId, isDone }) => {
      return customFetch.patch(`/${taskId}`, { isDone })
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['tasks'])
    },
  })

  const { mutate: deleteTask } = useMutation({
    mutationFn: async (taskId) => {
      return customFetch.delete(`/${taskId}`)
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['tasks'])
    },
  })

  return (
    <div className='single-item'>
      <input
        type='checkbox'
        checked={item.isDone}
        onChange={() => editTask({ taskId: item.id, isDone: !item.isDone })}
      />
      <p
        style={{
          textTransform: 'capitalize',
          textDecoration: item.isDone && 'line-through',
        }}>
        {item.title}
      </p>
      <button className='btn remove-btn' type='button' onClick={() => deleteTask(item.id)}>
        delete
      </button>
    </div>
  )
}
export default SingleItem
