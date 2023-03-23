//! Onload Funktionen

function init() {
    includeHTML();
    note = loadOpenNotes();
    pinnedNote = loadPinNotes();
    archive = loadArchivedNotes();
    trash = loadTrashedNotes();
    showNotes();
    showPinnedNotes();

}

//! Header und Footer in index.html laden

async function includeHTML() {
    let includeElements = document.querySelectorAll("[w3-include-html]");
    for (let i = 0; i < includeElements.length; i++) {
        const element = includeElements[i];
        file = element.getAttribute("w3-include-html"); // "includes/header.html"
        let resp = await fetch(file);
        if (resp.ok) {
            element.innerHTML = await resp.text();
        } else {
            element.innerHTML = "Page not found";
        }
    }
}

//! Globale Variablen

let note = []; // für Zeilenumbrüche und Notizen
let pinnedNote = []; // Array für Pins
let archive = [];
let trash = [];

//! MENÜ: Den Text bei den Kategoriensymbolen auf und zu

function toggleMenu() {

    // Es wird nach allen Elementen gesucht, die die Klasse 'menu-icon-text' haben
    let elements = document.querySelectorAll('.menu-icon-text');
    // Es wird eine Schleife erstellt, die jedes Element durchläuft
    elements.forEach((element) => {
        // Es wird nach dem ersten Link-Element innerhalb eines Elements mit der Klasse 'menu-icon-text' gesucht.
        let a = element.querySelector('a');
        if (a.classList.contains('d-none')) {
            a.classList.remove('d-none');
        } else {
            a.classList.add('d-none');
        }
    });
}

//! TEXTAREA: Inhalt Textarea löschen

function clearTextArea() {
    let clear = document.getElementById('autoresizing');
    clear.value = ''

}

//! TEXTAREA: Notizen zum Dokument hinzufügen

function addNote() {
    let noteText = document.getElementById('autoresizing').value;
    //Der Inhalt von noteText wird in ein Array geteilt, indem an jeder \n Position ein neues Element erstellt wird
    let noteArray = noteText.split("\n");
    //Die Elemente des Arrays werden dann in einen String umgewandelt, wobei an jeder Stelle ein <br> eingefügt wird
    let noteString = noteArray.join("<br>");
    //Nur wenn noteText nicht leer ist, wird der Inhalt von noteString der Variable note hinzugefügt und die Funktion showNotes() aufgerufen
    if (noteText != '') {
        note.push(noteString);
        showNotes();
    }

}

//! NOTIZ: Open Note anzeigen

function showNotes() {
    let myNotes = document.getElementById('mynotes')
    let filter1 = document.getElementById('archived-notes')
    let filter2 = document.getElementById('trashed-notes')
    let locSto = localStorage.getItem('activeNote')
    filter1.innerHTML = ''
    filter2.innerHTML = ''
    myNotes.innerHTML = '';
    if (locSto == '[]') {
        myNotes.innerHTML = `    <div class="message-container">
        <span class="emoji">👋</span>
        <p class="message"> You currently have no open notes!</p>
    </div>`
    }
    else {

        for (let i = 0; i < note.length; i++) {
            myNotes.innerHTML += `

                                <br>
                <div id="open-notes-${i}" class="note-box">

                    <label>CATEGORY: OPEN</label>
                    <div>
                        <div class="notes">
                            <div class="content">${note[i]}</div>
                            <div class="dialog">
                                <div onclick="pinNote(${i})"><img
                                        src="/davacad_7/notizblock/img/bookmark-regular-not-active.svg" title="Pin Note" alt="Pin Note">
                                </div>
                                <div><img src="/davacad_7/notizblock/img/pen-to-square-solid.svg" title="Edit Note" alt="Edit Note">
                                </div>
                                <div onclick="archiveNote(${i})"><img src="/davacad_7/notizblock/img/circle-down-regular.svg" title="Archive Note" alt="Archive Note">
                                </div>
                                <div onclick="moveToTrashOpen(${i})"><img
                                        src="/davacad_7/notizblock/img/trash-can-regular.svg" title="Move to Trash" alt="Trash Note">
                                </div>

                            </div>

                        </div>

                    </div>

                </div>
                `;
        }
    }

    document.getElementById('autoresizing').value = ''
    saveNotes();
}


