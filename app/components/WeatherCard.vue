<script setup lang="ts">
const { locale } = useI18n()
let interval: ReturnType<typeof setInterval> | undefined

interface Weather {
  condition: string
  temp: string
  location: string
}

const data = ref<Weather | null>(null)
const status = ref<'idle' | 'pending' | 'success' | 'error'>('idle')

const WEATHER_CODE_MAP: Record<number, { ru: string, en: string }> = {
  0: { ru: 'Ясно', en: 'Clear' },
  1: { ru: 'Преимущественно ясно', en: 'Mainly clear' },
  2: { ru: 'Переменная облачность', en: 'Partly cloudy' },
  3: { ru: 'Пасмурно', en: 'Overcast' },
  45: { ru: 'Туман', en: 'Fog' },
  48: { ru: 'Изморозь', en: 'Rime fog' },
  51: { ru: 'Слабая морось', en: 'Light drizzle' },
  53: { ru: 'Морось', en: 'Drizzle' },
  55: { ru: 'Сильная морось', en: 'Heavy drizzle' },
  61: { ru: 'Слабый дождь', en: 'Light rain' },
  63: { ru: 'Дождь', en: 'Rain' },
  65: { ru: 'Сильный дождь', en: 'Heavy rain' },
  71: { ru: 'Слабый снег', en: 'Light snow' },
  73: { ru: 'Снег', en: 'Snow' },
  75: { ru: 'Сильный снег', en: 'Heavy snow' },
  77: { ru: 'Снежные зёрна', en: 'Snow grains' },
  80: { ru: 'Ливень', en: 'Rain showers' },
  81: { ru: 'Сильный ливень', en: 'Heavy showers' },
  82: { ru: 'Очень сильный ливень', en: 'Violent showers' },
  85: { ru: 'Снегопад', en: 'Snow showers' },
  86: { ru: 'Сильный снегопад', en: 'Heavy snow showers' },
  95: { ru: 'Гроза', en: 'Thunderstorm' },
  96: { ru: 'Гроза с градом', en: 'Thunderstorm w/ hail' },
  99: { ru: 'Сильная гроза с градом', en: 'Severe thunderstorm' },
}

async function tryWttr(): Promise<Weather | null> {
  try {
    const ctrl = new AbortController()
    const t = setTimeout(() => ctrl.abort(), 5000)
    const res = await fetch(`https://wttr.in/?format=%C_%t_%l&lang=${locale.value}`, { signal: ctrl.signal })
    clearTimeout(t)
    if (!res.ok)
      return null
    const v = (await res.text()).trim()
    if (!v || v.length > 200 || v.includes('<') || v.includes('{'))
      return null
    const [condition, temp, location] = v.split('_')
    if (!condition || !temp || !location)
      return null
    return { condition, temp, location: location.replace(/,?\s*[a-z]{2}\s*$/i, '') }
  }
  catch {
    return null
  }
}

interface GeoIp { city?: string, country_name?: string, latitude?: number, longitude?: number }

async function tryOpenMeteo(): Promise<Weather | null> {
  try {
    const geoRes = await fetch('https://ipapi.co/json/')
    if (!geoRes.ok)
      return null
    const geo = await geoRes.json() as GeoIp
    if (!geo.latitude || !geo.longitude)
      return null
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${geo.latitude}&longitude=${geo.longitude}&current=temperature_2m,weather_code`
    const wRes = await fetch(url)
    if (!wRes.ok)
      return null
    const w = await wRes.json() as { current?: { temperature_2m?: number, weather_code?: number } }
    const t = w.current?.temperature_2m
    const code = w.current?.weather_code
    if (t === undefined || code === undefined)
      return null
    const lang = locale.value === 'ru' ? 'ru' : 'en'
    const condition = WEATHER_CODE_MAP[code]?.[lang] ?? `Code ${code}`
    return {
      condition,
      temp: `${t > 0 ? '+' : ''}${Math.round(t)}°C`,
      location: geo.city ?? geo.country_name ?? 'Unknown',
    }
  }
  catch {
    return null
  }
}

async function load() {
  status.value = 'pending'
  const result = (await tryWttr()) ?? (await tryOpenMeteo())
  if (result) {
    data.value = result
    status.value = 'success'
  }
  else {
    status.value = 'error'
  }
}

onMounted(() => {
  load()
  interval = setInterval(load, 60_000)
})

onUnmounted(() => {
  if (interval)
    clearInterval(interval)
})
</script>

<template>
  <UCard
    class="grid items-start rounded-xl ring-2 ring-neutral-200/60 dark:bg-neutral-900/10 dark:ring-neutral-800/30 hover:shadow-xl smooth hover:scale-[101%] hover:opacity-90 active:opacity-80 lg:col-span-3"
  >
    <template #header>
      <div class="flex gap-4 items-center">
        <span class="text-neutral-500 dark:text-neutral-400 h-5">
          <Icon size="20" name="mynaui:database" />
        </span>
        <span class="text-neutral-500 dark:text-neutral-400 text-[14px]">weather.json</span>
        <span class="text-neutral-500 dark:text-neutral-400 ml-auto truncate text-xs lg:text-[14px]">{{ data?.location }}</span>
      </div>
    </template>
    <p
      v-if="data"
      style="font-family: IBM Plex Mono;" class="grid gap-2 text-neutral-500 dark:text-neutral-300 text-[14px] sm:text-base font-medium"
    >
      {{ data.condition }}

      <span class="text-[12px] sm:text-[14px] opacity-60">{{ data.temp }}</span>
    </p>
    <USkeleton v-if="!data && status === 'pending'" class="h-[50px] w-[100px]" />
    <p v-if="!data && status === 'error'" class="grid gap-2 text-neutral-500 dark:text-neutral-300 text-[14px] sm:text-base font-medium">
      {{ locale === 'ru' ? 'Погода недоступна' : 'Weather unavailable' }}
    </p>
  </UCard>
</template>

<style scoped>
* {
  font-family: 'Inter';
}
</style>
