/**
 * Check if the current environment is code-server.
 * @return True if the current environment is Gitpod, false otherwise.
 */
export function isCodeServer(): boolean {
    return !!process.env.VSCODE_PROXY_URI;
}

/**
 * Create a code-server URL for the given URL string.
 * @param urlstr The URL string to create a code-server URL for.
 * @return The code-server URL
 */
export function translateCodeServerURL(urlstr: string): string {
    const url = new URL(urlstr);
    if (!url.port) {
        throw new Error("port is not specified in the URL");
    }
    const port = url.port.toString()
    url.port = "";
    if (!isCodeServer()) {
        throw new Error("not in code-server environment");
    }
    if (url.protocol.match("ws")) {
        url.protocol = "wss";
    }
    url.hostname = process.env.VSCODE_PROXY_URI.replace('{{port}}', port);
    return url.toString();
}