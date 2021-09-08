const consoleLogList = document.querySelector('.editor__console-logs');
// const executeCodeBtn = document.querySelector('.editor__run');
// const resetCodeBtn = document.querySelector('.editor__reset');



let codeEditor = ace.edit("code");
codeEditor.addEventListener("input", () => {
    localStorage.setItem("text", codeEditor.getValue())
})
let consoleMessages = [];
let editorLib = {
    clearConsoleScreen() {
        consoleMessages.length = 0;
        while (consoleLogList.firstChild) {
            consoleLogList.removeChild(consoleLogList.firstChild);
        }
    },
    printToConsole() {
        consoleMessages.forEach(log => {
            const newLogItem = document.createElement('li');
            const newLogText = document.createElement('pre');
            newLogItem.style.fontFamily = `'Roboto Mono', monospace`;
            newLogText.style.fontFamily = `'Roboto Mono', monospace`;

            newLogText.className = log.class;
            newLogText.textContent = `${log.message}`;
            newLogItem.appendChild(newLogText);
            consoleLogList.appendChild(newLogItem);
        })
    },
    init() {
        var selectTheme = document.getElementById("select-theme");
        selectTheme.addEventListener("change", () => {
            var x = selectTheme.options[selectTheme.selectedIndex].value;
            codeEditor.setTheme(`ace/theme/${x}`);
        });

        var selectSize = document.getElementById("font-size");
        selectSize.addEventListener("change", () => {
            var size = selectSize.options[selectSize.selectedIndex].value;
            codeEditor.setFontSize(parseFloat(size))
        });


        codeEditor.setOptions({
            fontFamily: `Consolas`,
            // "Open Sans", "Helvetica", "Arial", sans- serif;
            enableBasicAutocompletion: true,
            enableLiveAutocompletion: true,
        })

        codeEditor.session.setMode("ace/mode/javascript");
        codeEditor.setValue(localStorage.getItem("text") || `console.log("Welcome to Pagnavath JS!");`);
        codeEditor.setTheme(`ace/theme/gob`)
    }
}
let runs = document.getElementById("runs");
runs.addEventListener('click', () => {
    editorLib.clearConsoleScreen();
    const userCode = codeEditor.getValue();
    try {
        new Function(userCode)();
    } catch (err) {
        console.error(err);
    }
    editorLib.printToConsole();
});

editorLib.init();

function timer() {
    var time = document.getElementById("time");
    var date = new Date();
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var seconds = date.getSeconds();
    var times = "AM";
    if (hours > 12) {
        times = "PM";
        hours = hours - 12;
    }
    if (hours === 0) {
        hours = 12
    }
    hours = (hours < 10) ? "0" + hours : hours;
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;
    var display = `${hours}:${minutes}:${seconds} ${times}`;
    time.textContent = display;
    setTimeout(timer, 1000);
}; timer();