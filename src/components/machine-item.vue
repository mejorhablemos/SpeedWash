<script setup>
const props = defineProps({
  machine: {
    type: Object,
    required: true,
  },
});

const { t } = useI18n();
const router = useRouter();

// Heurística simple para el ícono según el tipo de lavado
const isTouchless = computed(() =>
  /sin\s*contacto|touchless/i.test(props.machine?.name || "")
);

// Segunda línea del botón: "de Rodillos" / "Sin Contacto"
const chooseType = computed(() => {
  const name = props.machine?.name || "";
  const base = name.replace(/^\s*lavado\s*/i, "").trim();
  if (!base) return "";
  // Una sola palabra ("Rodillos") -> "de Rodillos"; varias ("Sin Contacto") se deja igual
  return /\s/.test(base) ? base : `de ${base}`;
});

const handleGoWash = () => {
  router.push(`/washer/${props.machine.iotId}`);
};
</script>

<template>
  <div class="machine-card clickable" @click="handleGoWash">
    <!-- glow decorativo -->
    <div class="machine-card__glow"></div>

    <!-- Ilustración -->
    <div class="machine-card__art">
      <!-- Sin contacto: gotas de agua -->
      <template v-if="isTouchless">
        <span class="drop drop--1"></span>
        <span class="drop drop--2"></span>
        <span class="drop drop--3"></span>
      </template>
      <!-- Rodillos: cepillos que barren el auto -->
      <template v-else>
        <span class="brush brush--1"></span>
        <span class="brush brush--2"></span>
      </template>
      <!-- auto -->
      <svg class="machine-card__car" viewBox="0 0 48 48" fill="none" stroke="currentColor"
        stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M8 28l2.6-8.2A4 4 0 0 1 14.4 17h19.2a4 4 0 0 1 3.8 2.8L40 28" />
        <path d="M5 28h38v7a2 2 0 0 1-2 2h-2a2 2 0 0 1-2-2v-2H13v2a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2z" />
        <circle cx="14" cy="32.5" r="1.2" fill="currentColor" stroke="none" />
        <circle cx="34" cy="32.5" r="1.2" fill="currentColor" stroke="none" />
      </svg>
      <!-- icono modo -->
      <div class="machine-card__badge">
        <van-icon :name="isTouchless ? 'closed-eye' : 'replay'" />
      </div>
    </div>

    <!-- Nombre -->
    <div class="machine-card__name">{{ machine.name }}</div>
    <div class="machine-card__sub" v-if="machine.address">{{ machine.address }}</div>

    <!-- CTA -->
    <van-button type="primary" round size="small" block class="machine-card__btn">
      {{ t('components.machineItem.actions.moreInfo') }}
    </van-button>
  </div>
</template>

<style scoped>
.machine-card {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding: 14px 12px 12px;
  border-radius: 18px;
  background: var(--surface-color);
  border: 1px solid var(--line-color);
  box-shadow: 0 10px 28px -18px rgba(0, 0, 0, 0.85);
  overflow: hidden;
}

.machine-card__glow {
  position: absolute;
  top: -40px;
  right: -30px;
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(0, 187, 252, 0.22) 0%, transparent 70%);
  pointer-events: none;
}

/* Ilustración */
.machine-card__art {
  position: relative;
  height: 78px;
  border-radius: 12px;
  background:
    linear-gradient(180deg, rgba(0, 187, 252, 0.08) 0%, rgba(0, 187, 252, 0) 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 4px;
}

.machine-card__car {
  width: 64px;
  height: 64px;
  color: var(--primary-color);
  filter: drop-shadow(0 0 12px rgba(0, 187, 252, 0.45));
}

.machine-card__badge {
  position: absolute;
  top: 6px;
  right: 6px;
  width: 24px;
  height: 24px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 13px;
  color: #fff;
  background: linear-gradient(135deg, var(--primary-color) 0%, var(--primary-dark) 100%);
  box-shadow: 0 4px 10px -4px rgba(0, 187, 252, 0.7);
}

/* gotas animadas */
.drop {
  position: absolute;
  top: 8px;
  width: 5px;
  height: 5px;
  border-radius: 50% 50% 50% 0;
  background: var(--primary-light);
  transform: rotate(45deg);
  opacity: 0.85;
  animation: drip 2.4s ease-in-out infinite;
}
.drop--1 { left: 30%; animation-delay: 0s; }
.drop--2 { left: 50%; animation-delay: 0.5s; }
.drop--3 { left: 68%; animation-delay: 1s; }

@keyframes drip {
  0% { transform: translateY(0) rotate(45deg); opacity: 0; }
  30% { opacity: 0.85; }
  100% { transform: translateY(14px) rotate(45deg); opacity: 0; }
}

/* cepillos / rodillos que barren el auto */
.brush {
  position: absolute;
  top: 12px;
  bottom: 12px;
  left: 50%;
  margin-left: -5.5px;
  width: 11px;
  border-radius: 6px;
  z-index: 2;
  background: repeating-linear-gradient(
    to bottom,
    var(--primary-light) 0,
    var(--primary-light) 2px,
    rgba(0, 187, 252, 0.12) 2px,
    rgba(0, 187, 252, 0.12) 5px
  );
  filter: drop-shadow(0 0 6px rgba(0, 187, 252, 0.55));
  opacity: 0.9;
}
.brush--1 { animation: sweep-a 2.6s ease-in-out infinite; }
.brush--2 { animation: sweep-b 2.6s ease-in-out infinite; }

@keyframes sweep-a {
  0%, 100% { transform: translateX(-26px) scaleX(1); }
  50% { transform: translateX(26px) scaleX(0.7); }
}
@keyframes sweep-b {
  0%, 100% { transform: translateX(26px) scaleX(1); }
  50% { transform: translateX(-26px) scaleX(0.7); }
}

.machine-card__name {
  font-family: var(--font-display);
  font-size: 15px;
  font-weight: 700;
  letter-spacing: -0.01em;
  color: var(--text-primary);
  line-height: 1.2;
  text-align: center;
}

.machine-card__sub {
  font-size: 11px;
  color: var(--text-secondary);
  line-height: 1.3;
  text-align: center;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.machine-card__btn {
  margin-top: 8px;
  font-weight: 700;
  font-size: 13.5px;
  height: auto;
  min-height: 34px;
  padding: 7px 10px;
}

.machine-card__btn :deep(.van-button__text) {
  display: flex;
  flex-direction: column;
  align-items: center;
  line-height: 1.2;
}

.machine-card__btn-line {
  display: block;
}

@media (prefers-reduced-motion: reduce) {
  .drop { animation: none; opacity: 0; }
  .brush { animation: none; }
}
</style>
