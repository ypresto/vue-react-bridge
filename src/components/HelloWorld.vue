<script setup lang="ts">
import { ref } from 'vue'
import { ReactButton as ReactButtonRaw } from './ReactButton'
import { ReactInput as ReactInputRaw } from './ReactInput'
import { reactInVue } from '../lib/react-in-vue';

const ReactButton = reactInVue(ReactButtonRaw)
const ReactInput = reactInVue(ReactInputRaw)

defineProps<{ msg: string }>()

const count = ref(0)
const input = ref("")
</script>

<template>
  <h1>{{ msg }}</h1>

  <div class="card">
    <button type="button" @click="count++">count is {{ count }}</button>
    <input v-model="input" />
    <div v-for="i in [...Array(10)].map(i => i)">
      <div :key="i">
        <ReactButton :count="count" :onClick="() => count++" :style="{ marginTop: 8 }">
          React: count is {{count}}
        </ReactButton>
        <ReactInput :value="input" :onChange="e => input = e.target.value" />
      </div>
    </div>
    <p>
      Edit
      <code>components/HelloWorld.vue</code> to test HMR
    </p>
  </div>

  <p>
    Check out
    <a href="https://vuejs.org/guide/quick-start.html#local" target="_blank">create-vue</a>, the official Vue + Vite
    starter
  </p>
  <p>
    Install
    <a href="https://github.com/vuejs/language-tools" target="_blank">Volar</a>
    in your IDE for a better DX
  </p>
  <p class="read-the-docs">Click on the Vite and Vue logos to learn more</p>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
