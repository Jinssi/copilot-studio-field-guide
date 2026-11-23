<script setup>
import { withBase } from 'vitepress'
defineProps({
  file: { type: String, required: true },
  alt: { type: String, required: true },
  caption: { type: String, required: true }
})
</script>

<template>
  <figure class="field-shot">
    <a :href="withBase(`/shots/${file}`)" :aria-label="`Open full-size screenshot: ${alt}`">
      <img :src="withBase(`/shots/${file}`)" :alt="alt" loading="lazy" decoding="async">
    </a>
    <figcaption>{{ caption }} <a :href="withBase('/credits.html')">Image credit</a>.</figcaption>
  </figure>
</template>
