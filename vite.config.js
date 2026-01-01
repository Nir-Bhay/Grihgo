import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        about: resolve(__dirname, 'about.html'),
        blog: resolve(__dirname, 'blog.html'),
        careers: resolve(__dirname, 'careers.html'),
        cities: resolve(__dirname, 'cities.html'),
        contact: resolve(__dirname, 'contact.html'),
        delivery: resolve(__dirname, 'delivery.html'),
        partner: resolve(__dirname, 'partner.html'),
        pride: resolve(__dirname, 'pride.html'),
        restaurants: resolve(__dirname, 'restaurants.html'),
        transparency: resolve(__dirname, 'transparency.html'),
      },
    },
  },
})