//! NOTIZ: Angepinnte Notiz anzeigen

function showPinnedNotes() {
    let pinNotes = document.getElementById('pinned-note')
    let filter1 = document.getElementById('archived-notes')
    let filter2 = document.getElementById('trashed-notes')
    filter1.innerHTML = ''
    filter2.innerHTML = ''
    pinNotes.innerHTML = ''
    for (let i = 0; i < pinnedNote.length; i++) {
        pinNotes.innerHTML += `
        <br>
                <label>CATEGORY: PINNED</label>
                <div> 
                    <div class="notes ispinned">
                        <div class="content">
                        ${pinnedNote[i]}
                        </div>
                         <div class="dialog">
                                <div onclick="unPinNote(${i})"><img
                                        src="/davacad_7/notizblock/img/bookmark-solid.svg" title="Pin Note" alt="Pin Note">
                                </div>
                                <div><img src="/davacad_7/notizblock/img/pen-to-square-solid.svg" title="Edit Note" alt="Edit Note">
                                </div>
                                <div onclick="moveToTrashPin(${i})"><img
                                        src="/davacad_7/notizblock/img/trash-can-regular.svg" title="Move to Trash" alt="Trash Note">
                                </div>

                            </div>

                    </div>

                </div>
        </div>

`

    }
    document.getElementById('autoresizing').value = ''
    saveNotes();
}

function openNotes() {
    showNotes();
    showPinnedNotes();

}

//! NOTIZ: Archivierte Notiz anzeigen

function showArchivedNotes() {
    let archivedNotes = document.getElementById('archived-notes')
    let filter1 = document.getElementById('pinned-note')
    let filter2 = document.getElementById('mynotes')
    let filter3 = document.getElementById('trashed-notes')
    let locSto = localStorage.getItem('archivedNote')
    filter1.innerHTML = ''
    filter2.innerHTML = ''
    filter3.innerHTML = ''
    archivedNotes.innerHTML = ''
    if (locSto == '[]') {
        archivedNotes.innerHTML = `    <div class="message-container">
        <span class="emoji">👋</span>
        <p class="message"> You currently have no open notes!</p>
    </div>`
    }
    else {
        for (let i = 0; i < archive.length; i++) {

            archivedNotes.innerHTML += `
        <br>
                <label>CATEGORY: ARCHIVED</label>
                <div> 
                    <div class="notes issrchived">
                        <div class="content">
                        ${archive[i]}
                        </div>
                         <div class="dialog">

                                <div onclick="unSetArchiveNote(${i})"><img
                                        src="/davacad_7/notizblock/img/lightbulb-regular.svg" title="Restore Note" alt="Restore Note">
                                </div>

                                <div onclick="moveToTrashArchived(${i})"><img
                                        src="/davacad_7/notizblock/img/trash-can-regular.svg" title="Move to Trash" alt="Trash Note">
                                </div>

                            </div>

                    </div>

                </div>
        </div>

`

        }
        document.getElementById('autoresizing').value = ''

        saveNotes();
    }
}

//! Notizen filtern

function showTrashedNotes() {
    let trashedNotes = document.getElementById('trashed-notes')
    let filter1 = document.getElementById('pinned-note')
    let filter2 = document.getElementById('mynotes')
    let filter3 = document.getElementById('archived-notes')
    let locSto = localStorage.getItem('trashedNote')
    filter1.innerHTML = ''
    filter2.innerHTML = ''
    filter3.innerHTML = ''
    trashedNotes.innerHTML = ''
    if (locSto == '[]') {
        trashedNotes.innerHTML = `    <div class="message-container">
        <span class="emoji">👋</span>
        <p class="message"> You currently have no open notes!</p>
    </div>`
    }
    else {
        for (let i = 0; i < trash.length; i++) {

            trashedNotes.innerHTML += `
        <br>
                <label>CATEGORY: TRASHED</label>
                <div> 
                    <div class="notes istrashed">
                        <div class="content">
                        ${trash[i]}
                        </div>
                         <div class="dialog">

                                <div onclick="togglePopup(${i})"><img
                                        src="/davacad_7/notizblock/img/trash-can-regular.svg" alt="Trash Note">
                                </div>

                            </div>

                    </div>

                </div>
        </div>

`

        }
        document.getElementById('autoresizing').value = ''

        saveNotes();

    }
}

