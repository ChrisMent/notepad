//! Aktive Kategorie markieren DESKTOP


// Die Variable "icons" speichert das Element mit der ID "menu-icons". 
let icons = document.getElementById("menu-icons");

// In der Variable "icon" speichern wir alle Elemente, die die Klasse "menu-icon-text" haben.
let icon = icons.getElementsByClassName("menu-icon-text");

// Mit einer For-Schleife iterieren wir über die Elemente in der Variable "icon".
for (let i = 0; i < icon.length; i++) {

    // Wir fügen jedem Element in der Variable "icon" einen Event-Listener hinzu, der eine Funktion aufruft, sobald das Element angeklickt wird.
    icon[i].addEventListener("click", function () {

        // In der Funktion, die aufgerufen wird, wenn das Element angeklickt wird, speichern wir alle Elemente, die die Klasse "active" haben, in der Variablen "current".

        let current = document.getElementsByClassName("active");

        // Wenn die Variable "current" mehr als ein Element enthält, ersetzen wir die Klasse "active" durch eine leere Zeichenfolge (entfernen wird die Klasse: .active)
        if (current.length > 0) {
            current[0].className = current[0].className.replace(" active", "");
        }

        // Wenn das Element angeklickt wird, wird die Klasse "active" des angeklickten Elements hinzugefügt.
        this.className += " active";
    });
}

//! Aktive Kategorie markieren MOBILE




//! MENÜ: Mobile Menu einblenden wenn alles geladen ist

function toggleMenuMobile() {
    let elements = document.getElementById('menu-icons-mobile');
    if (elements.classList.contains('visible')) {
        elements.classList.remove('visible');
        elements.classList.add('d-none');
    } else {
        elements.classList.add('visible');
        elements.classList.remove('d-none');

        // Event-Listener hinzufügen, nachdem das Menü sichtbar gemacht wurde
        let iconMobile = elements.querySelectorAll(".menu-icon-text-mobile");

        for (let i = 0; i < iconMobile.length; i++) {
            iconMobile[i].addEventListener("click", function () {
                let currentActive = elements.querySelector(".active");

                if (currentActive) {
                    currentActive.classList.remove("active");
                }

                this.classList.add("active");
            });
        }
    }
}



//! Textarea in dynamisch in der Höhe anpassen


// Definiere eine Variable "textarea" und weise ihr das Element zu, das die ID "autoresizing" hat
textarea = document.querySelector("#autoresizing");
// Füge dem Element einen Eventlistener hinzu, der bei einem Input auf das Element eine Funktion ausführt
textarea.addEventListener('input', autoResize, false);

// Definiere eine Funktion "autoResize", die die Höhe des Elements anpasst
function autoResize() {
    // Setze die Höhe des Elements auf "auto"
    this.style.height = 'auto';
    // Setze die Höhe des Elements auf die Scrollhöhe des Elements + 'px'
    this.style.height = this.scrollHeight + 'px';
}

//! Textarea vergrößern beim Klick und verkleinern beim verlassen


// Mit der Variable "textArea" wird das Element mit der ID "autoresizing" aus dem DOM ausgewählt.
let textArea = document.getElementById("autoresizing");

// Der click-Event wird auf das Element "textArea" definiert und die Höhe des Elements auf 130px gesetzt.
textArea.addEventListener("input", function () {
    textArea.style.height = "130px";
});

textArea.addEventListener("click", function () {
    textArea.style.height = "130px";
});

//! Der blur-Event wird auf das Element "textArea" definiert und die Höhe des Elements auf 62px gesetzt.

// textArea.addEventListener("blur", function () {
//     textArea.style.height = "62px";
// });

//! Content unter Textarea dynamisch verschieben


// variables textareaSize und notesShift werden definiert
let textareaSize = document.getElementById("autoresizing");
let notesShift = document.getElementById("mynotes");
let pinnedNoteShift = document.getElementById("pinned-note");

// ein EventListener wird hinzugefügt, der auf "input" im textareaSize reagiert
textareaSize.addEventListener("input", function () {

    // es wird ein Array erstellt, welches alle Zeilenumbrüche erfasst
    let linebreaks = (textareaSize.value.match(/\n/g) || []).length;

    // und das margin-top im notesShift entsprechend angepasst
    notesShift.style.marginTop = linebreaks * 10 + "px";
    pinnedNoteShift.style.marginTop = linebreaks * 15 + "px";
});

//! Textarea maximale Zeichen Anzahl pro Zeile definieren


// const MAX_CHARS_PER_LINE = 300;

// const textareaLine = document.getElementById('autoresizing');

// textareaLine.addEventListener('keypress', (evt) => {
//     const lines = textareaLine.value.split('\n');
//     const currentLineLength = lines[lines.length - 1].length;

//     if (currentLineLength >= MAX_CHARS_PER_LINE) {
//         evt.preventDefault();

//     }
// });

// Offene Arbeiten

//! Prüfen in welcher Kategorie man sich gerade befindet und alles andere ausblenden. Linke Leiste (Notes, Archive, Trash)



