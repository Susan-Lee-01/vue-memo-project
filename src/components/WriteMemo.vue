<script setup>
import { ref, defineProps, defineEmits, watch } from "vue";
import { getFormattedDate } from "@/utils/getFormattedDate";
import { getUniqueId } from "@/utils/getUniqueId";

const props = defineProps({
  memo: {
    type: Object,
    default: null,
  },
});

const title = ref("");
const content = ref("");
const memos = ref([]);
const isEditing = ref(false);

// memos 데이터 불러오기
const savedMemos = localStorage.getItem("memos");
memos.value = savedMemos ? JSON.parse(savedMemos) : [];

watch(
  () => props.memo,
  (newMemo) => {
    if (newMemo) {
      title.value = newMemo.title;
      content.value = newMemo.content;
      isEditing.value = true;
    } else {
      title.value = "";
      content.value = "";
      isEditing.value = false;
    }
  },
  { immediate: true }
);

const emit = defineEmits(["added-memo"]);

const saveMemo = () => {
  let updatedMemo = null;

  if (isEditing.value && props.memo) {
    const memoIndex = memos.value.findIndex(
      (memo) => memo.id === props.memo.id
    );
    if (memoIndex !== -1) {
      memos.value[memoIndex].title = title.value;
      memos.value[memoIndex].content = content.value;
      memos.value[memoIndex].date = getFormattedDate();
      updatedMemo = memos.value[memoIndex];
    }
  } else {
    const newMemo = {
      id: getUniqueId(memos.value),
      title: title.value,
      content: content.value,
      date: getFormattedDate(),
    };
    memos.value.unshift(newMemo);
    updatedMemo = newMemo;
  }

  localStorage.setItem("memos", JSON.stringify(memos.value));
  emit("added-memo", updatedMemo);
};

const handleSubmitMemo = () => {
  if (title.value.trim() === "" || content.value.trim() === "") {
    alert("Title과 content를 모두 입력해주세요.");
    return;
  }
  saveMemo();
  alert(isEditing.value ? "메모가 수정되었습니다!" : "메모가 저장되었습니다!");

  title.value = "";
  content.value = "";
  isEditing.value = false;
};
</script>

<template>
  <div class="writeWrap">
    <header>
      <img src="@/assets/images/title2.jpeg" class="titleImg" />
      <input v-model="title" class="title" placeholder="Title is here..." />
    </header>
    <main>
      <textarea
        v-model="content"
        class="content"
        placeholder="Content is here..."
      ></textarea>
    </main>
    <footer>
      <img src="@/assets/images/submit.jpeg" class="submitImg" />
      <button @click="handleSubmitMemo" class="submitBtn">submit</button>
    </footer>
  </div>
</template>

<style scoped>
.writeWrap {
  display: flex;
  flex-direction: column;
  height: 100vh;
  padding: 2rem 2rem 1rem;
  font-family: "SUITE-Regular";
}

header {
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
  height: 10vh;
}

.titleImg {
  height: 100%;
}

.title,
.content {
  width: 100%;
  border: none;
  &:focus {
    outline: none;
    border: 1px solid #828282;
    border-radius: 8px;
    caret-color: #ff5675;
  }
}

.title {
  height: 40px;
  padding: 0.2rem 0.8rem;
  font-size: 1.6rem;
}

main {
  display: flex;
  overflow-y: auto;
  margin-bottom: 1rem;
  height: 70vh;
}

.content {
  width: 100%;
  padding: 0.8rem;
  font-size: 1.2rem;
}

footer {
  margin-left: auto;
  height: 10vh;
  position: relative;
}

.submitImg {
  position: absolute;
  right: 8px;
  top: 32px;
  width: 74px;
  height: 40px;
}

.submitBtn {
  position: absolute;
  right: 0;
  width: 90px;
  height: 30px;
  border: 1px solid #ff5675;
  border-radius: 8px;
  color: #ff5675;
  background-color: #fff0f0;
  font-size: 1rem;
  cursor: pointer;

  &:hover {
    color: #fff0f0;
    background-color: #ff5675;
  }
}
</style>
