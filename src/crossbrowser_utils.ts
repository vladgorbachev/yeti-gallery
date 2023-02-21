
export function getVendorPrefixedName(name: string) {
    if (typeof window === 'undefined') {
        return name;
    }
    const prefixes = ['', 'webkit', 'moz', 'ms', 'o'];
    const upperCaseName = name.charAt(0).toUpperCase() + name.slice(1);
    for (const prefix of prefixes) {
        const prefixedName = prefix ? prefix + upperCaseName : name;
        if (prefixedName in window) {
            return prefixedName;
        }
    }
    return name;
}