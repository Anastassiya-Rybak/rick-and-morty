<template>
  <ul class="list">
    <li @click="jumpTo(item)" v-for="item in props.listContent" :key="item">
      <span v-if="typeof item === 'string'">Эпизод № {{ getLinkId(item) }}</span>
      <div v-else>
        <h4>{{ item.name }}</h4>
        <span>{{ item.air_date || item.type }}</span>
      </div>
    </li>
  </ul>
</template>

<script setup>
import { defineProps } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const props = defineProps({
  listContent: {
    type: Array,
    requier: true
  },
  path: {
    type: String,
    requier: true
  }
})

const jumpTo = (item) => {
  const endPoint = typeof item === 'string' ? getLinkId(item) : item.id
  router.push(`/${props.path}/${endPoint}`)
}

const getLinkId = (str) => {
  const strToArr = str.split('/')
  return strToArr[strToArr.length - 1]
}
</script>

<style lang="scss" scoped>
@import '@/assets/vars';

.list li {
  display: flex;
  justify-content: space-between;
  padding: 1vw 1vw;
  cursor: pointer;
  font-size: calcFlexFontSize(22, 30);

  @include hover {
    transform: scale(1.05);
  }

  &:nth-child(odd) {
    background-color: rgba(240, 248, 255, 0.479);
  }

  h4,
  span {
    display: inline;
  }

  h4 {
    font-size: 0.9em;
    letter-spacing: 0.05em;
  }

  span {
    font-size: 0.8em;
  }
}
</style>
