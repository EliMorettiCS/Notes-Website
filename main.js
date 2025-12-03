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

createNote()
createNote()
createNote()
logNote(1);
console.log(notes[1].giveTitle())

document.getElementById("title").value = notes[1].giveTitle();
document.getElementById("date").value = notes[1].giveDate();
document.getElementById("contents").value = notes[1].giveText();