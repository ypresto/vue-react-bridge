import React from 'react'
import ReactDOM from 'react-dom'
import ReactDOMClient from 'react-dom/client'
import {
  Component,
  PropType,
  Ref,
  defineComponent,
  h,
  inject,
  onBeforeUnmount,
  onMounted,
  onUnmounted,
  provide,
  ref,
  toRefs,
  useSlots,
  watch,
} from 'vue'

type ReactInVueState = {
  mountNodeMap: Ref<Map<number, MountNode>>
}

type MountNode = {
  container: Element
  children: React.ReactNode
}

const reactInVueStateSymbol = Symbol('reactInVueState')

export const ReactInVueManager = defineComponent({
  name: 'ReactInVueManager',
  compatConfig: { MODE: 3 },

  setup() {
    const mountNodeMap = ref(new Map<number, MountNode>())
    const reactInVueState: ReactInVueState = { mountNodeMap }

    provide(reactInVueStateSymbol, reactInVueState)

    // render to dummy root
    const reactRoot = ReactDOMClient.createRoot(document.createDocumentFragment())

    const onRender = () => {
      reactRoot.render(
        React.createElement(React.Fragment, {
          children: [...mountNodeMap.value.entries()].map(([id, { children, container }]) =>
            ReactDOM.createPortal(children, container, id.toString())
          ),
        })
      )
    }

    watch(
      reactInVueState.mountNodeMap,
      () => {
        onRender()
      },
      { immediate: true, deep: true }
    )

    const rootRef = ref<Element | null>(null)

    onUnmounted(() => {
      reactRoot.unmount()
    })

    const slots = useSlots()

    return () => [slots.default?.(), h('div', { role: 'presentation', ref: rootRef })]
  },
})

let nextLocatorID = 1

const ReactInVueLocator = defineComponent({
  name: 'ReactInVueLocator',
  compatConfig: { MODE: 3 },

  props: {
    component: {
      type: [Function, Object, String] as PropType<React.ComponentType<any>>,
      required: true,
    },
    props: {
      type: Object,
      required: true,
    },
    renderCount: {
      type: Number,
      required: true,
    },
  },
  setup(props) {
    const reactInVueState = inject<ReactInVueState>(reactInVueStateSymbol)
    if (!reactInVueState) {
      throw new Error('reactInVueState is not provided')
    }
    const { component, props: componentProps, renderCount } = toRefs(props)

    const root = ref<Element | null>(null)

    const container = document.createElement('div')
    container.setAttribute('role', 'presentation')
    container.setAttribute('data-react-in-vue', 'true')
    container.style.display = 'contents'
    const locatorID = nextLocatorID++

    watch(
      [component, componentProps, renderCount],
      () => {
        reactInVueState.mountNodeMap.value.set(locatorID, {
          children: React.createElement(component.value, componentProps.value),
          container: container,
        })
      },
      { immediate: true }
    )

    onMounted(() => {
      root.value!.append(container)
    })

    onBeforeUnmount(() => {
      root.value!.removeChild(container)
      reactInVueState.mountNodeMap.value.delete(locatorID)
    })

    return () =>
      h('div', {
        ref: root,
        role: 'presentation',
        'data-react-in-vue': true,
        style: { display: 'contents' },
      })
  },
})

export function reactInVue<P>(component: React.ComponentType<P>) {
  const ConcreteComponent = defineComponent({
    name: component.displayName || component.name,
    compatConfig: { MODE: 3 },

    // Do not automatically set passed props and event handlers (in attrs) on root DOM element.
    inheritAttrs: false,

    setup(_props, { attrs }) {
      let forceRender = 0

      return () => {
        // important to pass renderCount here; because attrs is not reactive, no rendering will be triggered after update.
        // https://vuejs.org/guide/components/attrs#accessing-fallthrough-attributes-in-javascript
        return h(ReactInVueLocator, { component, props: attrs, renderCount: ++forceRender })
      }
    },
  })

  // export type Component<Props = any, RawBindings = any, D = any, C extends ComputedOptions = ComputedOptions, M extends MethodOptions = MethodOptions, E extends EmitsOptions | Record<string, any[]> = {}, S extends Record<string, any> = any> = ConcreteComponent<Props, RawBindings, D, C, M, E, S> | ComponentPublicInstanceConstructor<Props>;
  return ConcreteComponent as Component<P, {}, {}, {}, {}, {}, {}>
}
