
import { Translations } from '@/types/i18n';

export const es: Translations = {
  // Common
  common: {
    search: 'Buscar',
    back: 'Atrás',
    copy: 'Copiar',
    clear: 'Limpiar',
    reset: 'Reiniciar',
    generate: 'Generar',
    convert: 'Convertir',
    download: 'Descargar',
    upload: 'Subir',
    analyze: 'Analizar',
    preview: 'Vista previa',
    loading: 'Cargando...',
    error: 'Error',
    success: 'Éxito',
    close: 'Cerrar',
    save: 'Guardar',
    cancel: 'Cancelar',
    delete: 'Eliminar',
    edit: 'Editar',
    add: 'Agregar',
    remove: 'Remover',
    next: 'Siguiente',
    previous: 'Anterior',
    settings: 'Configuración',
    help: 'Ayuda',
    about: 'Acerca de',
    selectLanguage: 'Seleccionar Idioma',
    popularLanguages: 'Idiomas Populares',
    otherLanguages: 'Otros Idiomas'
  },

  // Navigation
  navigation: {
    home: 'Inicio',
    tools: 'Herramientas',
    categories: 'Categorías',
    backToTools: 'Volver a Herramientas'
  },

  // Header & Hero
  header: {
    title: 'Caja de Herramientas para Desarrolladores',
    subtitle: 'Herramientas en línea esenciales para desarrolladores',
    badges: {
      free: 'Gratis',
      noSignup: 'Sin Registro'
    }
  },

  hero: {
    title: 'Herramientas de Desarrollador Todo-en-Uno',
    subtitle: 'Una colección completa de herramientas en línea esenciales para desarrolladores. No se requiere registro, completamente gratis, y funciona enteramente en tu navegador.',
    searchPlaceholder: 'Buscar herramientas...'
  },

  // Tool Categories
  categories: {
    text: 'Herramientas de Texto',
    encoding: 'Codificación y Decodificación',
    converters: 'Convertidores',
    generators: 'Generadores',
    security: 'Herramientas de Seguridad',
    html: 'Herramientas HTML',
    data: 'Herramientas de Datos',
    graphics: 'Gráficos y Diseño',
    marketing: 'Herramientas de Marketing',
    date: 'Fecha y Hora',
    ai: 'Herramientas de IA'
  },

  // Common Tool Features
  tools: {
    noResults: 'No se encontraron herramientas',
    noResultsSubtext: 'Intenta ajustar tu búsqueda o filtro de categoría',
    inputLabel: 'Entrada',
    outputLabel: 'Salida',
    resultLabel: 'Resultado',
    optionsLabel: 'Opciones',
    previewLabel: 'Vista previa',
    exampleLabel: 'Ejemplo',
    dateTimeConverter: {
      title: 'Convertidor de Fecha-Hora',
      description: 'Convierte fecha y hora a varios formatos diferentes',
      visualPicker: 'Selector Visual de Fecha y Hora',
      selectDate: 'Seleccionar Fecha',
      selectTime: 'Seleccionar Hora',
      pickDate: 'Elegir fecha',
      useSelected: 'Usar Fecha y Hora Seleccionadas',
      inputDateTime: 'Ingresar Fecha/Hora',
      inputFormat: 'Formato de Entrada',
      convertDate: 'Convertir Fecha',
      useCurrentTime: 'Usar Hora Actual',
      clearAll: 'Limpiar Todo',
      convertedFormats: 'Formatos Convertidos',
      formatsAvailable: 'formatos disponibles',
      tips: 'Consejos:',
      tip1: 'Usa el selector visual para seleccionar fechas fácilmente',
      tip2: 'Los timestamps Unix pueden ser en segundos (10 dígitos) o milisegundos (13 dígitos)',
      tip3: 'La detección automática funciona con la mayoría de formatos comunes',
      tip4: 'Usa "Hora Actual" para obtener rápidamente la fecha y hora actual',
      dateTimeSelected: 'Fecha y Hora Seleccionadas',
      inputUpdated: 'Entrada actualizada con fecha y hora seleccionadas',
      currentTimeSet: 'Hora Actual Establecida',
      currentTimeDescription: 'Entrada establecida a fecha y hora actual',
      success: 'Éxito',
      successDescription: '¡Fecha convertida exitosamente!',
      error: 'Error',
      errorDescription: 'Formato de fecha inválido. Por favor verifica tu entrada.',
      copied: '¡Copiado!',
      copiedDescription: 'Formato de fecha copiado al portapapeles'
    },
    epochConverter: {
      currentEpochTime: 'Tiempo Unix Epoch Actual',
      timestampToHuman: 'Convertir Timestamp a Fecha Humana',
      humanToTimestamp: 'Convertir Fecha Humana a Timestamp',
      dynamicDateList: 'Lista de Fechas Dinámicas',
      secondsConverter: 'Convertir Segundos a Días, Horas y Minutos',
      startEndDates: 'Fechas Epoch para Inicio y Fin de Año/Mes/Día',
      batchConvert: 'Conversión en Lote (uno por línea):',
      now: 'Ahora',
      convert: 'Convertir',
      batchConvertButton: 'Conversión en Lote',
      results: 'Resultados:',
      original: 'Original',
      utcDate: 'Fecha UTC',
      localDate: 'Fecha Local',
      isoFormat: 'Formato ISO',
      unixTimestamp: 'Timestamp Unix',
      milliseconds: 'Milisegundos',
      description: 'Descripción',
      date: 'Fecha',
      inputFormat: 'Formato de entrada: RFC 2822, D-M-Y, M/D/Y, Y-M-D, etc.',
      calculate: 'Calcular',
      year: 'Año:',
      month: 'Mes:',
      day: 'Día:',
      start: 'Inicio:',
      end: 'Fin:',
      total: 'Total:',
      seconds: 'segundos',
      days: 'días',
      hours: 'horas',
      minutes: 'minutos'
    }
  },

  // Language Selector
  language: {
    select: 'Seleccionar Idioma',
    current: 'Idioma Actual',
    change: 'Cambiar Idioma'
  },

  // Error Messages
  errors: {
    generic: 'Algo salió mal. Por favor, inténtalo de nuevo.',
    invalidInput: 'Entrada inválida proporcionada',
    processingFailed: 'El procesamiento falló. Por favor, verifica tu entrada.',
    copyFailed: 'Error al copiar al portapapeles',
    uploadFailed: 'Error al subir archivo',
    networkError: 'Error de red. Por favor, verifica tu conexión.'
  },

  // Success Messages
  success: {
    copied: 'Copiado al portapapeles',
    generated: 'Generado exitosamente',
    converted: 'Convertido exitosamente',
    uploaded: 'Archivo subido exitosamente',
    saved: 'Guardado exitosamente'
  }
};
