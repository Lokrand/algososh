export const randomArr = (n: number, isListPage: boolean) => {
  const result: number[] = [];
  const resultLength = isListPage ? n : Math.floor(Math.random() * n);
  for (let i = 0; i < (resultLength > 3 ? resultLength : 3); i++) {
    result.push(Math.floor(Math.random() * 101));
  }
  return result;
};
