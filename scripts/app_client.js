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

    function selectNote(index) {
        currentNoteIndex = index;
        editor.innerHTML = notes[index].contents;
    }

    editor.addEventListener("input", () => {
        notes[currentNoteIndex].content = editor.innerHTML;
    });

    newNoteBtn.addEventListener("click", () => {
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