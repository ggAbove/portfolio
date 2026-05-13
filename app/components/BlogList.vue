<script setup lang="ts">
const { locale } = useI18n()
const localePath = useLocalePath()

interface BlogPost {
  slug: string
  title: { ru: string, en: string }
  excerpt: { ru: string, en: string }
  date: string
  tags: string[]
}

const posts: BlogPost[] = [
  {
    slug: 'home-server-stack',
    date: '2026-05-14',
    tags: ['DevOps', 'Coolify', 'Self-hosted'],
    title: {
      ru: 'Домашний сервер: 55 контейнеров и почему это того стоит',
      en: 'Home server: 55 containers and why it is worth it',
    },
    excerpt: {
      ru: 'Coolify + Traefik + Forgejo + Vaultwarden + Immich + Home Assistant. Что я гоняю дома и сколько это стоит.',
      en: 'Coolify + Traefik + Forgejo + Vaultwarden + Immich + Home Assistant. What I run at home and how much it costs.',
    },
  },
  {
    slug: 'voice-rooms-livekit',
    date: '2026-05-08',
    tags: ['LiveKit', 'AI', 'Vue', 'Capacitor'],
    title: {
      ru: 'dashka.live: голосовые комнаты с Gemini Realtime',
      en: 'dashka.live: voice rooms with Gemini Realtime',
    },
    excerpt: {
      ru: 'Как я собрал voice-rooms с AI-агентом на LiveKit + Gemini Realtime + Groq STT. Telegram TMA, Web, iOS/Android в одном Capacitor-бандле.',
      en: 'Building voice rooms with AI agent on LiveKit + Gemini Realtime + Groq STT. Telegram TMA, Web, iOS/Android in one Capacitor bundle.',
    },
  },
  {
    slug: 'nat-loopback-trap',
    date: '2026-05-13',
    tags: ['Network', 'Docker', 'Coolify'],
    title: {
      ru: 'NAT loopback и почему мой сервер не достучался сам до себя',
      en: 'NAT loopback: why my server could not reach itself',
    },
    excerpt: {
      ru: 'Ростелеком не делает hairpin NAT. Решил через AdGuard DNS rewrites + Docker daemon DNS. Делюсь рецептом.',
      en: 'Rostelecom does not do hairpin NAT. Fixed via AdGuard DNS rewrites + Docker daemon DNS. Sharing the recipe.',
    },
  },
]

const sorted = computed(() =>
  [...posts].sort((a, b) => b.date.localeCompare(a.date)),
)

const fmtDate = (iso: string) => {
  const d = new Date(iso)
  return d.toLocaleDateString(locale.value === 'ru' ? 'ru-RU' : 'en-US', {
    day: 'numeric', month: 'long', year: 'numeric',
  })
}
</script>

<template>
  <div class="grid gap-4">
    <UCard
      v-for="p in sorted"
      :key="p.slug"
      class="rounded-xl ring-2 ring-neutral-200/60 dark:bg-neutral-900/10 dark:ring-neutral-800/30 hover:shadow-xl smooth hover:scale-[101%] hover:opacity-90 cursor-pointer"
      @click="$router.push(localePath(`/blog/${p.slug}`))"
    >
      <template #header>
        <div class="flex gap-3 items-center">
          <span class="text-neutral-500 dark:text-neutral-400 h-5">
            <Icon size="20" name="mynaui:file" />
          </span>
          <span class="text-neutral-500 dark:text-neutral-400 text-[14px] font-mono">{{ p.slug }}.md</span>
          <span class="ml-auto text-neutral-500 dark:text-neutral-400 text-xs">{{ fmtDate(p.date) }}</span>
        </div>
      </template>
      <h2 class="text-neutral-700 dark:text-neutral-200 font-semibold text-lg mb-2">
        {{ locale === 'ru' ? p.title.ru : p.title.en }}
      </h2>
      <p class="text-neutral-500 dark:text-neutral-300/80 text-[14px] mb-3 leading-relaxed">
        {{ locale === 'ru' ? p.excerpt.ru : p.excerpt.en }}
      </p>
      <div class="flex flex-wrap gap-1.5">
        <UBadge
          v-for="t in p.tags"
          :key="t"
          variant="outline"
          color="neutral"
          size="xs"
          class="rounded-full px-2.5 py-0.5"
          :label="t"
        />
      </div>
    </UCard>
  </div>
</template>

<style scoped>
* {
  font-family: 'Inter';
}
</style>
