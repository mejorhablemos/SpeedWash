// meta/pull.mjs — Lee cuenta + campañas de la cuenta publicitaria que paga SpeedWash (Wifix).
// El token vive en meta/.token (gitignored). Ruta relativa al script → sobrevive si se mueve el proyecto.
// Uso:  node meta/pull.mjs
import fs from 'node:fs';

const TOKEN = fs.readFileSync(new URL('./.token', import.meta.url), 'utf8').trim();
const ACCT = 'act_726543328913808'; // cuenta publicitaria de Wifix (paga las campañas de SpeedWash)
const V = 'v21.0';
const BASE = `https://graph.facebook.com/${V}`;

const j = async (url) => {
  const r = await fetch(url);
  return r.json();
};

const out = {};
// 1. Verificar token + estado de la cuenta
out.account = await j(`${BASE}/${ACCT}?fields=name,currency,timezone_name,account_status,amount_spent,balance&access_token=${TOKEN}`);
// 2. Campañas de la cuenta (las de SpeedWash van a aparecer acá cuando existan; usar prefijo SW_ en los nombres)
out.campaigns = await j(`${BASE}/${ACCT}/campaigns?fields=id,name,status,effective_status,objective,daily_budget,lifetime_budget,start_time,stop_time&limit=200&access_token=${TOKEN}`);

console.log(JSON.stringify(out, null, 2));
