import { useMemo } from 'react'
import { useParams } from 'react-router-dom'
import { getItemById } from '@/mock/items'

export function useItem() {
  const { id } = useParams<{ id: string }>()
  const item = useMemo(() => (id ? getItemById(id) : undefined), [id])
  return { item, id }
}
