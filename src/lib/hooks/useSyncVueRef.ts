import { useSyncExternalStore } from 'react'
import { Ref, watch } from 'vue'

export function useSyncVueRef<T>(ref: Ref<T>) {
  useSyncExternalStore(
    (onStoreChange) => {
      const stop = watch(ref, onStoreChange)
      return stop
    },
    () => ref.value
  )
}
