import { Translations } from '@/types/i18n';

export const fr: Translations = {
  // Common
  common: {
    search: 'Rechercher',
    back: 'Retour',
    copy: 'Copier',
    clear: 'Effacer',
    reset: 'Réinitialiser',
    generate: 'Générer',
    convert: 'Convertir',
    download: 'Télécharger',
    upload: 'Téléverser',
    analyze: 'Analyser',
    preview: 'Aperçu',
    loading: 'Chargement...',
    error: 'Erreur',
    success: 'Succès',
    close: 'Fermer',
    save: 'Sauvegarder',
    cancel: 'Annuler',
    delete: 'Supprimer',
    edit: 'Modifier',
    add: 'Ajouter',
    remove: 'Supprimer',
    next: 'Suivant',
    previous: 'Précédent',
    settings: 'Paramètres',
    help: 'Aide',
    about: 'À propos',
    selectLanguage: 'Sélectionner la Langue',
    popularLanguages: 'Langues Populaires',
    otherLanguages: 'Autres Langues'
  },

  // Navigation
  navigation: {
    home: 'Accueil',
    tools: 'Outils',
    categories: 'Catégories',
    backToTools: 'Retour aux Outils'
  },

  // Header & Hero
  header: {
    title: 'Boîte à Outils Développeur',
    subtitle: 'Outils en ligne essentiels pour développeurs',
    badges: {
      free: 'Gratuit',
      noSignup: 'Sans Inscription'
    }
  },

  hero: {
    title: 'Outils de Développeur Tout-en-Un',
    subtitle: 'Une collection complète d\'outils en ligne essentiels pour les développeurs. Aucune inscription requise, entièrement gratuit, et fonctionne entièrement dans votre navigateur.',
    searchPlaceholder: 'Rechercher des outils...'
  },

  // Tool Categories
  categories: {
    text: 'Outils de Texte',
    encoding: 'Encodage et Décodage',
    converters: 'Convertisseurs',
    generators: 'Générateurs',
    security: 'Outils de Sécurité',
    html: 'Outils HTML',
    data: 'Outils de Données',
    graphics: 'Graphiques et Design',
    marketing: 'Outils Marketing',
    date: 'Date et Heure',
    ai: 'Outils IA'
  },

  // Common Tool Features
  tools: {
    noResults: 'Aucun outil trouvé',
    noResultsSubtext: 'Essayez d\'ajuster votre recherche ou filtre de catégorie',
    inputLabel: 'Entrée',
    outputLabel: 'Sortie',
    resultLabel: 'Résultat',
    optionsLabel: 'Options',
    previewLabel: 'Aperçu',
    exampleLabel: 'Exemple',
    dateTimeConverter: {
      title: 'Convertisseur de Date-Heure',
      description: 'Convertir date et heure en différents formats',
      visualPicker: 'Sélecteur Visuel de Date et Heure',
      selectDate: 'Sélectionner la Date',
      selectTime: 'Sélectionner l\'Heure',
      pickDate: 'Choisir une date',
      useSelected: 'Utiliser Date et Heure Sélectionnées',
      inputDateTime: 'Saisir Date/Heure',
      inputFormat: 'Format d\'Entrée',
      convertDate: 'Convertir la Date',
      useCurrentTime: 'Utiliser l\'Heure Actuelle',
      clearAll: 'Tout Effacer',
      convertedFormats: 'Formats Convertis',
      formatsAvailable: 'formats disponibles',
      tips: 'Conseils:',
      tip1: 'Utilisez le sélecteur visuel pour une sélection facile des dates',
      tip2: 'Les timestamps Unix peuvent être en secondes (10 chiffres) ou millisecondes (13 chiffres)',
      tip3: 'La détection automatique fonctionne avec la plupart des formats courants',
      tip4: 'Utilisez "Heure Actuelle" pour obtenir rapidement la date et l\'heure actuelles',
      dateTimeSelected: 'Date et Heure Sélectionnées',
      inputUpdated: 'Entrée mise à jour avec date et heure sélectionnées',
      currentTimeSet: 'Heure Actuelle Définie',
      currentTimeDescription: 'Entrée définie à la date et heure actuelles',
      success: 'Succès',
      successDescription: 'Date convertie avec succès!',
      error: 'Erreur',
      errorDescription: 'Format de date invalide. Veuillez vérifier votre entrée.',
      copied: 'Copié!',
      copiedDescription: 'Format de date copié dans le presse-papiers'
    },
    epochConverter: {
      currentEpochTime: 'Temps Unix Epoch Actuel',
      timestampToHuman: 'Convertir Timestamp en Date Humaine',
      humanToTimestamp: 'Convertir Date Humaine en Timestamp',
      dynamicDateList: 'Liste de Dates Dynamiques',
      secondsConverter: 'Convertir Secondes en Jours, Heures et Minutes',
      startEndDates: 'Dates Epoch pour Début et Fin d\'Année/Mois/Jour',
      batchConvert: 'Conversion par Lot (un par ligne):',
      now: 'Maintenant',
      convert: 'Convertir',
      batchConvertButton: 'Conversion par Lot',
      results: 'Résultats:',
      original: 'Original',
      utcDate: 'Date UTC',
      localDate: 'Date Locale',
      isoFormat: 'Format ISO',
      unixTimestamp: 'Timestamp Unix',
      milliseconds: 'Millisecondes',
      description: 'Description',
      date: 'Date',
      inputFormat: 'Format d\'entrée: RFC 2822, D-M-Y, M/D/Y, Y-M-D, etc.',
      calculate: 'Calculer',
      year: 'Année:',
      month: 'Mois:',
      day: 'Jour:',
      start: 'Début:',
      end: 'Fin:',
      total: 'Total:',
      seconds: 'secondes',
      days: 'jours',
      hours: 'heures',
      minutes: 'minutes'
    }
  },

  // Language Selector
  language: {
    select: 'Sélectionner la Langue',
    current: 'Langue Actuelle',
    change: 'Changer de Langue'
  },

  // Error Messages
  errors: {
    generic: 'Quelque chose a mal tourné. Veuillez réessayer.',
    invalidInput: 'Entrée invalide fournie',
    processingFailed: 'Le traitement a échoué. Veuillez vérifier votre entrée.',
    copyFailed: 'Échec de la copie dans le presse-papiers',
    uploadFailed: 'Échec du téléversement du fichier',
    networkError: 'Erreur réseau. Veuillez vérifier votre connexion.'
  },

  // Success Messages
  success: {
    copied: 'Copié dans le presse-papiers',
    generated: 'Généré avec succès',
    converted: 'Converti avec succès',
    uploaded: 'Fichier téléversé avec succès',
    saved: 'Sauvegardé avec succès'
  }
};
