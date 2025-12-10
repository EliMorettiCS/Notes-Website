console.clear()
console.log("Program Started")
let currentDate = new Date()
let simpleDate = currentDate.toLocaleDateString("en-us")
let notesAmount = 0;
let notesCreated = 0;
let Userinput = "";
let currentNote = 0;
let notes = [
]
let templateNote = {
    title:"",
        text:"",
        date:simpleDate,
        logSelf : function() {
            console.log(" --"+this.title+"--"+" Created On:"+this.date)
            console.log("   "+this.text)
        },
        giveTitle : function() {
            return this.title;
        },
        giveText : function() {
            return this.text;
        },
        giveDate : function() {
            return this.date;
        },
        changeTitle : function(newTitle) {
            this.title = newTitle;
        },
        changeText : function(newText) {
            this.text = newText;
        },
        changeDate : function(newDate) {
            this.date = newDate;
        }
}
function logNote(findNum) {
    notes[findNum].logSelf();
}
function createNote() {
    notes.push({...templateNote});
    notesAmount=notes.length;
    notesCreated=notesCreated+1;
}

function selectNote(noteNum) {
    currentNote = noteNum
    document.getElementById("title").value = notes[noteNum].giveTitle();
    document.getElementById("date").value = notes[noteNum].giveDate();
    document.getElementById("contents").value = notes[noteNum].giveText();
    const notesContainer = document.getElementById("notes");
    notesContainer.innerHTML = "";
    notes.forEach((note) => {
        const btn = document.createElement("button");
        if (note.giveTitle() == "") {
            btn.textContent = "Untitled";
        }
        else{
            btn.textContent = note.giveTitle();
        }
        btn.name="name:"+notes.indexOf(note); // NOTE NAME IS name:NUMBER (name:1,name:27)
        btn.onclick = function() {
            selectNote(notes.indexOf(note));
        }
        if (notes.indexOf(note) == noteNum) {
            btn.id="selected";
        }
        notesContainer.appendChild(btn);
    });

}

document.getElementById("newNote").onclick = function() {
    createNote()
    selectNote(notes.length-1)
    notes[currentNote].changeTitle(document.getElementById("title").value)
    notes[currentNote].changeText(document.getElementById("contents").value)
    localStorage.setItem("cloudNotes", JSON.stringify(notes));
}

document.getElementById("deleteNote").onclick = function() {
    if (currentNote != 0){
            notes.splice(currentNote,1)
            currentNote -= 1;
            selectNote(currentNote)
            notes[currentNote].changeTitle(document.getElementById("title").value)
            notes[currentNote].changeText(document.getElementById("contents").value)
            localStorage.setItem("cloudNotes", JSON.stringify(notes));
        }
}

document.getElementById("save").onclick = function() {
    console.log("Save Button Clicked")
    notes[currentNote].changeTitle(document.getElementById("title").value)
    notes[currentNote].changeText(document.getElementById("contents").value)
    localStorage.setItem("cloudNotes", JSON.stringify(notes));
    selectNote(currentNote)
}

document.getElementById("settings").onclick = function() {
    document.getElementById("settingsPopup").style.display="flex"
    document.getElementById("settingsPopup").style.opacity = "100%"
}

document.getElementById("settingsExit").onclick = function() {
    document.getElementById("settingsPopup").style.display = "none"
    document.getElementById("settingsPopup").style.opacity = "0%"
}




let cloudNotes = JSON.parse(localStorage.getItem("cloudNotes"))
notes = []
cloudNotes.forEach((cloudNote) => {
    let cloudNoteTitle = cloudNote.title;
    let cloudNoteContent = cloudNote.text;
    let cloudNoteDate = cloudNote.date;
    notes.push({...templateNote});
    notes[notes.length-1].changeTitle(cloudNoteTitle);
    notes[notes.length-1].changeText(cloudNoteContent);
    notes[notes.length-1].changeDate(cloudNoteDate);
})

selectNote(notes.length-1)

let highContrast = false;
document.getElementById("highContrast").classList.remove("on")
document.getElementById("highContrast").classList.add("off")
document.getElementById("highContrast").onclick = function() {
    if (highContrast){
        highContrast = false;
    }
    else {
        highContrast = true;
    }

    if (highContrast) {
        document.getElementById("highContrast").classList.remove("off")
        document.getElementById("highContrast").classList.add("on")
        document.documentElement.style.setProperty("--mainDark","rgba(0, 0, 0, 1)");
        document.documentElement.style.setProperty("--main","rgba(255, 255, 255, 1)");
        document.documentElement.style.setProperty("--mainLight","rgba(0, 0, 0, 1)");
        document.documentElement.style.setProperty("--blackGrey","rgb(15, 15, 15)");
        document.documentElement.style.setProperty("--whiteGrey","rgba(0, 0, 0, 1)");
    }
    else {
        document.getElementById("highContrast").classList.remove("on")
        document.getElementById("highContrast").classList.add("off")
        document.documentElement.style.setProperty("--mainDark","rgb(27,27,27)");
        document.documentElement.style.setProperty("--main","rgb(47, 47, 47)");
        document.documentElement.style.setProperty("--mainLight","rgb(87,87,87)");
        document.documentElement.style.setProperty("--blackGrey","rgb(15, 15, 15)");
        document.documentElement.style.setProperty("--whiteGrey","rgb(240, 240, 240)");
    }
}

