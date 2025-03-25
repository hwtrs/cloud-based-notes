document.addEventListener("DOMContentLoaded", async () => {
    const editor = document.getElementById("editor");
    const notesList = document.getElementById("notesList");
    const newNoteBtn = document.getElementById("newNoteBtn");


    const response = await fetch("http://localhost:3000/notes");
    const notes = await response.json();

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
        console.log("herro")
    }

    function selectNote(index) {
        const savedNotes = JSON.parse(localStorage.getItem("notes")) || [];
        console.log(savedNotes)

        currentNoteIndex = index;
        editor.innerHTML = savedNotes[index].contents;
    }

    editor.addEventListener("input", () => {
        saveNotes();
        notes[currentNoteIndex].contents = editor.innerHTML;
    });

    newNoteBtn.addEventListener("click", () => {
        saveNotes();
        let newNote = { title: "New Note", contents: "" };
        notes.push(newNote);
        currentNoteIndex = notes.length - 1;
        editor.innerHTML = "";
        loadNotes();
    });

    if (notes.length === 0) {
        notes.push({ title: "New Note", contents: "" });
    }

    loadNotes();
    selectNote(0);
});

const noteInput = document.getElementById("editor");

noteInput.addEventListener("input", () => {
    localStorage.setItem("currentNote", noteInput.value);
});
