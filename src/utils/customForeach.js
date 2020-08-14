// 加上async/await
const CustomForeach = async (arr, callback, success) => {
  const length = arr.length;
  const O = Object(arr);
  let k = 0;
  while (k < length) {
    if (k in O) {
      const kValue = O[k];
      await callback(kValue, k, O);
    }
    k++;
  }
  if(success) {
    success()
  }
}
export default CustomForeach