let colorIndependance = false;
document.getElementById("colorIndependance").classList.remove("on")
document.getElementById("colorIndependance").classList.add("off")
document.getElementById("colorIndependance").onclick = function() {
    if (colorIndependance){
        colorIndependance = false;
    }
    else {
        colorIndependance = true;
    }
    if (colorIndependance){
        document.getElementById("colorIndependance").classList.remove("off")
        document.getElementById("colorIndependance").classList.add("on")
        document.documentElement.style.setProperty("--colorDependentBorder","dashed");
    }
    else {
        document.getElementById("colorIndependance").classList.remove("on")
        document.getElementById("colorIndependance").classList.add("off")
        document.documentElement.style.setProperty("--colorDependentBorder","solid");
    }
}

let animatedElements = true;
document.getElementById("animatedElements").classList.remove("off")
document.getElementById("animatedElements").classList.add("on")
document.getElementById("animatedElements").onclick = function() {
    if (animatedElements){
        animatedElements = false;
    }
    else {
        animatedElements = true;
    }
    if (animatedElements){
        document.getElementById("animatedElements").classList.remove("off")
        document.getElementById("animatedElements").classList.add("on")
        document.documentElement.style.setProperty("--animations","all");
    }
    else {
        document.getElementById("animatedElements").classList.remove("on")
        document.getElementById("animatedElements").classList.add("off")
        document.documentElement.style.setProperty("--animations","none");
    }
}

let color = 1;
document.getElementById("color").onclick = function() {
    if (color == 5){
        color = 1;
    }
    else{
        color += 1;
    }
    if (color==1){
        document.documentElement.style.setProperty("--accent","rgba(255, 127, 127, 1)");
    }
    if (color==2){
        document.documentElement.style.setProperty("--accent","rgba(129, 127, 255, 1)");
    }
    if (color==3){
        document.documentElement.style.setProperty("--accent","rgba(185, 255, 185, 1)");
    }
    if (color==4){
        document.documentElement.style.setProperty("--accent","rgba(250, 163, 255, 1)");
    }
    if (color==5){
        document.documentElement.style.setProperty("--accent","rgba(255, 176, 127, 1)");
    }
}

let roundness = 15;
document.getElementById("roundness").onclick = function() {
    if (roundness == 15){
        roundness = 0;
    }
    else if (roundness == 0){
        roundness = 5
    }
    else if (roundness == 5){
        roundness = 10
    }
    else if (roundness == 10){
        roundness = 15
    }
    document.documentElement.style.setProperty("--globalRadius",roundness+"px");
}

let soundEffects = false;
document.getElementById("soundEffects").onclick = function() {
    if (soundEffects){
        soundEffects = false;
    }
    else {
        soundEffects = true;
    }
}

let backgroundMusic = false;
document.getElementById("backgroundMusic").onclick = function() {
    if (backgroundMusic){
        backgroundMusic = false;
    }
    else {
        backgroundMusic = true;
    }
}

function handleShortcut(event) {
    if (event.key === "ArrowLeft" && event.shiftKey) {
        event.preventDefault();
        if (currentNote != 0){
            notes[currentNote].changeTitle(document.getElementById("title").value)
            notes[currentNote].changeText(document.getElementById("contents").value)
            localStorage.setItem("cloudNotes", JSON.stringify(notes));
            currentNote -= 1;
            selectNote(currentNote)
        }
    }
    if (event.key === "ArrowRight" && event.shiftKey) {
        event.preventDefault();
        if (currentNote != notes.length-1){
            notes[currentNote].changeTitle(document.getElementById("title").value)
            notes[currentNote].changeText(document.getElementById("contents").value)
            localStorage.setItem("cloudNotes", JSON.stringify(notes));
            currentNote += 1;
            selectNote(currentNote)
        }
    }
    if (event.key === "ArrowUp" && event.shiftKey) {
        event.preventDefault();
        createNote()
        selectNote(notes.length-1)
        notes[currentNote].changeTitle(document.getElementById("title").value)
        notes[currentNote].changeText(document.getElementById("contents").value)
        localStorage.setItem("cloudNotes", JSON.stringify(notes));
    }
    if (event.key === "ArrowDown" && event.shiftKey) {
        event.preventDefault();
        if (currentNote != 0){
            notes.splice(currentNote,1)
            currentNote -= 1;
            selectNote(currentNote)
            notes[currentNote].changeTitle(document.getElementById("title").value)
            notes[currentNote].changeText(document.getElementById("contents").value)
            localStorage.setItem("cloudNotes", JSON.stringify(notes));
        }
    }
}
document.addEventListener("keydown", handleShortcut);



document.getElementById("info").onclick = function() {
    document.getElementById("infoPopup").style.display="flex"
    document.getElementById("infoPopup").style.opacity = "100%"
}

document.getElementById("infoExit").onclick = function() {
    document.getElementById("infoPopup").style.display = "none"
    document.getElementById("infoPopup").style.opacity = "0%"
}