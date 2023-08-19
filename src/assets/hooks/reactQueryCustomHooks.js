import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import customFetch from '../../utils'
import { toast } from 'react-toastify'

export const useFetchTasks = () => {
  const { isLoading, data, isError, error } = useQuery({
    queryKey: ['tasks'],
    queryFn: async () => {
      const { data } = await customFetch.get('/')
      return data
    },
  })

  return { isLoading, data, isError, error }
}

export const useCreateTask = () => {
  const queryClient = useQueryClient()

  const { mutate: createTask, isLoading } = useMutation({
    mutationFn: (taskList) => customFetch.post('/', { title: taskList }),
    onSuccess: () => {
      queryClient.invalidateQueries(['tasks'])
      toast.success('Task added successfully')
    },
    onError: (error) => toast.error(error.response.data.msg),
  })

  return { createTask, isLoading }
}

export const useEditTask = () => {
  const queryClient = useQueryClient()
  const { mutate: editTask } = useMutation({
    mutationFn: async ({ taskId, isDone }) => {
      return customFetch.patch(`/${taskId}`, { isDone })
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['tasks'])
    },
  })

  return { editTask }
}

export const useDeleteTask = () => {
  const queryClient = useQueryClient()
  const { mutate: deleteTask } = useMutation({
    mutationFn: async (taskId) => {
      return customFetch.delete(`/${taskId}`)
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['tasks'])
    },
  })

  return { deleteTask }
}
