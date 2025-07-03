export function getCurTime() {
    let date = new Date();
    return date.getTime() / 1000 - date.getTimezoneOffset() * 60;
}