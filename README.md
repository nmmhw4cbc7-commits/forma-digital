# FORMA Digital – Website

Statische Unternehmenswebsite (HTML, CSS, etwas JavaScript). Kein Build-Schritt, keine Abhängigkeiten, keine externen Schriften oder Tracker.

## Seiten

| Datei | Inhalt |
|---|---|
| `index.html` | Startseite |
| `leistungen.html` | Alle sechs Leistungen im Detail |
| `arbeitsweise.html` | Ablauf und Grundsätze |
| `fragen.html` | Häufige Fragen |
| `kontakt.html` | Kontaktformular |
| `danke.html` | Bestätigung nach dem Absenden |
| `impressum.html`, `datenschutz.html` | Rechtstexte |
| `404.html` | Fehlerseite |

Bilder liegen in `img/` (Unsplash-Lizenz), Styles in `css/style.css`, Skripte in `js/main.js`.

## Kontaktformular

Anfragen gehen an **philippdachtler01@gmail.com**. Zwei Varianten sind enthalten:

### A) FormSubmit (Standard, funktioniert auf jedem Hosting, auch GitHub Pages)

Das Formular sendet an `https://formsubmit.co/philippdachtler01@gmail.com`.

1. Website online stellen und das Formular **einmal selbst absenden**.
2. FormSubmit schickt eine Bestätigungsmail an die Gmail-Adresse – den Link darin anklicken.
3. Ab dann kommen alle Anfragen direkt ins Postfach. Antworten mit „Antworten“ gehen an den Absender.

Tipp: Nach der Bestätigung zeigt FormSubmit eine zufällige Adresse (z. B. `https://formsubmit.co/a1b2c3...`). Diese in `kontakt.html` beim `action` eintragen, dann steht die E-Mail-Adresse nicht mehr im Quelltext.

### B) PHP (für klassischen Webspace wie IONOS, Strato, all-inkl)

In `kontakt.html` beim `<form>` `action="kontakt.php"` setzen. `kontakt.php` prüft die Eingaben, hat einen Spam-Schutz und leitet auf `danke.html` weiter. Wird B genutzt, den FormSubmit-Absatz in `datenschutz.html` entfernen.

## Vor dem Livegang ausfüllen

In `impressum.html` und `datenschutz.html` sind gelb markierte Platzhalter in `[eckigen Klammern]`:
Name, Anschrift, Telefon, ggf. USt-IdNr. und der Hosting-Anbieter. Die Rechtstexte sind eine solide Vorlage, aber keine Rechtsberatung.

## Online stellen

- **GitHub Pages:** Repository → Settings → Pages → Branch auswählen → Speichern.
- **Webspace:** Alle Dateien per FTP in das Hauptverzeichnis hochladen.
