<script setup lang="ts">
const { locale } = useI18n()

interface Project {
  name: string
  url?: string
  icon: string
  stack: string[]
  description: { ru: string, en: string }
  status: 'live' | 'wip' | 'archived'
}

const projects: Project[] = [
  {
    name: 'dashka.live',
    url: 'https://dashka.live',
    icon: 'mynaui:phone',
    stack: ['Nuxt', 'LiveKit', 'Gemini', 'Bun', 'Capacitor'],
    description: {
      ru: 'Голосовые комнаты с AI-агентом. Telegram + Web + iOS/Android. Реалтайм-звонки через LiveKit, Gemini Realtime для AI-собеседника, Groq STT.',
      en: 'AI-powered voice rooms. Telegram + Web + iOS/Android. LiveKit realtime, Gemini Realtime AI companion, Groq STT.',
    },
    status: 'live',
  },
  {
    name: 'OpenBomber',
    url: 'https://openbomber.com',
    icon: 'mynaui:bomb',
    stack: ['Vue', 'Telegram WebApp', 'Bun', 'PostgreSQL'],
    description: {
      ru: 'Телеграм-игра. Frontend на Vue 3, бэк на Bun + Postgres. TMA + публичный сайт. Деплой через Coolify.',
      en: 'Telegram game. Vue 3 frontend, Bun + Postgres backend. TMA + public site. Coolify deploy.',
    },
    status: 'live',
  },
  {
    name: 'Bomber VPN',
    url: 'https://app.bmbrvpn.cc',
    icon: 'mynaui:shield',
    stack: ['Vue', 'Capacitor', 'Remnawave', 'WireGuard'],
    description: {
      ru: 'VPN-сервис. Кросс-платформенный клиент на Capacitor (iOS, Android, Web). Подписки, оплата через Telegram Stars.',
      en: 'VPN service. Cross-platform Capacitor client (iOS, Android, Web). Subscriptions, Telegram Stars payments.',
    },
    status: 'live',
  },
  {
    name: 'NebusFinance',
    url: 'https://nebusfinance.ru',
    icon: 'mynaui:dollar',
    stack: ['Nuxt', 'PostgreSQL', 'Docker'],
    description: {
      ru: 'Финансовая платформа. Корпоративный сайт + лид-форма (anketa). Запущена в продакшен, обрабатывает заявки.',
      en: 'Financial platform. Corporate site + lead form (anketa). Running in production, handling applications.',
    },
    status: 'live',
  },
  {
    name: 'Self-hosted infra',
    url: 'https://uptime.openbomber.com',
    icon: 'mynaui:server',
    stack: ['Coolify', 'Traefik', 'Docker', 'AdGuard', 'Crowdsec'],
    description: {
      ru: 'Свой сервер с ~55 контейнерами: Coolify + Traefik + Forgejo (git) + Vaultwarden + Immich + Home Assistant + AdGuard DNS + Uptime Kuma.',
      en: 'Home server with ~55 containers: Coolify + Traefik + Forgejo (git) + Vaultwarden + Immich + Home Assistant + AdGuard DNS + Uptime Kuma.',
    },
    status: 'live',
  },
  {
    name: 'Portfolio',
    url: 'https://bysawec.ru',
    icon: 'mynaui:globe',
    stack: ['Nuxt 4', 'Nuxt UI', 'TypeScript', 'i18n'],
    description: {
      ru: 'Этот сайт. IDE-like дизайн, RU/EN локализация, real-time данные (время/погода).',
      en: 'This site. IDE-like design, RU/EN locales, real-time data (clock/weather).',
    },
    status: 'live',
  },
]

const statusLabel = (s: Project['status']) => {
  if (locale.value === 'ru') {
    return s === 'live' ? 'В проде' : s === 'wip' ? 'В разработке' : 'Архив'
  }
  return s === 'live' ? 'Live' : s === 'wip' ? 'WIP' : 'Archived'
}

const statusColor = (s: Project['status']): 'success' | 'warning' | 'neutral' => {
  return s === 'live' ? 'success' : s === 'wip' ? 'warning' : 'neutral'
}
</script>

<template>
  <div class="grid lg:grid-cols-2 gap-4">
    <UCard
      v-for="p in projects"
      :key="p.name"
      class="rounded-xl ring-2 ring-neutral-200/60 dark:bg-neutral-900/10 dark:ring-neutral-800/30 hover:shadow-xl smooth hover:scale-[101%] hover:opacity-90"
    >
      <template #header>
        <div class="flex gap-3 items-center">
          <Icon size="22" :name="p.icon" class="text-primary-400" />
          <a
            v-if="p.url"
            :href="p.url"
            target="_blank"
            class="font-semibold text-neutral-700 dark:text-neutral-200 hover:text-primary-400 smooth"
          >{{ p.name }}</a>
          <span v-else class="font-semibold text-neutral-700 dark:text-neutral-200">{{ p.name }}</span>
          <UBadge
            :color="statusColor(p.status)"
            variant="soft"
            size="sm"
            class="ml-auto"
            :label="statusLabel(p.status)"
          />
        </div>
      </template>
      <p class="text-neutral-500 dark:text-neutral-300/80 text-[14px] mb-3 leading-relaxed">
        {{ locale === 'ru' ? p.description.ru : p.description.en }}
      </p>
      <div class="flex flex-wrap gap-1.5">
        <UBadge
          v-for="s in p.stack"
          :key="s"
          variant="outline"
          color="neutral"
          size="xs"
          class="rounded-full px-2.5 py-0.5"
          :label="s"
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
