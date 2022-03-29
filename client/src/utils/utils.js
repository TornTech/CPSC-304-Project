export function formatDollar(num) {
    var p = Number(num).toFixed(0);
    return "$" + p.split("").reverse().reduce(function(acc, num, i, orig) {
        return num + (num !== "-" && i && !(i % 3) ? "," : "") + acc;
    }, "");
}

export function formatPhoneNumber(phoneNumber) {
    const cleanNum = Number(phoneNumber).toString().replace(/\D/g, '');
    const match = cleanNum.match(/^(\d{3})(\d{0,3})(\d{0,4})$/);
    if (match) {
        return '(' + match[1] + ') ' + (match[2] ? match[2] + "-" : "") + match[3];
    }
    return cleanNum;
}