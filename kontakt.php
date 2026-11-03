<?php
/**
 * FORMA Digital – Formularversand per PHP (Alternative zu FormSubmit)
 *
 * Nutzung: In kontakt.html beim <form> action="kontakt.php" setzen.
 * Voraussetzung: Webspace mit PHP und funktionierender mail()-Funktion
 * (z. B. IONOS, Strato, all-inkl, Hetzner Webhosting).
 */

$empfaenger = 'philippdachtler01@gmail.com';
$host       = preg_replace(['/^www\./', '/:\d+$/'], '', $_SERVER['HTTP_HOST'] ?? 'localhost');
$absender   = 'noreply@' . $host;
$betreff    = 'Neue Anfrage über forma-digital';

function zurueck($ziel) {
	header('Location: ' . $ziel, true, 303);
	exit;
}

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
	zurueck('kontakt.html');
}

// Spam-Schutz: verstecktes Feld muss leer bleiben
if (!empty($_POST['_honey'])) {
	zurueck('danke.html');
}

function feld($name, $max = 500) {
	$wert = isset($_POST[$name]) ? trim((string) $_POST[$name]) : '';
	return mb_substr($wert, 0, $max);
}

$name      = feld('Name', 120);
$firma     = feld('Unternehmen', 160);
$email     = feld('email', 160);
$telefon   = feld('Telefon', 40);
$bereich   = feld('Bereich', 80);
$nachricht = feld('Nachricht', 5000);
$ds        = feld('Datenschutz', 20);

// Zeilenumbrüche in Kopfzeilen verhindern (Header-Injection)
$name  = str_replace(["\r", "\n"], ' ', $name);
$email = str_replace(["\r", "\n"], '', $email);

if ($name === '' || $nachricht === '' || $ds === '' || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
	zurueck('kontakt.html?fehler=1');
}

$text  = "Neue Anfrage über das Kontaktformular\n";
$text .= "=====================================\n\n";
$text .= "Name:         $name\n";
$text .= "Unternehmen:  $firma\n";
$text .= "E-Mail:       $email\n";
$text .= "Telefon:      $telefon\n";
$text .= "Bereich:      $bereich\n\n";
$text .= "Nachricht:\n$nachricht\n\n";
$text .= "-------------------------------------\n";
$text .= "Datenschutzhinweis bestätigt: ja\n";
$text .= "Gesendet am: " . date('d.m.Y H:i') . " Uhr\n";

$kopfzeilen  = "From: FORMA Digital Website <$absender>\r\n";
$kopfzeilen .= "Reply-To: $name <$email>\r\n";
$kopfzeilen .= "MIME-Version: 1.0\r\n";
$kopfzeilen .= "Content-Type: text/plain; charset=UTF-8\r\n";
$kopfzeilen .= "Content-Transfer-Encoding: 8bit\r\n";

$ok = mail($empfaenger, '=?UTF-8?B?' . base64_encode($betreff) . '?=', $text, $kopfzeilen, '-f' . $absender);

zurueck($ok ? 'danke.html' : 'kontakt.html?fehler=1');
