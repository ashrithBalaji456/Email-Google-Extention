console.log("🚀 Email Writer Extension - Content Script Loaded");

function createToneDropdown() {
  const select = document.createElement("select");
  select.className = "ai-tone-select";
  select.style.marginRight = "8px";
  select.style.border = "1px solid #ccc";
  select.style.borderRadius = "6px";
  select.style.padding = "5px";
  select.style.fontSize = "13px";
  select.style.cursor = "pointer";
  select.style.color = "#202124";
  select.style.background = "white";
  select.title = "Select tone for AI reply";

  const tones = ["formal", "friendly", "professional", "polite"];
  tones.forEach((tone) => {
    const option = document.createElement("option");
    option.value = tone;
    option.textContent = tone.charAt(0).toUpperCase() + tone.slice(1);
    select.appendChild(option);
  });

  return select;
}

function createAIButton() {
  const button = document.createElement("div");
  button.className = "T-I J-J5-Ji aoO v7 T-I-atl L3 ai-reply-button";
  button.style.marginRight = "8px";
  button.innerHTML = "✨ AI Reply";
  button.setAttribute("role", "button");
  button.setAttribute("data-tooltip", "Generate AI Reply");
  return button;
}

function getEmailContent() {
  const selectors = [
    ".a3s.aiL",       // Most common email body container
    ".ii.gt",         // Gmail thread body
    ".gmail_quote",   // Quoted mail
    "[role='presentation']"
  ];

  for (const selector of selectors) {
    const element = document.querySelector(selector);
    if (element) {
      const text = element.innerText.trim();
      if (text.length > 20) {
        console.log("📨 Extracted email text:", text.slice(0, 120) + "...");
        return text;
      }
    }
  }
  console.warn("⚠️ No email content found.");
  return "";
}

function findComposeToolbar() {
  const selectors = [".btC", ".aDh", "[role='toolbar']", ".gU.Up"];
  for (const selector of selectors) {
    const toolbar = document.querySelector(selector);
    if (toolbar) return toolbar;
  }
  return null;
}

function injectButton() {
  const existingButton = document.querySelector(".ai-reply-button");
  if (existingButton) return; // avoid duplicate buttons

  const toolbar = findComposeToolbar();
  if (!toolbar) {
    console.log("⏳ Waiting for Gmail toolbar...");
    return;
  }

  console.log("🧩 Toolbar found! Injecting tone dropdown + AI button...");

  const toneSelect = createToneDropdown();
  const aiButton = createAIButton();

  aiButton.addEventListener("click", async () => {
    try {
      aiButton.innerHTML = "⏳ Generating...";
      aiButton.style.opacity = "0.6";

      const emailContent = getEmailContent();
      if (!emailContent) {
        alert("⚠️ Could not extract email text from the conversation.");
        aiButton.innerHTML = "✨ AI Reply";
        aiButton.style.opacity = "1";
        return;
      }

      const tone = toneSelect.value;

      const response = await fetch("https://email-reply-backend-zpnv.onrender.com/api/email/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          content: emailContent,
          tone: tone,
        }),
      });

      if (!response.ok) throw new Error(`API ${response.status}`);

      const generatedReply = await response.text();
      const composeBox = document.querySelector(
        '[aria-label="Message Body"][contenteditable="true"]'
      );

      if (composeBox) {
        composeBox.focus();
        composeBox.innerHTML = generatedReply.replace(/\n/g, "<br>");
        console.log("✅ AI reply inserted successfully!");
      } else {
        alert("❌ Gmail compose box not found!");
      }
    } catch (error) {
      console.error("🚨 AI generation failed:", error);
      alert("Failed to generate reply. Check backend or API limit.");
    } finally {
      aiButton.innerHTML = "✨ AI Reply";
      aiButton.style.opacity = "1";
    }
  });

  toolbar.insertBefore(aiButton, toolbar.firstChild);
  toolbar.insertBefore(toneSelect, aiButton);
}

const observer = new MutationObserver((mutations) => {
  for (const mutation of mutations) {
    const addedNodes = Array.from(mutation.addedNodes);
    const hasComposeElements = addedNodes.some(
      (node) =>
        node.nodeType === Node.ELEMENT_NODE &&
        (node.matches(".aDh, .btC, [role='dialog']") ||
          node.querySelector?.(".aDh, .btC, [role='dialog']"))
    );

    if (hasComposeElements) {
      console.log("✉️ Compose window detected!");
      setTimeout(injectButton, 700);
    }
  }
});

observer.observe(document.body, { childList: true, subtree: true });

setTimeout(injectButton, 2000);
