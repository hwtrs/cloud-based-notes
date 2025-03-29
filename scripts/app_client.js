document.addEventListener("DOMContentLoaded", async () => {
    const editor = document.getElementById("editor");
    const notesList = document.getElementById("notesList");
    const newNoteBtn = document.getElementById("newNoteBtn");
    const user_id = localStorage.getItem("user_id")
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
