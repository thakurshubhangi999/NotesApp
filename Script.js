// scripts.js

document.addEventListener("DOMContentLoaded", () => {
    const noteText = document.getElementById("note-text");
    const saveNoteButton = document.getElementById("save-note");
    const clearNoteButton = document.getElementById("clear-note");
    const notesList = document.getElementById("notes-list");
  
    // Load notes from localStorage
    loadNotes();
  
    // Save note
    saveNoteButton.addEventListener("click", () => {
      const noteContent = noteText.value.trim();
      if (noteContent) {
        addNoteToDOM(noteContent);
        saveNoteToLocalStorage(noteContent);
        noteText.value = "";
      }
    });
  
    // Clear note text area
    clearNoteButton.addEventListener("click", () => {
      noteText.value = "";
    });
  
    // Delete note
    notesList.addEventListener("click", (event) => {
      if (event.target.tagName === "BUTTON") {
        const note = event.target.parentElement;
        removeNoteFromLocalStorage(note.firstChild.textContent);
        notesList.removeChild(note);
      }
    });
  
    function addNoteToDOM(content) {
      const li = document.createElement("li");
      li.textContent = content;
      const deleteButton = document.createElement("button");
      deleteButton.textContent = "Delete";
      li.appendChild(deleteButton);
      notesList.appendChild(li);
    }
  
    function saveNoteToLocalStorage(content) {
      let notes = JSON.parse(localStorage.getItem("notes")) || [];
      notes.push(content);
      localStorage.setItem("notes", JSON.stringify(notes));
    }
  
    function removeNoteFromLocalStorage(content) {
      let notes = JSON.parse(localStorage.getItem("notes")) || [];
      notes = notes.filter(note => note !== content);
      localStorage.setItem("notes", JSON.stringify(notes));
    }
  
    function loadNotes() {
      const notes = JSON.parse(localStorage.getItem("notes")) || [];
      notes.forEach(note => addNoteToDOM(note));
    }
  });
  