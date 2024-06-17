<script setup>
import { ref, shallowRef, nextTick } from "vue";

import MemoList from "./components/MemoList.vue";
import TrashList from "./components/TrashList.vue";
import WriteMemo from "./components/WriteMemo.vue";
import EachMemo from "./components/EachMemo.vue";

const selectedMenuComponent = shallowRef(MemoList); // 사이드바 메뉴(메모, 휴지통) 선택
const selectedMemoComponent = shallowRef(null); // 새 메모, 메모 보기
const selectedMemo = ref(null); // 선택된 메모가 보이도록 하기 위함
const isTrash = ref(false); // 선택된 메모가 휴지통에서 열렸는지 여부

const menuTitle = ref("메모"); // 사이드바 제목
const memos = ref([]);
const trash = ref([]);

// 로컬스토리지에서 데이터 가져오기
const loadDatas = () => {
  const savedMemos = localStorage.getItem("memos");
  const savedTrash = localStorage.getItem("trash");
  memos.value = savedMemos ? JSON.parse(savedMemos) : [];
  trash.value = savedTrash ? JSON.parse(savedTrash) : [];
};
loadDatas();

// 리스트 및 사이드바 제목 선택
const showComponent = (component) => {
  if (component === "memo") {
    selectedMenuComponent.value = MemoList;
    menuTitle.value = "메모";
    selectedMemoComponent.value = null;
    isTrash.value = false;
  } else if (component === "trash") {
    selectedMenuComponent.value = TrashList;
    menuTitle.value = "휴지통";
    selectedMemoComponent.value = null;
    isTrash.value = true;
  }
};

// 작성 버튼 클릭 > WriteMemo 컴포넌트 등장
const handleAddMemo = () => {
  selectedMemoComponent.value = null;
  // 초기화 후 WriteMemo로 설정 > 메모 작성 중 아이콘 클릭했을 때 다시 렌더링
  nextTick(() => {
    selectedMemoComponent.value = WriteMemo;
    selectedMemo.value = null;
  });
};

// 리스트에서 개별 메모 클릭 > EachMemo 컴포넌트 등장
const showMemo = (memo, isTrashValue = false) => {
  selectedMemoComponent.value = EachMemo;
  selectedMemo.value = memo;
  isTrash.value = isTrashValue;
};

// 메모 추가 후 업데이트
const onAddedMemo = (memo) => {
  loadDatas();
  showMemo(memo);
};

// 수정 버튼 클릭 > WriteMemo 컴포넌트 보여줌
const handleModifyMemo = (memo) => {
  selectedMemoComponent.value = null;
  nextTick(() => {
    selectedMemoComponent.value = WriteMemo;
    selectedMemo.value = memo;
  });
};

// 메모 삭제 시, loadDatas 함수 실행
const handleUpdateMemos = (menu, updatedMemos) => {
  if (menu === "memo") {
    memos.value = updatedMemos;
  } else if (menu === "trash") {
    trash.value = updatedMemos;
  }
  selectedMemoComponent.value = null;
  loadDatas();
};
</script>

<template>
  <div class="wrapper">
    <div class="sidebar">
      <div class="menu">
        <img src="./assets/images/side.jpeg" class="sideImg" />
        <div
          class="memoNav"
          :class="{ active: menuTitle === '메모' }"
          @click="showComponent('memo')"
        >
          <font-awesome-icon :icon="['far', 'file-lines']" />
          <h3>메모</h3>
        </div>
        <div
          class="trashNav"
          :class="{ active: menuTitle === '휴지통' }"
          @click="showComponent('trash')"
        >
          <font-awesome-icon :icon="['far', 'trash-can']" />
          <h3>휴지통</h3>
        </div>
      </div>
      <div class="list">
        <header>
          <h3>{{ menuTitle }} ও</h3>
          <font-awesome-icon
            :icon="['far', 'pen-to-square']"
            @click="handleAddMemo"
            class="writeIcon"
          />
        </header>
        <!-- Memolist or Trashlist -->
        <main>
          <component
            :is="selectedMenuComponent"
            :memos="memos"
            :trash="trash"
            @show-memo="showMemo"
            @update-memos="handleUpdateMemos"
          />
        </main>
      </div>
    </div>
    <!-- Writememo or Eachmemo -->
    <div v-if="selectedMemoComponent === null" class="imgContainer">
      <img src="./assets/images/walktotoro.jpeg" class="emptyImg" />
    </div>
    <component
      v-else
      :is="selectedMemoComponent"
      :memo="selectedMemo"
      :isTrash="isTrash"
      @added-memo="onAddedMemo"
      @modify-memo="handleModifyMemo"
      class="memoContainer"
    />
  </div>
</template>

<style scoped>
.wrapper {
  width: 100%;
  height: 100vh;
  display: flex;
}

.sidebar {
  width: 40%;
  display: flex;
  color: #dcdcdc;
  border-right: 1px solid #e2dddd;
}

.menu {
  width: 45%;
  background-color: #3c3c3c;

  .sideImg {
    width: 100%;
  }
}

.memoNav,
.trashNav {
  display: flex;
  align-items: center;
  margin: 1rem;
  padding: 0 0.8rem;
  cursor: pointer;

  h3 {
    margin-left: 1rem;
    color: #fff;
  }
}

.memoNav.active,
.trashNav.active {
  border-radius: 4px;
  background-color: #646464;
}

.list {
  width: 55%;
  display: flex;
  flex-direction: column;

  header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0.8rem;
    position: sticky;
    top: 0;

    h3 {
      color: #3c3c3c;
      font-weight: bold;
      margin-left: 0.1rem;
    }

    .writeIcon {
      color: #828282;
      font-size: 1.1rem;
      cursor: pointer;
    }
  }

  main {
    flex: 1;
    overflow-y: auto;
    scroll-behavior: smooth;
    overscroll-behavior: contain;

    &::-webkit-scrollbar {
      width: 0px; /* 기본 상태 > 스크롤바 숨기기 */
    }

    &:hover::-webkit-scrollbar {
      width: 6px; /* 스크롤 할 때 > 스크롤바 보이게 */
    }

    &::-webkit-scrollbar-thumb {
      background-color: #ccc;
      border-radius: 3px;
    }
  }
}

.memoContainer,
.imgContainer {
  width: 60%;
}

.imgContainer {
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
}

.emptyImg {
  width: 400px;
  height: 400px;
  opacity: 0.5;
  object-fit: cover;
}
</style>
