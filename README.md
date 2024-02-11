# vue-react-bridge

Just you can use Vue components in React components.

```vue
<script setup>
import { SomeReactComponent as SomeReactComponentReact } from './components/SomeReactComponent'
import { reactInVue } from 'vue-react-bridge'

const SomeReactComponent = reactInVue(SomeReactComponentReact)
</script>

<template>
  <SomeReactComponentReact :prop="value" />
</template>
```

## Installation

```sh
npm install vue-react-bridge
yarn add vue-react-bridge
pnpm install vue-react-bridge
bun add vue-react-bridge
```
