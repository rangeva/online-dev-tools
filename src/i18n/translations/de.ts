import { Translations } from '@/types/i18n';

export const de: Translations = {
  // Common
  common: {
    search: 'Suchen',
    back: 'Zurück',
    copy: 'Kopieren',
    clear: 'Löschen',
    reset: 'Zurücksetzen',
    generate: 'Generieren',
    convert: 'Konvertieren',
    download: 'Herunterladen',
    upload: 'Hochladen',
    analyze: 'Analysieren',
    preview: 'Vorschau',
    loading: 'Wird geladen...',
    error: 'Fehler',
    success: 'Erfolg',
    close: 'Schließen',
    save: 'Speichern',
    cancel: 'Abbrechen',
    delete: 'Löschen',
    edit: 'Bearbeiten',
    add: 'Hinzufügen',
    remove: 'Entfernen',
    next: 'Weiter',
    previous: 'Zurück',
    settings: 'Einstellungen',
    help: 'Hilfe',
    about: 'Über',
    selectLanguage: 'Sprache auswählen',
    popularLanguages: 'Beliebte Sprachen',
    otherLanguages: 'Andere Sprachen'
  },

  // Navigation
  navigation: {
    home: 'Startseite',
    tools: 'Werkzeuge',
    categories: 'Kategorien',
    backToTools: 'Zurück zu Werkzeugen'
  },

  // Header & Hero
  header: {
    title: 'Entwickler-Werkzeugkasten',
    subtitle: 'Wesentliche Online-Tools für Entwickler',
    badges: {
      free: 'Kostenlos',
      noSignup: 'Keine Anmeldung'
    }
  },

  hero: {
    title: 'All-in-One Entwickler-Tools',
    subtitle: 'Eine umfassende Sammlung wesentlicher Online-Tools für Entwickler. Keine Anmeldung erforderlich, völlig kostenlos und funktioniert vollständig in Ihrem Browser.',
    searchPlaceholder: 'Tools suchen...'
  },

  // Tool Categories
  categories: {
    text: 'Text-Tools',
    encoding: 'Kodierung & Dekodierung',
    converters: 'Konverter',
    generators: 'Generatoren',
    security: 'Sicherheits-Tools',
    html: 'HTML-Tools',
    data: 'Daten-Tools',
    graphics: 'Grafik & Design',
    marketing: 'Marketing-Tools',
    date: 'Datum & Zeit',
    ai: 'KI-Tools'
  },

  // Common Tool Features
  tools: {
    noResults: 'Keine Tools gefunden',
    noResultsSubtext: 'Versuchen Sie, Ihre Suche oder Kategoriefilter anzupassen',
    inputLabel: 'Eingabe',
    outputLabel: 'Ausgabe',
    resultLabel: 'Ergebnis',
    optionsLabel: 'Optionen',
    previewLabel: 'Vorschau',
    exampleLabel: 'Beispiel',
    dateTimeConverter: {
      title: 'Datum-Zeit-Konverter',
      description: 'Datum und Zeit in verschiedene Formate konvertieren',
      visualPicker: 'Visueller Datum & Zeit Auswähler',
      selectDate: 'Datum auswählen',
      selectTime: 'Zeit auswählen',
      pickDate: 'Datum wählen',
      useSelected: 'Ausgewähltes Datum & Zeit verwenden',
      inputDateTime: 'Datum/Zeit eingeben',
      inputFormat: 'Eingabeformat',
      convertDate: 'Datum konvertieren',
      useCurrentTime: 'Aktuelle Zeit verwenden',
      clearAll: 'Alles löschen',
      convertedFormats: 'Konvertierte Formate',
      formatsAvailable: 'Formate verfügbar',
      tips: 'Tipps:',
      tip1: 'Verwenden Sie den visuellen Datum & Zeit Auswähler für einfache Datumsauswahl',
      tip2: 'Unix-Timestamps können in Sekunden (10 Stellen) oder Millisekunden (13 Stellen) sein',
      tip3: 'Auto-Erkennung funktioniert mit den meisten gängigen Datumsformaten',
      tip4: 'Verwenden Sie "Aktuelle Zeit" um schnell das aktuelle Datum und die Zeit zu erhalten',
      dateTimeSelected: 'Datum & Zeit ausgewählt',
      inputUpdated: 'Eingabe mit ausgewähltem Datum und Zeit aktualisiert',
      currentTimeSet: 'Aktuelle Zeit gesetzt',
      currentTimeDescription: 'Eingabe auf aktuelles Datum und Zeit gesetzt',
      success: 'Erfolg',
      successDescription: 'Datum erfolgreich konvertiert!',
      error: 'Fehler',
      errorDescription: 'Ungültiges Datumsformat. Bitte überprüfen Sie Ihre Eingabe.',
      copied: 'Kopiert!',
      copiedDescription: 'Datumsformat in die Zwischenablage kopiert'
    },
    epochConverter: {
      currentEpochTime: 'Aktuelle Unix Epoch Zeit',
      timestampToHuman: 'Timestamp zu menschlichem Datum konvertieren',
      humanToTimestamp: 'Menschliches Datum zu Timestamp konvertieren',
      dynamicDateList: 'Dynamische Datumsliste',
      secondsConverter: 'Sekunden zu Tagen, Stunden und Minuten konvertieren',
      startEndDates: 'Epoch-Daten für Anfang und Ende von Jahr/Monat/Tag',
      batchConvert: 'Stapelkonvertierung (eine pro Zeile):',
      now: 'Jetzt',
      convert: 'Konvertieren',
      batchConvertButton: 'Stapelkonvertierung',
      results: 'Ergebnisse:',
      original: 'Original',
      utcDate: 'UTC-Datum',
      localDate: 'Lokales Datum',
      isoFormat: 'ISO-Format',
      unixTimestamp: 'Unix-Timestamp',
      milliseconds: 'Millisekunden',
      description: 'Beschreibung',
      date: 'Datum',
      inputFormat: 'Eingabeformat: RFC 2822, D-M-Y, M/D/Y, Y-M-D, etc.',
      calculate: 'Berechnen',
      year: 'Jahr:',
      month: 'Monat:',
      day: 'Tag:',
      start: 'Start:',
      end: 'Ende:',
      total: 'Gesamt:',
      seconds: 'Sekunden',
      days: 'Tage',
      hours: 'Stunden',
      minutes: 'Minuten'
    }
  },

  // Language Selector
  language: {
    select: 'Sprache auswählen',
    current: 'Aktuelle Sprache',
    change: 'Sprache ändern'
  },

  // Error Messages
  errors: {
    generic: 'Etwas ist schiefgelaufen. Bitte versuchen Sie es erneut.',
    invalidInput: 'Ungültige Eingabe bereitgestellt',
    processingFailed: 'Verarbeitung fehlgeschlagen. Bitte überprüfen Sie Ihre Eingabe.',
    copyFailed: 'Fehler beim Kopieren in die Zwischenablage',
    uploadFailed: 'Datei-Upload fehlgeschlagen',
    networkError: 'Netzwerkfehler. Bitte überprüfen Sie Ihre Verbindung.'
  },

  // Success Messages
  success: {
    copied: 'In die Zwischenablage kopiert',
    generated: 'Erfolgreich generiert',
    converted: 'Erfolgreich konvertiert',
    uploaded: 'Datei erfolgreich hochgeladen',
    saved: 'Erfolgreich gespeichert'
  }
};
