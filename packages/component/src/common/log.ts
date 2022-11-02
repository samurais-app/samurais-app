
export function logger(label: string, message: string) {
    return console.log(`%c ${label} %c ${message}`,'background:#000;color:#fff;border-top-left-radius: 4px;border-bottom-left-radius: 4px; padding: 4px', 'background:#f5f5f5;color: #000;border-top-right-radius: 4px;border-bottom-right-radius: 4px;padding: 4px');
}