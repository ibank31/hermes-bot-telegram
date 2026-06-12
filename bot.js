const { Telegraf } = require('telegraf');
const { execSync } = require('child_process');

const token = process.env.TELEGRAM_BOT_TOKEN;
const bot = new Telegraf(token);

console.log("🚀 Mesin Telegraf (Mode Webhook) bersiap...");

bot.on('text', async (ctx) => {
  const userText = ctx.message.text;
  console.log(`\n📩 PESAN MASUK: "${userText}"`);
  await ctx.reply("⏳ Hermes sedang memproses pesanmu...");
  try {
    const output = execSync(`npx hermes-agent "${userText}"`, {
      env: process.env, 
      encoding: 'utf-8',
      timeout: 180000 
    });
    await ctx.reply(output);
  } catch (error) {
    await ctx.reply("❌ Hermes mentok:\n" + error.message);
  }
});

const domain = 'ibank31-hermes-github-agent.hf.space';

bot.launch({
  webhook: {
    domain: domain,
    port: 7860
  }
}).then(() => {
  console.log(`✅ WEBHOOK AKTIF! Server siap menerima ketukan dari Telegram di port 7860`);
});

process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
