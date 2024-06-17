<script setup>
import { defineProps, defineEmits, computed } from "vue";

const props = defineProps({
  memo: {
    type: Object,
    required: true,
  },
  isTrash: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["modify-memo"]);

const formattedContent = computed(() => {
  return props.memo.content.replace(/\n/g, "<br>");
});

const modifyMemo = () => {
  emit("modify-memo", props.memo);
};
</script>

<template>
  <div v-bind="$attrs">
    <div v-if="memo" class="eachWrap">
      <header>
        <img src="@/assets/images/title1.jpeg" class="titleImg" />
        <h3 class="title">{{ memo.title }}</h3>
        <button v-if="!isTrash" @click="modifyMemo" class="modifyBtn">
          수정하기
        </button>
      </header>
      <main>
        <p class="content" v-html="formattedContent"></p>
      </main>
      <footer>
        <img src="@/assets/images/footertotoro.jpeg" class="contentImg" />
      </footer>
    </div>
  </div>
</template>

<style scoped>
.eachWrap {
  display: flex;
  flex-direction: column;
  height: 100vh;
  padding: 2rem;

  header {
    display: flex;
    align-items: center;
    margin-bottom: 1rem;
    height: 10vh;

    .titleImg {
      height: 100%;
    }

    .title {
      display: flex;
      align-items: center;
      width: 100%;
      height: 40px;
      padding: 0.2rem 0.8rem;
      font-size: 1.6rem;
      font-weight: bold;
    }

    .modifyBtn {
      width: 100px;
      height: 30px;
      margin-left: 10px;
      border: 1px solid #ff5675;
      border-radius: 4px;
      color: #ff5675;
      background-color: #fff0f0;
      font-size: 1rem;
      cursor: pointer;
      &:hover {
        color: #fff0f0;
        background-color: #ff5675;
      }
    }
  }

  main {
    display: flex;
    overflow-y: auto;
    margin-bottom: 1rem;
    height: 70vh;

    .content {
      width: 100%;
      padding: 0.8rem;
      font-size: 1.2rem;
    }

    &::-webkit-scrollbar {
      width: 0px;
    }

    &:hover::-webkit-scrollbar {
      width: 6px;
    }

    &::-webkit-scrollbar-thumb {
      background-color: #ccc;
      border-radius: 3px;
    }
  }

  footer {
    height: 10vh;
    position: relative;

    .contentImg {
      position: absolute;
      bottom: 0;
      right: 0;
      width: 200px;
      height: 100%;
    }
  }
}

.title:hover,
main:hover {
  border-radius: 6px;
  background-color: #eeeded;
}
</style>
