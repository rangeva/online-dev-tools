
import { Translations } from '@/types/i18n';

export const it: Translations = {
  // Common
  common: {
    search: 'Cerca',
    back: 'Indietro',
    copy: 'Copia',
    clear: 'Cancella',
    reset: 'Reimposta',
    generate: 'Genera',
    convert: 'Converti',
    download: 'Scarica',
    upload: 'Carica',
    analyze: 'Analizza',
    preview: 'Anteprima',
    loading: 'Caricamento...',
    error: 'Errore',
    success: 'Successo',
    close: 'Chiudi',
    save: 'Salva',
    cancel: 'Annulla',
    delete: 'Elimina',
    edit: 'Modifica',
    add: 'Aggiungi',
    remove: 'Rimuovi',
    next: 'Successivo',
    previous: 'Precedente',
    settings: 'Impostazioni',
    help: 'Aiuto',
    about: 'Informazioni',
    selectLanguage: 'Seleziona Lingua',
    popularLanguages: 'Lingue Popolari',
    otherLanguages: 'Altre Lingue'
  },

  // Navigation
  navigation: {
    home: 'Home',
    tools: 'Strumenti',
    categories: 'Categorie',
    backToTools: 'Torna agli Strumenti'
  },

  // Header & Hero
  header: {
    title: 'Cassetta degli Attrezzi per Sviluppatori',
    subtitle: 'Strumenti online essenziali per sviluppatori',
    badges: {
      free: 'Gratuito',
      noSignup: 'Senza Registrazione'
    }
  },

  hero: {
    title: 'Strumenti per Sviluppatori Tutto-in-Uno',
    subtitle: 'Una collezione completa di strumenti online essenziali per sviluppatori. Nessuna registrazione richiesta, completamente gratuito e funziona interamente nel tuo browser.',
    searchPlaceholder: 'Cerca strumenti...'
  },

  // Tool Categories
  categories: {
    text: 'Strumenti di Testo',
    encoding: 'Codifica e Decodifica',
    converters: 'Convertitori',
    generators: 'Generatori',
    security: 'Strumenti di Sicurezza',
    html: 'Strumenti HTML',
    data: 'Strumenti per Dati',
    graphics: 'Grafica e Design',
    marketing: 'Strumenti di Marketing',
    date: 'Data e Ora',
    ai: 'Strumenti IA'
  },

  // Tool Names
  toolNames: {
    'word-counter': 'Contatore di Parole',
    'text-diff': 'Confronto Testo',
    'case-converter': 'Convertitore Maiuscole/Minuscole',
    'regex-tester': 'Tester RegEx',
    'add-prefix-suffix': 'Aggiungi Prefisso/Suffisso',
    'line-break-manager': 'Gestore Interruzioni di Riga',
    'find-replace': 'Trova e Sostituisci',
    'remove-duplicate-lines': 'Rimuovi Righe Duplicate',
    'remove-empty-lines': 'Rimuovi Righe Vuote',
    'remove-extra-spaces': 'Rimuovi Spazi Extra',
    'html-minifier': 'Minificatore HTML',
    'html-beautifier': 'Formattatore HTML',
    'html-to-markdown': 'HTML a Markdown',
    'html-to-jsx': 'HTML a JSX',
    'html-previewer': 'Anteprima HTML',
    'html-to-plain-text': 'HTML a Testo',
    'html-entity-coder': 'Codificatore Entità HTML',
    'html-wysiwyg-editor': 'Editor WYSIWYG HTML',
    'url-encoder': 'Codificatore URL',
    'base64-encoder': 'Codificatore Base64',
    'jwt-decoder': 'Decodificatore JWT',
    'base64-string-encoder': 'Codificatore Stringa Base64',
    'date-time-converter': 'Convertitore Data/Ora',
    'epoch-converter': 'Convertitore Epoch',
    'integer-base-converter': 'Convertitore Base Numerica',
    'roman-numeral-converter': 'Convertitore Numeri Romani',
    'color-converter': 'Convertitore Colori',
    'text-to-nato-alphabet': 'Testo ad Alfabeto NATO',
    'text-to-ascii-binary': 'Testo ad ASCII/Binario',
    'text-to-unicode': 'Testo a Unicode',
    'yaml-to-json-converter': 'YAML a JSON',
    'yaml-to-toml': 'YAML a TOML',
    'json-to-yaml-converter': 'JSON a YAML',
    'json-to-toml-converter': 'JSON a TOML',
    'toml-to-json-converter': 'TOML a JSON',
    'toml-to-yaml-converter': 'TOML a YAML',
    'xml-to-json-converter': 'XML a JSON',
    'json-to-xml-converter': 'JSON a XML',
    'markdown-to-html-converter': 'Markdown a HTML',
    'list-converter': 'Convertitore Liste',
    'temperature-converter': 'Convertitore Temperature',
    'iso-generator': 'Generatore ISO',
    'cron-editor': 'Editor Cron',
    'timezone-lookup': 'Ricerca Fuso Orario',
    'json-formatter': 'Formattatore JSON',
    'xml-formatter': 'Formattatore XML',
    'yaml-converter': 'Convertitore YAML',
    'hash-generator': 'Generatore Hash',
    'htpasswd-generator': 'Generatore Htpasswd',
    'strong-password-generator': 'Generatore Password Sicure',
    'uuid-generator': 'Generatore UUID',
    'lorem-generator': 'Generatore Lorem Ipsum',
    'fake-data-generator': 'Generatore Dati Fittizi',
    'random-phone-generator': 'Generatore Telefono Casuale',
    'random-email-generator': 'Generatore Email Casuali',
    'color-palette-generator': 'Generatore Palette Colori',
    'html-color-codes': 'Codici Colore HTML',
    'qr-code-generator': 'Generatore Codice QR',
    'wifi-qr-generator': 'Generatore QR WiFi',
    'camera-recorder': 'Registratore Fotocamera',
    'painting-drawing-tool': 'Strumento Disegno',
    'image-format-converter': 'Convertitore Formato Immagine',
    'credential-format-detector': 'Rilevatore Formato Credenziali',
    'tokenizer': 'Tokenizzatore',
    'website-rank-tracker': 'Tracciatore Ranking Sito'
  },

  // Common Tool Features
  tools: {
    noResults: 'Nessuno strumento trovato',
    noResultsSubtext: 'Prova ad aggiustare la tua ricerca o filtro categoria',
    inputLabel: 'Input',
    outputLabel: 'Output',
    resultLabel: 'Risultato',
    optionsLabel: 'Opzioni',
    previewLabel: 'Anteprima',
    exampleLabel: 'Esempio',
    dateTimeConverter: {
      title: 'Convertitore Data-Ora',
      description: 'Convertire data e ora in vari formati diversi',
      visualPicker: 'Selettore Visuale Data e Ora',
      selectDate: 'Seleziona Data',
      selectTime: 'Seleziona Ora',
      pickDate: 'Scegli una data',
      useSelected: 'Usa Data e Ora Selezionate',
      inputDateTime: 'Inserisci Data/Ora',
      inputFormat: 'Formato di Ingresso',
      convertDate: 'Converti Data',
      useCurrentTime: 'Usa Ora Corrente',
      clearAll: 'Cancella Tutto',
      convertedFormats: 'Formati Convertiti',
      formatsAvailable: 'formati disponibili',
      tips: 'Suggerimenti:',
      tip1: 'Usa il selettore visuale per selezione facile delle date',
      tip2: 'I timestamp Unix possono essere in secondi (10 cifre) o millisecondi (13 cifre)',
      tip3: 'Il rilevamento automatico funziona con la maggior parte dei formati comuni',
      tip4: 'Usa "Ora Corrente" per ottenere rapidamente data e ora attuali',
      dateTimeSelected: 'Data e Ora Selezionate',
      inputUpdated: 'Input aggiornato con data e ora selezionate',
      currentTimeSet: 'Ora Corrente Impostata',
      currentTimeDescription: 'Input impostato a data e ora correnti',
      success: 'Successo',
      successDescription: 'Data convertita con successo!',
      error: 'Errore',
      errorDescription: 'Formato data non valido. Controlla il tuo input.',
      copied: 'Copiato!',
      copiedDescription: 'Formato data copiato negli appunti'
    },
    epochConverter: {
      currentEpochTime: 'Tempo Unix Epoch Corrente',
      timestampToHuman: 'Converti Timestamp in Data Umana',
      humanToTimestamp: 'Converti Data Umana in Timestamp',
      dynamicDateList: 'Lista Date Dinamiche',
      secondsConverter: 'Converti Secondi in Giorni, Ore e Minuti',
      startEndDates: 'Date Epoch per Inizio e Fine di Anno/Mese/Giorno',
      batchConvert: 'Conversione a Lotti (uno per riga):',
      now: 'Adesso',
      convert: 'Converti',
      batchConvertButton: 'Conversione a Lotti',
      results: 'Risultati:',
      original: 'Originale',
      utcDate: 'Data UTC',
      localDate: 'Data Locale',
      isoFormat: 'Formato ISO',
      unixTimestamp: 'Timestamp Unix',
      milliseconds: 'Millisecondi',
      description: 'Descrizione',
      date: 'Data',
      inputFormat: 'Formato di input: RFC 2822, D-M-Y, M/D/Y, Y-M-D, ecc.',
      calculate: 'Calcola',
      year: 'Anno:',
      month: 'Mese:',
      day: 'Giorno:',
      start: 'Inizio:',
      end: 'Fine:',
      total: 'Totale:',
      seconds: 'secondi',
      days: 'giorni',
      hours: 'ore',
      minutes: 'minuti'
    }
  },

  // Language Selector
  language: {
    select: 'Seleziona Lingua',
    current: 'Lingua Corrente',
    change: 'Cambia Lingua'
  },

  // Error Messages
  errors: {
    generic: 'Qualcosa è andato storto. Riprova per favore.',
    invalidInput: 'Input non valido fornito',
    processingFailed: 'Elaborazione fallita. Controlla il tuo input.',
    copyFailed: 'Copia negli appunti fallita',
    uploadFailed: 'Caricamento file fallito',
    networkError: 'Errore di rete. Controlla la tua connessione.'
  },

  // Success Messages
  success: {
    copied: 'Copiato negli appunti',
    generated: 'Generato con successo',
    converted: 'Convertito con successo',
    uploaded: 'File caricato con successo',
    saved: 'Salvato con successo'
  }
};
