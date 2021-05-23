const { ipcRenderer } = require('electron');

window.addEventListener('DOMContentLoaded', () => {
    const replaceText = (selector, text) => {
        const element = document.getElementById(selector);
        if (element) {
            element.innerText = text;
        }
    };

    for (const type of ['chrome', 'node', 'electron']) {
        replaceText(`${type}-version`, process.versions[type]);
    }


    // Notifications
    const notifyMainBtn = document.getElementById("notifyMain");
    notifyMainBtn.addEventListener('click', () => {
        ipcRenderer.invoke('notify-main', "Message from renderer to main");
    });
});

// contextBridge.exposeInMainWorld('api', {
//     test: () => { console.log('test'); }
// });
