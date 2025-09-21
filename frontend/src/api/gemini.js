

export async function askGemini(prompt, file = null) {
  let parts = [{ text: prompt }];

  if (file) {
    // Convert file to Base64
    const base64 = await fileToBase64(file);

    parts.push({
      inline_data: {
        mime_type: file.type,  // e.g. "image/png" or "application/pdf"
        data: base64.split(",")[1],
      },
    });
  }

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${import.meta.env.VITE_GEMINI_API_KEY}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts }],
      }),
    }
  );

  const data = await response.json();
  return data?.candidates?.[0]?.content?.parts?.[0]?.text || "No response from model.";
}

// Helper to convert File → Base64
function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}







