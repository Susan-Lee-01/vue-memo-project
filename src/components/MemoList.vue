<script setup>
import { defineProps, defineEmits } from "vue";
import { useList } from "./useList";

const props = defineProps({
  memos: Array,
  trash: Array,
});

const emit = defineEmits(["show-memo", "update-memos"]);

const { memoList, trashList, handleMemoClick, updateLocalStorage } = useList(
  props,
  emit
);

// 메모 삭제 함수
const deleteMemo = (id) => {
  const memoToDelete = memoList.value.find((memo) => memo.id === id);
  if (memoToDelete && confirm("메모를 삭제하시겠습니까?")) {
    memoList.value = memoList.value.filter((memo) => memo.id !== id);

    trashList.value.unshift(memoToDelete);
    updateLocalStorage();

    // 부모 컴포넌트로 업데이트된 리스트 전달
    emit("update-memos", "memo", memoList.value);
    emit("update-memos", "trash", trashList.value);
  }
};
</script>

<template>
  <div>
    <div v-if="memoList.length === 0">
      <div class="emptyWrap">
        <img src="../assets/images/emptytotoro.jpeg" class="img first" />
        <img src="../assets/images/emptytotoro.jpeg" class="img second" />
      </div>
    </div>
    <div v-else>
      <div
        v-for="memo in memos"
        :key="memo.id"
        @click="handleMemoClick(memo)"
        class="listWrap"
      >
        <div class="memo">
          <h3>{{ memo.title }}</h3>
          <p>{{ memo.content }}</p>
          <p>{{ memo.date }}</p>
          <button class="deleteBtn" @click.stop="deleteMemo(memo.id)">
            <font-awesome-icon :icon="['fas', 'minus']" />
          </button>
        </div>
        <hr />
      </div>
    </div>
  </div>
</template>

<style scoped>
.emptyWrap {
  height: 80vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  overflow: hidden;
}

.img {
  width: 200px;
  height: 200px;
  opacity: 0.3;
  object-fit: cover;
}

.img.first {
  margin-bottom: 5rem;
  transform: rotate(40deg);
}
.img.second {
  transform: scaleX(-1) rotate(40deg);
}

.listWrap {
  position: relative;
  overflow-x: auto;
  display: flex;
  flex-direction: column;
}

.memo {
  min-width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;
  transition: transform 0.3s ease;
  padding: 1rem;
  cursor: pointer;
  position: relative;
}

.deleteBtn {
  position: absolute;
  right: 0;
  top: 0;
  bottom: 0;
  width: 60px;
  background-color: rgb(233, 67, 67);
  color: white;
  border: none;
  outline: none;
  cursor: pointer;
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.3s ease, visibility 0.3s ease;
  align-items: center;
  justify-content: center;
  pointer-events: none;
}

.memo:hover .deleteBtn {
  opacity: 1;
  visibility: visible;
  pointer-events: auto;
}

.memo h3,
.memo p {
  width: 95%;
  height: 1.8rem;
  overflow: hidden;
}

.memo p {
  color: #828282;
}

.memo h3 {
  font-size: 1rem;
  color: #3c3c3c;
  font-weight: bold;
}

hr {
  width: 80%;
  margin: 0 auto;
  border: 0;
  border-top: 1px solid #e2dddd;
}
</style>
