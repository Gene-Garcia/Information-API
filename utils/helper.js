
exports.isEmpty = (data) => {
    if (data === null) return true;
    else if (data === undefined) return true;
    else if (!data) return true; 
}