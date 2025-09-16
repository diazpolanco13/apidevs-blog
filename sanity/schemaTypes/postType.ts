import {DocumentTextIcon} from '@sanity/icons'
import {defineArrayMember, defineField, defineType} from 'sanity'

export const postType = defineType({
  name: 'post',
  title: 'Post',
  type: 'document',
  icon: DocumentTextIcon,
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      title: 'Título del Post',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      title: 'URL Slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'excerpt',
      type: 'text',
      title: 'Resumen / Extracto',
      description: 'Breve descripción para SEO y preview (max 160 caracteres)',
      rows: 3,
      validation: Rule => Rule.max(160),
    }),
    defineField({
      name: 'author',
      type: 'reference',
      to: {type: 'author'},
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'mainImage',
      type: 'image',
      title: 'Imagen Principal',
      description: 'Imagen destacada del post (preferiblemente chart o indicador)',
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: 'alt',
          type: 'string',
          title: 'Texto alternativo (SEO)',
          validation: Rule => Rule.required(),
        })
      ]
    }),
    defineField({
      name: 'categories',
      type: 'array',
      title: 'Categorías',
      of: [defineArrayMember({type: 'reference', to: {type: 'category'}})],
      validation: Rule => Rule.required().min(1),
    }),
    
    // CAMPOS ESPECÍFICOS DE TRADING
    defineField({
      name: 'tradingMetadata',
      type: 'object',
      title: '📊 Metadata de Trading',
      fields: [
        defineField({
          name: 'indicators',
          type: 'array',
          title: 'Indicadores Relacionados',
          description: 'Indicadores APIDevs mencionados en el post',
          of: [{type: 'string'}],
          options: {
            list: [
              {title: 'LUCID Indicator', value: 'lucid'},
              {title: 'Mass Index', value: 'mass-index'},
              {title: 'Chop Zone', value: 'chop-zone'},
              {title: 'RSI Scanner', value: 'rsi-scanner'},
              {title: 'Solo Scanner', value: 'solo-scanner'},
              {title: 'Trend Scanner', value: 'trend-scanner'},
              {title: 'Volume Profile', value: 'volume-profile'},
              {title: 'Smart Money', value: 'smart-money'},
            ]
          }
        }),
        defineField({
          name: 'tradingPairs',
          type: 'array',
          title: 'Pares de Trading',
          description: 'Ej: BTC/USD, EUR/USD, SPX',
          of: [{type: 'string'}],
        }),
        defineField({
          name: 'timeframes',
          type: 'array',
          title: 'Timeframes',
          of: [{type: 'string'}],
          options: {
            list: [
              {title: '1 Minuto', value: '1m'},
              {title: '5 Minutos', value: '5m'},
              {title: '15 Minutos', value: '15m'},
              {title: '1 Hora', value: '1h'},
              {title: '4 Horas', value: '4h'},
              {title: '1 Día', value: '1D'},
              {title: '1 Semana', value: '1W'},
            ]
          }
        }),
        defineField({
          name: 'difficulty',
          type: 'string',
          title: 'Nivel de Dificultad',
          options: {
            list: [
              {title: 'Principiante', value: 'beginner'},
              {title: 'Intermedio', value: 'intermediate'},
              {title: 'Avanzado', value: 'advanced'},
            ],
            layout: 'radio',
          }
        }),
        defineField({
          name: 'strategyType',
          type: 'string',
          title: 'Tipo de Estrategia',
          options: {
            list: [
              {title: 'Tendencia', value: 'trend'},
              {title: 'Reversión', value: 'reversal'},
              {title: 'Scalping', value: 'scalping'},
              {title: 'Swing Trading', value: 'swing'},
              {title: 'Day Trading', value: 'day'},
              {title: 'Position Trading', value: 'position'},
            ]
          }
        }),
      ]
    }),
    
    // SEO FIELDS
    defineField({
      name: 'seo',
      type: 'object',
      title: '🔍 SEO',
      fields: [
        defineField({
          name: 'metaTitle',
          type: 'string',
          title: 'Meta Title',
          description: 'Título para SEO (max 60 caracteres)',
          validation: Rule => Rule.max(60),
        }),
        defineField({
          name: 'metaDescription',
          type: 'text',
          title: 'Meta Description',
          description: 'Descripción para motores de búsqueda (max 160 caracteres)',
          rows: 3,
          validation: Rule => Rule.max(160),
        }),
        defineField({
          name: 'keywords',
          type: 'array',
          title: 'Keywords',
          of: [{type: 'string'}],
          options: {
            layout: 'tags',
          }
        }),
      ]
    }),
    
    defineField({
      name: 'publishedAt',
      type: 'datetime',
      title: 'Fecha de Publicación',
      initialValue: () => new Date().toISOString(),
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'featured',
      type: 'boolean',
      title: 'Post Destacado',
      description: 'Mostrar en la sección de destacados',
      initialValue: false,
    }),
    defineField({
      name: 'readTime',
      type: 'number',
      title: 'Tiempo de Lectura (minutos)',
      description: 'Estimado de tiempo de lectura',
    }),
    defineField({
      name: 'body',
      type: 'blockContent',
      title: 'Contenido del Post',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      author: 'author.name',
      media: 'mainImage',
    },
    prepare(selection) {
      const {author} = selection
      return {...selection, subtitle: author && `by ${author}`}
    },
  },
})
