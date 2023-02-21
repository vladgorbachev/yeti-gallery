export function getProtocol() {
    return location.protocol === "https:" ? "https://" : "http://"
}
