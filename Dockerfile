FROM python:3.11-slim

RUN apt-get update && apt-get install -y curl \
    && curl -fsSL https://deb.nodesource.com/setup_20.x | bash - \
    && apt-get install -y nodejs \
    && rm -rf /var/lib/apt/lists/*

RUN useradd -m -u 1000 user
USER user
WORKDIR /home/user/app

COPY --chown=user . .

RUN npm install hermes-agent telegraf

ENV NODE_OPTIONS="--dns-result-order=ipv4first"

ENV MODEL="openrouter/qwen/qwen-2.5-coder-32b-instruct"
ENV OPENAI_MODEL_NAME="openrouter/qwen/qwen-2.5-coder-32b-instruct"
ENV LLM_MODEL="openrouter/qwen/qwen-2.5-coder-32b-instruct"

CMD ["node", "bot.js"]
