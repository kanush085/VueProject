function filterBy(list, value) {
    if (!list) return null;
    if (!value) return value;
    return list.filter(function (item) {
        return item.label.toLowerCase().indexOf(value.toLowerCase()) !== -1;

    });
}

function findBy(list, value) {
    return list.filter(function (item) {
        return item == value
    });
}

function reverse(value) {
    return value.split('').reverse().join('');
}

export {
    filterBy,
    reverse,
    findBy
}