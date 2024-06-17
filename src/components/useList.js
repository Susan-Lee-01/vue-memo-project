import { ref, watch } from "vue";

export const useList = (props, emit) => {
  const memoList = ref([...props.memos]);
  const trashList = ref([...props.trash]);

  // 메모 클릭 시 부모 컴포넌트로 이벤트 전송
  const handleMemoClick = (memo, isTrash = false) => {
    emit("show-memo", memo, isTrash);
  };

  // 로컬 스토리지 업데이트
  const updateLocalStorage = () => {
    localStorage.setItem("memos", JSON.stringify(memoList.value));
    localStorage.setItem("trash", JSON.stringify(trashList.value));
  };

  // props.memos 및 props.trash의 변화 감지
  watch(
    [() => props.memos, () => props.trash],
    ([newMemos, newTrash]) => {
      memoList.value = [...newMemos];
      trashList.value = [...newTrash];
      updateLocalStorage();
    },
    { deep: true, immediate: true }
  );

  return {
    memoList,
    trashList,
    handleMemoClick,
    updateLocalStorage,
  };
};
