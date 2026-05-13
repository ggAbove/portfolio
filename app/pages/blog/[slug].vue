<script setup lang="ts">
const route = useRoute()
const { locale } = useI18n()
const localePath = useLocalePath()
const slug = computed(() => String(route.params.slug))

interface Post {
  title: { ru: string, en: string }
  date: string
  body: { ru: string, en: string }
}

const posts: Record<string, Post> = {
  'home-server-stack': {
    date: '2026-05-14',
    title: {
      ru: 'Домашний сервер: 55 контейнеров и почему это того стоит',
      en: 'Home server: 55 containers and why it is worth it',
    },
    body: {
      ru: `У меня дома стоит сервер с публичным IP, 16 ГБ ОЗУ и 455 ГБ диска. На нём запущено около 55 Docker-контейнеров через Coolify.

Что там крутится:

- **dashka.live + openbomber + nebusfinance + bysawec.ru** — продакшен сайты
- **Coolify** — UI для управления приложениями, БД, доменами
- **Traefik** — реверс-прокси, авто Let's Encrypt
- **Forgejo** — свой Git-сервер (git.openbomber.com)
- **Vaultwarden** — пароли (Bitwarden-совместимый)
- **Immich** — облако для фотографий
- **Home Assistant + Mosquitto** — умный дом
- **AdGuard Home** — DNS-резолвер для всей сети, блокировка рекламы, DNS rewrites для NAT loopback
- **Crowdsec + iptables bouncer** — IPS, банит сканеры
- **Watchtower** — авто-обновление контейнеров по выходным
- **Uptime Kuma + Beszel** — мониторинг
- **Dozzle** — UI для логов
- **n8n** — workflow automation, триггерит уведомления в Telegram
- **Langfuse + ClickHouse** — LLM observability
- **LiveKit + Egress + Redis** — voice/video для dashka
- **PocketBase + Convex** — backend сервисы
- **Paperless-ngx** — документооборот
- **SearxNG** — приватный мета-поиск
- **CopyParty** — file sharing
- **Duplicati** — бэкапы
- **Hermes Agent** — мой персональный LLM-агент в Telegram

Стоит ли оно того? Зависит от того, насколько вам важна приватность и обучение. Для меня — да.`,
      en: `I have a home server with public IP, 16 GB RAM and 455 GB disk. About 55 Docker containers running via Coolify.

What runs there:

- **dashka.live + openbomber + nebusfinance + bysawec.ru** — production sites
- **Coolify** — app/DB/domain management UI
- **Traefik** — reverse proxy with auto Let's Encrypt
- **Forgejo** — self-hosted Git (git.openbomber.com)
- **Vaultwarden** — passwords (Bitwarden-compatible)
- **Immich** — photo cloud
- **Home Assistant + Mosquitto** — smart home
- **AdGuard Home** — DNS resolver for the network, ad blocking, DNS rewrites for NAT loopback
- **Crowdsec + iptables bouncer** — IPS, bans scanners
- **Watchtower** — weekly auto-updates
- **Uptime Kuma + Beszel** — monitoring
- **Dozzle** — log viewer
- **n8n** — workflow automation, Telegram notifications
- **Langfuse + ClickHouse** — LLM observability
- **LiveKit + Egress + Redis** — voice/video for dashka
- **PocketBase + Convex** — backend services
- **Paperless-ngx** — paperless documents
- **SearxNG** — private meta-search
- **CopyParty** — file sharing
- **Duplicati** — backups
- **Hermes Agent** — my personal LLM agent in Telegram

Is it worth it? Depends on how much you value privacy and learning. For me — yes.`,
    },
  },
  'voice-rooms-livekit': {
    date: '2026-05-08',
    title: {
      ru: 'dashka.live: голосовые комнаты с Gemini Realtime',
      en: 'dashka.live: voice rooms with Gemini Realtime',
    },
    body: {
      ru: `dashka.live — голосовые комнаты с AI-агентом. Можно зайти и поболтать с Дашей (или другими людьми).

Стек:

- **LiveKit** — серверная часть для realtime audio/video. Self-hosted, своя egress-нода для записи.
- **Gemini Realtime API** — AI-агент. Воспринимает речь, отвечает голосом, помнит контекст.
- **Groq STT** — резерв и для записей: транскрибирует разговор в текст.
- **Silero VAD** — детекция тишины, чтобы не тратить токены впустую.
- **Nuxt 4 + Capacitor** — один кодбейс, три таргета: Web (dashka.live), iOS, Android, Telegram TMA (call.openbomber.com).
- **Convex** — backend для пользователей, подписок, истории комнат.
- **MinIO** — S3-хранилище для записей.

Через Coolify всё обновляется одной кнопкой. Сертификаты, домены, реплики — на автомате.`,
      en: `dashka.live — voice rooms with an AI agent. Drop in and chat with Dasha (or other people).

Stack:

- **LiveKit** — realtime audio/video server. Self-hosted, dedicated egress node for recordings.
- **Gemini Realtime API** — AI agent. Hears speech, replies with voice, keeps context.
- **Groq STT** — backup + recordings: transcribes conversations.
- **Silero VAD** — silence detection to save tokens.
- **Nuxt 4 + Capacitor** — single codebase, three targets: Web (dashka.live), iOS, Android, Telegram TMA (call.openbomber.com).
- **Convex** — backend for users, subscriptions, room history.
- **MinIO** — S3 storage for recordings.

Coolify updates everything with one click. Certs, domains, replicas — auto.`,
    },
  },
  'nat-loopback-trap': {
    date: '2026-05-13',
    title: {
      ru: 'NAT loopback и почему мой сервер не достучался сам до себя',
      en: 'NAT loopback: why my server could not reach itself',
    },
    body: {
      ru: `Ситуация: сервер дома на 192.168.0.13, домен dashka.live → публичный IP 178.47.x.x. С телефона из мобильного интернета сайт открывается. С самого сервера — таймаут.

Это NAT loopback (hairpin NAT). Роутер Ростелекома не разворачивает пакет обратно в локальную сеть.

Решение:

1. **AdGuard Home на сервере** — DNS-сервер с DNS rewrites: dashka.live, openbomber.com, bysawec.ru → 192.168.0.13.
2. **Docker daemon DNS** — в /etc/docker/daemon.json указать "dns": ["192.168.0.13", "1.1.1.1"]. Все контейнеры стали резолвить локально.
3. **DHCP на роутере** — выдавать клиентам тот же 192.168.0.13 как DNS. Теперь и телефоны в WiFi резолвят правильно.
4. **NO_PROXY для контейнеров с HTTPS_PROXY** — иначе прокси резолвит публично снова. Добавил в Coolify env: *.openbomber.com, *.dashka.live, *.bysawec.ru.

Бонус: AdGuard блокирует рекламу для всего дома + я добавил xbox-dns.ru как upstream для chatgpt/gemini/claude доменов (разблокировка в РФ).`,
      en: `Situation: home server at 192.168.0.13, dashka.live → public IP 178.47.x.x. Site opens from mobile. From the server itself — timeout.

This is NAT loopback (hairpin NAT). Rostelecom's router doesn't bounce packets back to LAN.

Fix:

1. **AdGuard Home on the server** — DNS with rewrites: dashka.live, openbomber.com, bysawec.ru → 192.168.0.13.
2. **Docker daemon DNS** — set "dns": ["192.168.0.13", "1.1.1.1"] in /etc/docker/daemon.json. All containers resolve locally.
3. **DHCP on the router** — hand out 192.168.0.13 as DNS. Now phones on WiFi resolve correctly too.
4. **NO_PROXY for HTTPS_PROXY containers** — otherwise proxy resolves publicly again. Added to Coolify env: *.openbomber.com, *.dashka.live, *.bysawec.ru.

Bonus: AdGuard blocks ads for the whole house + I added xbox-dns.ru as upstream for chatgpt/gemini/claude domains (unblock in RU).`,
    },
  },
}

