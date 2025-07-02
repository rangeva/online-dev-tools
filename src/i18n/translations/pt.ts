
import { Translations } from '@/types/i18n';

export const pt: Translations = {
  // Common
  common: {
    search: 'Pesquisar',
    back: 'Voltar',
    copy: 'Copiar',
    clear: 'Limpar',
    reset: 'Redefinir',
    generate: 'Gerar',
    convert: 'Converter',
    download: 'Baixar',
    upload: 'Enviar',
    analyze: 'Analisar',
    preview: 'Visualizar',
    loading: 'Carregando...',
    error: 'Erro',
    success: 'Sucesso',
    close: 'Fechar',
    save: 'Salvar',
    cancel: 'Cancelar',
    delete: 'Excluir',
    edit: 'Editar',
    add: 'Adicionar',
    remove: 'Remover',
    next: 'Próximo',
    previous: 'Anterior',
    settings: 'Configurações',
    help: 'Ajuda',
    about: 'Sobre',
    selectLanguage: 'Selecionar Idioma',
    popularLanguages: 'Idiomas Populares',
    otherLanguages: 'Outros Idiomas'
  },

  // Navigation
  navigation: {
    home: 'Início',
    tools: 'Ferramentas',
    categories: 'Categorias',
    backToTools: 'Voltar às Ferramentas'
  },

  // Header & Hero
  header: {
    title: 'Caixa de Ferramentas do Desenvolvedor',
    subtitle: 'Ferramentas online essenciais para desenvolvedores',
    badges: {
      free: 'Grátis',
      noSignup: 'Sem Cadastro'
    }
  },

  hero: {
    title: 'Ferramentas de Desenvolvedor Tudo-em-Um',
    subtitle: 'Uma coleção abrangente de ferramentas online essenciais para desenvolvedores. Não é necessário cadastro, completamente gratuito e funciona inteiramente no seu navegador.',
    searchPlaceholder: 'Pesquisar ferramentas...'
  },

  // Tool Categories
  categories: {
    text: 'Ferramentas de Texto',
    encoding: 'Codificação e Decodificação',
    converters: 'Conversores',
    generators: 'Geradores',
    security: 'Ferramentas de Segurança',
    html: 'Ferramentas HTML',
    data: 'Ferramentas de Dados',
    graphics: 'Gráficos e Design',
    marketing: 'Ferramentas de Marketing',
    date: 'Data e Hora',
    ai: 'Ferramentas de IA'
  },

  // Common Tool Features
  tools: {
    noResults: 'Nenhuma ferramenta encontrada',
    noResultsSubtext: 'Tente ajustar sua pesquisa ou filtro de categoria',
    inputLabel: 'Entrada',
    outputLabel: 'Saída',
    resultLabel: 'Resultado',
    optionsLabel: 'Opções',
    previewLabel: 'Visualizar',
    exampleLabel: 'Exemplo',
    dateTimeConverter: {
      title: 'Conversor de Data-Hora',
      description: 'Converter data e hora em diferentes formatos',
      visualPicker: 'Seletor Visual de Data e Hora',
      selectDate: 'Selecionar Data',
      selectTime: 'Selecionar Hora',
      pickDate: 'Escolher uma data',
      useSelected: 'Usar Data e Hora Selecionadas',
      inputDateTime: 'Inserir Data/Hora',
      inputFormat: 'Formato de Entrada',
      convertDate: 'Converter Data',
      useCurrentTime: 'Usar Hora Atual',
      clearAll: 'Limpar Tudo',
      convertedFormats: 'Formatos Convertidos',
      formatsAvailable: 'formatos disponíveis',
      tips: 'Dicas:',
      tip1: 'Use o seletor visual para seleção fácil de datas',
      tip2: 'Timestamps Unix podem estar em segundos (10 dígitos) ou milissegundos (13 dígitos)',
      tip3: 'A detecção automática funciona com a maioria dos formatos comuns',
      tip4: 'Use "Hora Atual" para obter rapidamente a data e hora atuais',
      dateTimeSelected: 'Data e Hora Selecionadas',
      inputUpdated: 'Entrada atualizada com data e hora selecionadas',
      currentTimeSet: 'Hora Atual Definida',
      currentTimeDescription: 'Entrada definida para data e hora atuais',
      success: 'Sucesso',
      successDescription: 'Data convertida com sucesso!',
      error: 'Erro',
      errorDescription: 'Formato de data inválido. Verifique sua entrada.',
      copied: 'Copiado!',
      copiedDescription: 'Formato de data copiado para a área de transferência'
    },
    epochConverter: {
      currentEpochTime: 'Tempo Unix Epoch Atual',
      timestampToHuman: 'Converter Timestamp para Data Humana',
      humanToTimestamp: 'Converter Data Humana para Timestamp',
      dynamicDateList: 'Lista de Datas Dinâmicas',
      secondsConverter: 'Converter Segundos para Dias, Horas e Minutos',
      startEndDates: 'Datas Epoch para Início e Fim de Ano/Mês/Dia',
      batchConvert: 'Conversão em Lote (um por linha):',
      now: 'Agora',
      convert: 'Converter',
      batchConvertButton: 'Conversão em Lote',
      results: 'Resultados:',
      original: 'Original',
      utcDate: 'Data UTC',
      localDate: 'Data Local',
      isoFormat: 'Formato ISO',
      unixTimestamp: 'Timestamp Unix',
      milliseconds: 'Milissegundos',
      description: 'Descrição',
      date: 'Data',
      inputFormat: 'Formato de entrada: RFC 2822, D-M-Y, M/D/Y, Y-M-D, etc.',
      calculate: 'Calcular',
      year: 'Ano:',
      month: 'Mês:',
      day: 'Dia:',
      start: 'Início:',
      end: 'Fim:',
      total: 'Total:',
      seconds: 'segundos',
      days: 'dias',
      hours: 'horas',
      minutes: 'minutos'
    }
  },

  // Language Selector
  language: {
    select: 'Selecionar Idioma',
    current: 'Idioma Atual',
    change: 'Mudar Idioma'
  },

  // Error Messages
  errors: {
    generic: 'Algo deu errado. Por favor, tente novamente.',
    invalidInput: 'Entrada inválida fornecida',
    processingFailed: 'Processamento falhou. Por favor, verifique sua entrada.',
    copyFailed: 'Falha ao copiar para a área de transferência',
    uploadFailed: 'Falha no envio do arquivo',
    networkError: 'Erro de rede. Por favor, verifique sua conexão.'
  },

  // Success Messages
  success: {
    copied: 'Copiado para a área de transferência',
    generated: 'Gerado com sucesso',
    converted: 'Convertido com sucesso',
    uploaded: 'Arquivo enviado com sucesso',
    saved: 'Salvo com sucesso'
  }
};
