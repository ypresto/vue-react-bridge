import React, { useContext, useLayoutEffect, useRef, useSyncExternalStore } from 'react'
import { ConcreteComponent, Ref, Slot, defineComponent } from 'vue'

type A = Readonly<T>

export const VueInReactManager = defineComponent({
  name: 'VueInReactManager',
  compatConfig: { MODE: 3 },
  inheritAttrs: false,
  props: {
    parentReactInVueState: {},
  },
})

let nextLocatorID = 1

function VueInReactLocatorImpl({ is, attrs, slot }: { is: ConcreteComponent | string; attrs?: {}; slot?: Slot }) {
  const vueInReactState = useContext(VueInReactStateContext)
  if (!vueInReactState) {
    throw new Error('vueInReactState is not provided')
  }

  // const ref = useRef<Element>(null)

  // const locatorID = nextLocatorID++

  // onMounted(() => {
  //   root.value!.append(container)
  // })

  // onBeforeUnmount(() => {
  //   root.value!.removeChild(container)
  //   reactInVueState.mountNodeMap.value.delete(locatorID)
  // })

  // return () =>
  //   h('div', {
  //     ref: root,
  //     role: 'presentation',
  //     'data-react-in-vue': true,
  //     style: { display: 'contents' },
  //   })

  return null
}

export const VueInReactLocator = React.memo(VueInReactLocatorImpl)
