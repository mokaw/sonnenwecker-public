# Sonnenwecker

Eine Android-App, entwickelt mit Ionic, Capacitor und Angular.  
Die App sendet dem Nutzer eine lokale Benachrichtigung zur Zeit des Sonnenaufgangs am ausgewählten Ort.

## Funktionen

- Abruf der Sonnenaufgangszeit über eine Weather API
- Stadtwahl über ein Suchfeld
- Anzeige:
  - Aktuelle Temperatur
  - Wetterbeschreibung
  - Sonnenaufgang des aktuellen Tages
- Wecker:
  - Voreingestellt auf den Sonnenaufgang des Folgetages
  - Anpassbar über Ionic DateTime
  - Kann deaktiviert werden
- Lokale Benachrichtigung bei Sonnenaufgang
- Speicherung von Stadt und Weckzeit in Ionic Storage

## Technologien

- Ionic Framework
- Angular
- Capacitor 
- Weather API

## API-Schlüssel

Ein Beispiel für die Umgebungsdatei befindet sich unter src/environments/environment.example.ts. Dort kann der eigene API-Schlüssel (von https://www.weatherapi.com/) eingetragen werden. Die Datei muss anschließend in environment.ts umbenannt werden.


## Entwicklung & Ausführung

Voraussetzungen:
- Node.js und npm installiert
- Ionic CLI installiert (npm install -g @ionic/cli)
- Android Studio (für Android-Build)


Installation:
 ```bash
npm install
```
Entwicklung im Browser:
 ```bash
ionic serve
```
Entwicklung in Android Studio:
 ```bash
ionic build

npx cap sync

npx cap open android
```
