console.clear()
console.log("Program Started")
let currentDate = new Date();
let simpleDate = currentDate.getFullYear()+"/"+currentDate.getDate()+"/"+currentDate.getMonth()
let notesAmount = 0;
let notesCreated = 0;
let Userinput = "";
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
    document.getElementById("title").value = notes[noteNum].giveTitle();
    document.getElementById("date").value = notes[noteNum].giveDate();
    document.getElementById("contents").value = notes[noteNum].giveText();
    const notesContainer = document.getElementById("notes");
    notesContainer.innerHTML = "";
    notes.forEach((note) => {
        const btn = document.createElement("button");
        btn.textContent = note.giveTitle();
        if (notes.indexOf(note) == noteNum) {
            btn.id="selected";
        }
        notesContainer.appendChild(btn);
    });

}

createNote();
createNote();
createNote();
notes[1].changeTitle("Wow")
selectNote(1);