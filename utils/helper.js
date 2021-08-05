exports.isEmpty = (data) => {
  if (data === null) return true;
  else if (data === undefined) return true;
  else if (data === "") return true;
  return false;
};

exports.splitKeywords = (keywords) => {
  const keywordsArr = keywords.split(",");
  const clean = [];

  keywordsArr.forEach((k) => {
    let temp = k.trim();
    if (temp !== "") clean.push(temp);
  });

  return clean;
};
