export function date(timestamp: number = Date.now()) {
    return new Date(timestamp).toDateString();
}