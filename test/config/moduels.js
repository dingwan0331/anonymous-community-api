const createTestJson = (
  configRows,
  offset = 0,
  limit = 20,
  orderKey = "latest"
) => {
  let result = [];
  let idx;

  for (let i = 0; i < limit; i++) {
    if (orderKey === "latest") {
      idx = configRows.length - i - 1 - offset;
    } else if (orderKey === "old") {
      idx = i + offset;
    }
    let row = configRows[idx];
    let pushRow = {
      _id: row._id,
      title: row.title,
      content: row.content,
      userName: row.userName,
      createdAt: row.createdAt,
      updatedAt: row.updatedAt,
    };
    result.push(pushRow);
  }

  result = JSON.stringify(result);
  result = JSON.parse(result);

  return result;
};

export { createTestJson };
