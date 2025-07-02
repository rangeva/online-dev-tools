
import { Translations } from '@/types/i18n';

export const en: Translations = {
  // Header and navigation
  header: {
    title: "Developer Toolbox",
    subtitle: "Essential Online Tools for Developers",
    badges: {
      free: "Free",
      noSignup: "No Sign-up Required"
    }
  },

  // Navigation
  navigation: {
    home: "Home",
    tools: "All Tools",
    categories: "Categories",
    backToTools: "Back to Tools"
  },

  // Hero section
  hero: {
    title: "Developer Tools Collection",
    subtitle: "Access a comprehensive collection of developer tools to boost your productivity. All tools are free, work offline, and require no sign-up.",
    searchPlaceholder: "Search tools..."
  },

  // Tools
  tools: {
    noResults: "No tools found",
    noResultsSubtext: "Try adjusting your search terms or browse categories.",
    inputLabel: "Input",
    outputLabel: "Output",
    resultLabel: "Result",
    optionsLabel: "Options",
    previewLabel: "Preview",
    exampleLabel: "Example",
    dateTimeConverter: {
      title: "Date-time Converter",
      description: "Convert date and time into various different formats with enhanced functionality",
      visualPicker: "Visual Date & Time Picker",
      selectDate: "Select Date",
      selectTime: "Select Time",
      pickDate: "Pick a date",
      useSelected: "Use Selected Date & Time",
      inputDateTime: "Input Date/Time",
      inputFormat: "Input Format",
      convertDate: "Convert Date",
      useCurrentTime: "Use Current Time",
      clearAll: "Clear All",
      convertedFormats: "Converted Formats",
      formatsAvailable: "formats available",
      tips: "Tips:",
      tip1: "Use the visual date & time picker for easy date selection",
      tip2: "Unix timestamps can be in seconds (10 digits) or milliseconds (13 digits)",
      tip3: "Auto-detect works with most common date formats",
      tip4: "Use \"Current Time\" to quickly get the current date and time",
      dateTimeSelected: "Date & Time Selected",
      inputUpdated: "Input updated with selected date and time",
      currentTimeSet: "Current Time Set",
      currentTimeDescription: "Input set to current date and time",
      success: "Success",
      successDescription: "Date converted successfully!",
      error: "Error",
      errorDescription: "Invalid date format. Please check your input.",
      copied: "Copied!",
      copiedDescription: "Date format copied to clipboard"
    },
    epochConverter: {
      currentEpochTime: "Current Unix Epoch Time",
      timestampToHuman: "Convert Timestamp to Human Date",
      humanToTimestamp: "Convert Human Date to Timestamp",
      dynamicDateList: "Dynamic Date List",
      secondsConverter: "Convert Seconds to Days, Hours, and Minutes",
      startEndDates: "Epoch Dates for Start and End of Year/Month/Day",
      batchConvert: "Batch Convert (one per line):",
      now: "Now",
      convert: "Convert",
      batchConvertButton: "Batch Convert",
      results: "Results:",
      original: "Original",
      utcDate: "UTC Date",
      localDate: "Local Date",
      isoFormat: "ISO Format",
      unixTimestamp: "Unix Timestamp",
      milliseconds: "Milliseconds",
      description: "Description",
      date: "Date",
      inputFormat: "Input format: RFC 2822, D-M-Y, M/D/Y, Y-M-D, etc. Strip 'GMT' to convert to local time.",
      calculate: "Calculate",
      year: "Year:",
      month: "Month:",
      day: "Day:",
      start: "Start:",
      end: "End:",
      total: "Total:",
      seconds: "seconds",
      days: "days",
      hours: "hours",
      minutes: "minutes"
    }
  },

  // Categories
  categories: {
    text: "Text Tools",
    html: "HTML Tools", 
    encoding: "Encoding Tools",
    converters: "Converters",
    date: "Date & Time",
    data: "Data Tools",
    security: "Security Tools",
    generators: "Generators",
    graphics: "Graphics Tools",
    marketing: "Marketing Tools",
    ai: "AI Tools"
  },

  // Tool Names
  toolNames: {
    'word-counter': 'Word Counter',
    'text-diff': 'Text Diff',
    'case-converter': 'Case Converter',
    'regex-tester': 'RegEx Tester',
    'add-prefix-suffix': 'Add Prefix/Suffix',
    'line-break-manager': 'Line Break Manager',
    'find-replace': 'Find & Replace',
    'remove-duplicate-lines': 'Remove Duplicate Lines',
    'remove-empty-lines': 'Remove Empty Lines',
    'remove-extra-spaces': 'Remove Extra Spaces',
    'html-minifier': 'HTML Minifier',
    'html-beautifier': 'HTML Beautifier',
    'html-to-markdown': 'HTML to Markdown',
    'html-to-jsx': 'HTML to JSX',
    'html-previewer': 'HTML Previewer',
    'html-to-plain-text': 'HTML to Plain Text',
    'html-entity-coder': 'HTML Entity Coder',
    'html-wysiwyg-editor': 'HTML WYSIWYG Editor',
    'url-encoder': 'URL Encoder',
    'base64-encoder': 'Base64 Encoder',
    'jwt-decoder': 'JWT Decoder',
    'base64-string-encoder': 'Base64 String Encoder',
    'date-time-converter': 'Date Time Converter',
    'epoch-converter': 'Epoch Converter',
    'integer-base-converter': 'Integer Base Converter',
    'roman-numeral-converter': 'Roman Numeral Converter',
    'color-converter': 'Color Converter',
    'text-to-nato-alphabet': 'Text to NATO Alphabet',
    'text-to-ascii-binary': 'Text to ASCII/Binary',
    'text-to-unicode': 'Text to Unicode',
    'yaml-to-json-converter': 'YAML to JSON',
    'yaml-to-toml': 'YAML to TOML',
    'json-to-yaml-converter': 'JSON to YAML',
    'json-to-toml-converter': 'JSON to TOML',
    'toml-to-json-converter': 'TOML to JSON',
    'toml-to-yaml-converter': 'TOML to YAML',
    'xml-to-json-converter': 'XML to JSON',
    'json-to-xml-converter': 'JSON to XML',
    'markdown-to-html-converter': 'Markdown to HTML',
    'list-converter': 'List Converter',
    'temperature-converter': 'Temperature Converter',
    'iso-generator': 'ISO Generator',
    'cron-editor': 'Cron Editor',
    'timezone-lookup': 'Timezone Lookup',
    'json-formatter': 'JSON Formatter',
    'xml-formatter': 'XML Formatter',
    'yaml-converter': 'YAML Converter',
    'hash-generator': 'Hash Generator',
    'htpasswd-generator': 'Htpasswd Generator',
    'strong-password-generator': 'Strong Password Generator',
    'uuid-generator': 'UUID Generator',
    'lorem-generator': 'Lorem Generator',
    'fake-data-generator': 'Fake Data Generator',
    'random-phone-generator': 'Random Phone Generator',
    'random-email-generator': 'Random Email Generator',
    'color-palette-generator': 'Color Palette Generator',
    'html-color-codes': 'HTML Color Codes',
    'qr-code-generator': 'QR Code Generator',
    'wifi-qr-generator': 'WiFi QR Generator',
    'camera-recorder': 'Camera Recorder',
    'painting-drawing-tool': 'Painting Tool',
    'image-format-converter': 'Image Format Converter',
    'credential-format-detector': 'Credential Format Detector',
    'tokenizer': 'Tokenizer',
    'website-rank-tracker': 'Website Rank Tracker'
  },

  // Language Selector
  language: {
    select: "Select Language",
    current: "Current Language",
    change: "Change Language"
  },

  // Common
  common: {
    loading: "Loading...",
    error: "Error",
    success: "Success",
    copy: "Copy",
    paste: "Paste",
    clear: "Clear",
    reset: "Reset",
    save: "Save",
    cancel: "Cancel",
    confirm: "Confirm",
    yes: "Yes",
    no: "No",
    search: "Search",
    back: "Back",
    generate: "Generate",
    convert: "Convert",
    download: "Download",
    upload: "Upload",
    analyze: "Analyze",
    preview: "Preview",
    close: "Close",
    delete: "Delete",
    edit: "Edit",
    add: "Add",
    remove: "Remove",
    next: "Next",
    previous: "Previous",
    settings: "Settings",
    help: "Help",
    about: "About",
    selectLanguage: "Select Language",
    popularLanguages: "Popular Languages",
    otherLanguages: "Other Languages"
  },

  // Error Messages
  errors: {
    generic: "Something went wrong. Please try again.",
    invalidInput: "Invalid input provided",
    processingFailed: "Processing failed. Please check your input.",
    copyFailed: "Failed to copy to clipboard",
    uploadFailed: "File upload failed",
    networkError: "Network error. Please check your connection."
  },

  // Success Messages
  success: {
    copied: "Copied to clipboard",
    generated: "Generated successfully",
    converted: "Converted successfully",
    uploaded: "File uploaded successfully",
    saved: "Saved successfully"
  },

  // Date and time related terms
  dateTime: {
    justNow: "Just now",
    minuteAgo: "{count} minute ago",
    minutesAgo: "{count} minutes ago",
    hourAgo: "{count} hour ago", 
    hoursAgo: "{count} hours ago",
    dayAgo: "{count} day ago",
    daysAgo: "{count} days ago",
    fromNow: "from now",
    ago: "ago"
  },

  // Dynamic date labels
  dynamicDates: {
    now: "Now",
    oneHourAgo: "1 hour ago",
    oneDayAgo: "1 day ago", 
    oneWeekAgo: "1 week ago",
    oneMonthAgo: "1 month ago",
    nextHour: "Next hour",
    nextDay: "Next day",
    nextWeek: "Next week",
    nextMonth: "Next month"
  },

  // Timestamp formats
  timestampFormats: {
    seconds: "Seconds",
    milliseconds: "Milliseconds", 
    microseconds: "Microseconds",
    nanoseconds: "Nanoseconds"
  }
};
