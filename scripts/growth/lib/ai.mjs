export async function generateAiReport({
  config,
  prompt,
  openAiApiKey = process.env.OPENAI_API_KEY,
  anthropicApiKey = process.env.ANTHROPIC_API_KEY
}) {
  const provider = resolveProvider({ config, openAiApiKey, anthropicApiKey });

  if (provider === "none") {
    return {
      usedAi: false,
      provider: "none",
      report: null,
      reason: "No AI provider configured for this run."
    };
  }

  if (provider === "openai") {
    return runOpenAi({
      apiKey: openAiApiKey,
      model: config.ai.openaiModel,
      prompt,
      maxOutputTokens: config.ai.maxOutputTokens,
      timeoutMs: config.ai.timeoutMs
    });
  }

  if (provider === "anthropic") {
    return runAnthropic({
      apiKey: anthropicApiKey,
      model: config.ai.anthropicModel,
      prompt,
      maxOutputTokens: config.ai.maxOutputTokens,
      timeoutMs: config.ai.timeoutMs
    });
  }

  return {
    usedAi: false,
    provider: "none",
    report: null,
    reason: `Unsupported AI provider: ${provider}`
  };
}

export function resolveProvider({ config, openAiApiKey, anthropicApiKey }) {
  const selected = config.ai.provider;
  if (selected === "none") {
    return "none";
  }
  if (selected === "openai") {
    return openAiApiKey ? "openai" : "none";
  }
  if (selected === "anthropic") {
    return anthropicApiKey ? "anthropic" : "none";
  }
  if (openAiApiKey) {
    return "openai";
  }
  if (anthropicApiKey) {
    return "anthropic";
  }
  return "none";
}

async function runOpenAi({ apiKey, model, prompt, maxOutputTokens, timeoutMs }) {
  if (!apiKey) {
    return { usedAi: false, provider: "openai", report: null, reason: "OPENAI_API_KEY is missing." };
  }

  const response = await postJson({
    url: "https://api.openai.com/v1/responses",
    apiKey,
    timeoutMs,
    headers: {
      Authorization: `Bearer ${apiKey}`
    },
    body: {
      model,
      input: prompt,
      max_output_tokens: maxOutputTokens,
      text: {
        format: {
          type: "text"
        }
      }
    }
  });

  return {
    usedAi: true,
    provider: "openai",
    report: response.output_text ?? extractOpenAiText(response),
    reason: null
  };
}

async function runAnthropic({ apiKey, model, prompt, maxOutputTokens, timeoutMs }) {
  if (!apiKey) {
    return { usedAi: false, provider: "anthropic", report: null, reason: "ANTHROPIC_API_KEY is missing." };
  }

  const response = await postJson({
    url: "https://api.anthropic.com/v1/messages",
    apiKey,
    timeoutMs,
    headers: {
      "x-api-key": apiKey,
      "anthropic-version": "2023-06-01"
    },
    body: {
      model,
      max_tokens: maxOutputTokens,
      messages: [
        {
          role: "user",
          content: prompt
        }
      ]
    }
  });

  return {
    usedAi: true,
    provider: "anthropic",
    report: response.content?.map((item) => item.text).filter(Boolean).join("\n\n") ?? "",
    reason: null
  };
}

async function postJson({ url, headers, body, timeoutMs }) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(new Error(`Request timed out after ${timeoutMs}ms`)), timeoutMs);

  try {
    const response = await fetch(url, {
      method: "POST",
      signal: controller.signal,
      headers: {
        "Content-Type": "application/json",
        ...headers
      },
      body: JSON.stringify(body)
    });

    const payload = await response.json();
    if (!response.ok) {
      throw new Error(payload?.error?.message ?? payload?.message ?? `${response.status} ${response.statusText}`);
    }
    return payload;
  } finally {
    clearTimeout(timeout);
  }
}

function extractOpenAiText(payload) {
  if (!Array.isArray(payload.output)) {
    return "";
  }

  return payload.output
    .flatMap((item) => item.content ?? [])
    .filter((item) => item.type === "output_text")
    .map((item) => item.text)
    .join("\n\n");
}
