export const filterObjectDataByKeys = ({ keys, data }) => {
  const newData = {};
  for (const key in data) {
    if (keys.includes(key)) {
      newData[key] = data[key];
    }
  }
  return newData;
};
