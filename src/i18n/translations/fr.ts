
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
    about: 'À propos'
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
    exampleLabel: 'Exemple'
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
