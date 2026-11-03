/* FORMA Digital – Skripte */
(function () {
	'use strict';

	// Mobiles Menü
	var knopf = document.getElementById('menueKnopf');
	var nav = document.getElementById('hauptnav');
	if (knopf && nav) {
		knopf.addEventListener('click', function () {
			var offen = nav.classList.toggle('offen');
			knopf.setAttribute('aria-expanded', offen ? 'true' : 'false');
		});
	}

	// Jahreszahl im Fußbereich
	var jahr = document.getElementById('jahr');
	if (jahr) { jahr.textContent = new Date().getFullYear(); }

	// "Nach oben"-Knopf
	var nachOben = document.getElementById('nachOben');
	if (nachOben) {
		window.addEventListener('scroll', function () {
			if (window.pageYOffset > 500) {
				nachOben.classList.add('sichtbar');
			} else {
				nachOben.classList.remove('sichtbar');
			}
		});
	}

	// Kontaktformular
	var form = document.getElementById('kontaktformular');
	if (!form) { return; }

	// Weiterleitung nach dem Absenden: absolute Adresse der Danke-Seite
	var weiter = form.querySelector('input[name="_next"]');
	if (weiter && /^https?:/.test(window.location.protocol)) {
		weiter.value = new URL('danke.html', window.location.href).href;
	}

	// Leistung aus der Adresse vorbelegen, z. B. kontakt.html?thema=Website
	var thema = new URLSearchParams(window.location.search).get('thema');
	var auswahl = document.getElementById('bereich');
	if (thema && auswahl) {
		for (var i = 0; i < auswahl.options.length; i++) {
			if (auswahl.options[i].value === thema) { auswahl.selectedIndex = i; }
		}
	}

	// Fehlermeldung der PHP-Variante anzeigen
	if (/[?&]fehler=1/.test(window.location.search)) {
		var meldung = document.getElementById('formMeldung');
		if (meldung) { meldung.style.display = 'block'; }
	}

	function pruefe(feld) {
		var box = feld.closest('.feld');
		var ok = feld.checkValidity();
		if (box) { box.classList.toggle('fehler', !ok); }
		return ok;
	}

	var pflichtfelder = form.querySelectorAll('[required]');
	Array.prototype.forEach.call(pflichtfelder, function (feld) {
		feld.addEventListener('blur', function () { pruefe(feld); });
		feld.addEventListener('input', function () {
			if (feld.closest('.feld.fehler')) { pruefe(feld); }
		});
	});

	form.setAttribute('novalidate', 'novalidate');
	form.addEventListener('submit', function (e) {
		var alleOk = true;
		var erstes = null;
		Array.prototype.forEach.call(pflichtfelder, function (feld) {
			if (!pruefe(feld)) {
				alleOk = false;
				if (!erstes) { erstes = feld; }
			}
		});
		if (!alleOk) {
			e.preventDefault();
			erstes.focus();
			return;
		}
		var senden = form.querySelector('button[type="submit"]');
		if (senden) {
			senden.disabled = true;
			senden.textContent = 'Wird gesendet …';
		}
	});

	// Beim Zurückgehen im Browser den Knopf wieder freigeben
	window.addEventListener('pageshow', function () {
		var senden = form.querySelector('button[type="submit"]');
		if (senden) {
			senden.disabled = false;
			senden.textContent = 'Anfrage absenden';
		}
	});
})();
