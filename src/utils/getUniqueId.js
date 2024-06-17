export const getUniqueId = (memos) => {
  let id;
  do {
    id = Math.floor(Math.random() * 1000000);
  } while (memos.some((memo) => memo.id === id));
  return id;
};
