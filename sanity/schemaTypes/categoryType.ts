import {TagIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

export const categoryType = defineType({
  name: 'category',
  title: 'Category',
  type: 'document',
  icon: TagIcon,
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      title: 'Título de la Categoría',
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
      name: 'description',
      type: 'text',
      title: 'Descripción',
      rows: 3,
    }),
    defineField({
      name: 'color',
      type: 'string',
      title: 'Color de la Categoría',
      description: 'Color para identificar visualmente la categoría',
      options: {
        list: [
          {title: 'Verde APIDevs', value: '#10b981'},
          {title: 'Azul Tech', value: '#3b82f6'},
          {title: 'Púrpura Premium', value: '#8b5cf6'},
          {title: 'Naranja Alert', value: '#f97316'},
          {title: 'Rojo Trading', value: '#ef4444'},
          {title: 'Cyan IA', value: '#06b6d4'},
        ]
      }
    }),
    defineField({
      name: 'icon',
      type: 'string',
      title: 'Emoji/Icono',
      description: 'Emoji para representar la categoría',
      options: {
        list: [
          {title: '📊 Charts', value: '📊'},
          {title: '🤖 IA', value: '🤖'},
          {title: '📈 Estrategias', value: '📈'},
          {title: '🔧 Tutoriales', value: '🔧'},
          {title: '📰 Noticias', value: '📰'},
          {title: '🎯 Indicadores', value: '🎯'},
          {title: '💡 Tips', value: '💡'},
        ]
      }
    }),
    defineField({
      name: 'order',
      type: 'number',
      title: 'Orden de Aparición',
      description: 'Orden en el menú de categorías (menor número = primero)',
      initialValue: 0,
    }),
  ],
  preview: {
    select: {
      title: 'title',
      icon: 'icon',
    },
    prepare(selection) {
      const {title, icon} = selection
      return {
        title: `${icon || ''} ${title}`,
      }
    },
  },
})
