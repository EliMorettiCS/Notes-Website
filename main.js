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
    title:"Template Note Title",
        text:"This is the contexts of the template note",
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
        btn.textContent = note.giveTitle()+" ("+notes.indexOf(note)+")";
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
    notes = notes.splice(0,currentNote)
    selectNote(notes.length-1)
    notes[currentNote].changeTitle(document.getElementById("title").value)
    notes[currentNote].changeText(document.getElementById("contents").value)
    localStorage.setItem("cloudNotes", JSON.stringify(notes));
}


document.getElementById("save").onclick = function() {
    console.log("Save Button Clicked")
    notes[currentNote].changeTitle(document.getElementById("title").value)
    notes[currentNote].changeText(document.getElementById("contents").value)
    localStorage.setItem("cloudNotes", JSON.stringify(notes));
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