import { fetchSession } from '@/apis/auth'
import { useQuery } from '@tanstack/react-query'

export const useSession = () => {
  return useQuery({
    queryKey: ['session'],
    queryFn: fetchSession,
  })
}