const post = computed(() => posts[slug.value])

useHead({
  title: () => post.value
    ? (locale.value === 'ru' ? post.value.title.ru : post.value.title.en)
    : 'Post',
})

const fmtDate = (iso: string) => {
  const d = new Date(iso)
  return d.toLocaleDateString(locale.value === 'ru' ? 'ru-RU' : 'en-US', {
    day: 'numeric', month: 'long', year: 'numeric',
  })
}

const paragraphs = computed(() => {
  if (!post.value)
    return []
  const text = locale.value === 'ru' ? post.value.body.ru : post.value.body.en
  return text.split(/\n\n+/)
})
</script>

<template>
  <div class="grid gap-6 w-full max-w-3xl">
    <NuxtLink
      :to="localePath('/blog')"
      class="flex items-center gap-2 text-neutral-500 dark:text-neutral-400 hover:text-primary-400 smooth w-fit text-sm"
    >
      <Icon size="16" name="mynaui:arrow-left" />
      {{ locale === 'ru' ? 'Назад в блог' : 'Back to blog' }}
    </NuxtLink>
    <UCard
      v-if="post"
      class="rounded-xl ring-2 ring-neutral-200/60 dark:bg-neutral-900/10 dark:ring-neutral-800/30"
    >
      <template #header>
        <div class="flex gap-3 items-center">
          <span class="text-neutral-500 dark:text-neutral-400 h-5">
            <Icon size="20" name="mynaui:file" />
          </span>
          <span class="text-neutral-500 dark:text-neutral-400 text-[14px] font-mono">{{ slug }}.md</span>
          <span class="ml-auto text-neutral-500 dark:text-neutral-400 text-xs">{{ fmtDate(post.date) }}</span>
        </div>
      </template>
      <h1 class="text-2xl sm:text-3xl font-semibold text-neutral-700 dark:text-neutral-200 mb-6">
        {{ locale === 'ru' ? post.title.ru : post.title.en }}
      </h1>
      <div class="grid gap-4 text-neutral-500 dark:text-neutral-300/80 leading-relaxed">
        <p v-for="(para, i) in paragraphs" :key="i" class="whitespace-pre-line">
          {{ para }}
        </p>
      </div>
    </UCard>
    <UCard v-else class="rounded-xl ring-2 ring-neutral-200/60 dark:bg-neutral-900/10 dark:ring-neutral-800/30">
      <p class="text-neutral-500 dark:text-neutral-300">
        {{ locale === 'ru' ? 'Пост не найден' : 'Post not found' }}
      </p>
    </UCard>
  </div>
</template>

<style scoped>
* {
  font-family: 'Inter';
}
</style>