//! NOTIZ: Notizen speichern

function saveNotes() {
    let newNote = JSON.stringify(note);
    let pinNote = JSON.stringify(pinnedNote);
    let archiveNote = JSON.stringify(archive);
    let trashNote = JSON.stringify(trash);
    localStorage.setItem('activeNote', newNote)
    localStorage.setItem('pinnedNote', pinNote);
    localStorage.setItem('archivedNote', archiveNote);
    localStorage.setItem('trashedNote', trashNote);

}

//! NOTIZ: Gespeicherte Notizen laden

function loadOpenNotes() {
    let newNote = localStorage.getItem('activeNote')

    if (newNote) {
        note = JSON.parse(newNote)
    }

    return note;

}

function loadPinNotes() {
    let pinNote = localStorage.getItem('pinnedNote')
    if (pinNote) {
        return JSON.parse(pinNote)
    }

    return [];
}

function loadArchivedNotes() {
    let archiveNote = localStorage.getItem('archivedNote')
    if (archiveNote) {
        return JSON.parse(archiveNote)
    }

    return [];

}

function loadTrashedNotes() {
    let trashNote = localStorage.getItem('trashedNote')
    if (trashNote) {
        return JSON.parse(trashNote)
    }

    return [];

}

//! NOTIZFUNKTIONEN: Notes von Open nach Pinned und zurück --> verschieben, speichern, laden

function pinNote(i) {
    let noteText = note[i];
    pinnedNote.push(noteText);
    note.splice(i, 1);
    showAll();
    saveNotes();
}

function unPinNote(i) {
    let noteText = pinnedNote[i];
    note.push(noteText);
    pinnedNote.splice(i, 1);
    showAll();
    saveNotes();
}

//! NOTIZFUNKTIONEN: Notes von Open nach Archiv und zurück --> verschieben, speichern, laden

function archiveNote(i) {

    let noteText = note[i];
    archive.push(noteText);
    note.splice(i, 1);
    showAll();
    saveNotes();

}

function unSetArchiveNote(i) {

    let noteText = archive[i];
    note.push(noteText);
    archive.splice(i, 1);
    showAll();
    saveNotes();

}

//! NOTIZFUNKTIONEN:  Funktionen in den Papierkorb verschieben

function moveToTrashOpen(i) {
    let noteText = note[i]
    trash.push(noteText)
    note.splice(i, 1)
    showAll();
    saveNotes();

}

function moveToTrashPin(i) {
    let noteText = pinnedNote[i]
    trash.push(noteText)
    pinnedNote.splice(i, 1)
    showAll();
    saveNotes();

}

function moveToTrashArchived(i) {
    let noteText = archive[i]
    trash.push(noteText)
    note.splice(i, 1)
    showAll();
    saveNotes();

}


//! LÖSCHEN: Notizem permanent löschen

function deleteTrashedNotePermanently(i) {
    trash.splice(i, 1)
    showTrashedNotes();
    saveNotes();
    togglePopup();

}

//! LÖSCHEN: Popup für löschen anzeigen

// Const wird hier verwendet, weil es sicherstellen soll, dass die Variable nicht geändert wird. In diesem Fall ist die Variable "popup" ein Element auf der Seite und die sollte nicht geändert werden. Mit const wird sichergestellt, dass der Wert unverändert bleibt.

function togglePopup() {
    const popup = document.getElementById('popup');
    const popupBackground = document.getElementById('popup-background');
    popup.classList.toggle('d-none');
    popupBackground.classList.toggle('d-none')

    const confirmButton = document.getElementById('confirm');
    const rejectButton = document.getElementById('reject');

    confirmButton.addEventListener('click', deleteTrashedNotePermanently);
    rejectButton.addEventListener('click', togglePopup);
}

//! NOTIZ: Anzeige Funktionen

function showAll() {
    showNotes();
    showPinnedNotes();

}

// Offene Arbeiten

//! Den Notizen kann ein Titel hinzugefügt werden

//! Die Notizen werden mit einem Datumsstempel versehen

//! Offene und angepinnte Notizen können bearbeitet werden