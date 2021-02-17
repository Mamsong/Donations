export function isValidStr(str) {
    let isValid = false;
    for (let i of str) {
        if(i !== " "&&i !== "　"){
            isValid = true;
        }
    }
    return isValid;
}