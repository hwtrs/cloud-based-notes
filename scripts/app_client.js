let editor;
let notesList;
let newNoteBtn;
let user_id;
let currentNoteId;

document.addEventListener("DOMContentLoaded", async () => {
    editor = document.getElementById("editor");
    notesList = document.getElementById("notesList");
    newNoteBtn = document.getElementById("newNoteBtn");
    user_id = localStorage.getItem("user_id")
    console.log(user_id)

    // let notes = JSON.parse(localStorage.getItem("notes")) || [];
    let notes;
    const response = await fetch("https://cloud-based-notes-lime.vercel.app/api/notes", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            user_id: user_id
        })
    });
    notes = await response.json();
    console.log(notes)

    let currentNoteIndex = 0;

    function loadNotes() {
        notesList.innerHTML = "";
        notes.forEach((note, index) => {
            let li = document.createElement("li");
            li.textContent = note.title || "Untitled";
            li.onclick = () => selectNote(index);
            notesList.appendChild(li);
        });
    }

    function saveNotes() {
        localStorage.setItem("notes", JSON.stringify(notes));
        console.log("Notes saved!");
    }

    function selectNote(index) {
        currentNoteIndex = index;
        currentNoteId = notes[index].id;
        console.log("Note Id:" + notes[index].id)
        editor.innerHTML = notes[index].contents;
        title.innerHTML = notes[index].title;
        loadNotes();
    }

    newNoteBtn.addEventListener("click", async () => {
        let response = await fetch("https://cloud-based-notes-lime.vercel.app/api/create_note", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                user_id: user_id,
                title: "New Note",
                contents: "New Note Text"
            })
        });
        let data = await response.json();
        let newID = data.id;
        let newNote = { title: "New Note", contents: "New Note Text", id: newID };
        notes.push(newNote);
        currentNoteIndex = notes.length - 1;
        editor.innerHTML = "New Note Text";
        title.innerHTML = newNote.title;
        currentNoteId = newNote.id
        loadNotes();
        saveNotes();
        
    });

    editor.addEventListener("input", () => {
        notes[currentNoteIndex].contents = editor.innerHTML;
        notes[currentNoteIndex].title = title.innerHTML;
        saveNotes();
        loadNotes();
    });

    title.addEventListener("input", () => {
        notes[currentNoteIndex].contents = editor.innerHTML;
        notes[currentNoteIndex].title = title.innerHTML;
        saveNotes();
        loadNotes();
    });

    if (notes.length === 0) {
        notes.push({ title: "New Note", contents: "New Note Text" });
    }

    loadNotes();
    selectNote(0);
    currentNoteId = notes[0].id;
});

let saveTimeout;
let lastSavedContent = "";
let lastSavedTitle = "";

async function saveNote() {
    if ((editor.innerHTML === lastSavedContent) || (title.innerHTML == lastSavedTitle))  {
        return;
    }

    lastSavedContent = editor.innerHTML;
    lastSavedTitle = title.innerHTML;

    const response = await fetch("https://cloud-based-notes-lime.vercel.app/api/save_note", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            id: currentNoteId,
            user_id: user_id,
            title: title.innerHTML,
            contents: editor.innerHTML
        })
    });

    if (response.ok) {
        console.log("Note auto-saved!");
    } else {
        console.error("Auto-save failed.");
    }
}

document.getElementById("editor").addEventListener("input", () => {
    clearTimeout(saveTimeout);
    saveTimeout = setTimeout(saveNote, 1500);
});

setInterval(saveNote, 10000);

