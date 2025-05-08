import { renderHook, act } from '@testing-library/react'
import { useStore } from '../useStore'

describe('useStore', () => {
  it('should increment count', () => {
    const { result } = renderHook(() => useStore())
    
    act(() => {
      result.current.increment()
    })
    
    expect(result.current.count).toBe(1)
  })

  it('should decrement count', () => {
    const { result } = renderHook(() => useStore())
    
    act(() => {
      result.current.decrement()
    })
    
    expect(result.current.count).toBe(-1)
  })
}) 