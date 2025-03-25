document.addEventListener("DOMContentLoaded", async () => {
    const editor = document.getElementById("editor");
    const notesList = document.getElementById("notesList");
    const newNoteBtn = document.getElementById("newNoteBtn");

    let notes = JSON.parse(localStorage.getItem("notes")) || [];
    if (notes.length === 0) {
        const response = await fetch("http://localhost:3000/notes");
        notes = await response.json();
    }

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
        editor.innerHTML = notes[index].contents;
        title.innerHTML = notes[index].title;
        loadNotes();
    }

    newNoteBtn.addEventListener("click", () => {
        let newNote = { title: "New Note", contents: "" };
        notes.push(newNote);
        currentNoteIndex = notes.length - 1;
        editor.innerHTML = "";
        title.innerHTML = newNote.title;
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
        notes.push({ title: "New Note", contents: "" });
    }

    loadNotes();
    selectNote(0);
});
