import { GoogleGenAI, Modality } from "@google/genai";
import type { Post } from '../types';

/**
 * Generates a complete LinkedIn post with text and optionally a custom image.
 * @param topic - The user-provided topic for the post. Can be empty.
 * @param includeImage - Whether to generate an image for the post.
 * @param apiKey - The user's Google AI Studio API key.
 * @param postHistory - Optional string of the user's last 5-10 posts for context.
 * @returns A promise that resolves to a Post object containing the generated text and image URL.
 */
export const generateFullPost = async (topic: string, includeImage: boolean, apiKey: string, postHistory?: string): Promise<Post> => {
  const ai = new GoogleGenAI({ apiKey });

  const historyContext = postHistory?.trim() 
    ? `For context, here is the user's recent post history. Analyze their style, tone, and common topics to make the new post feel authentic to them:\n---\n${postHistory}\n---\n` 
    : '';

  let basePrompt = '';
  if (topic.trim()) {
    basePrompt = `Write a professional and viral-worthy LinkedIn post about "${topic}".`;
  } else {
    basePrompt = `You are an expert LinkedIn content strategist. Based *only* on the provided post history, generate a single, completely new LinkedIn post suggestion. The new post should be on a relevant topic that the user's audience would likely enjoy, written in the user's unique style and tone. Do not just rephrase an old post. Come up with a fresh idea.`
  }

  const fullTextPrompt = `${historyContext}${basePrompt}

Your post MUST follow these rules:
1.  **Start with a killer hook in bold:** The entire first line MUST be bold using Markdown (\`**text**\`). Begin with a powerful question, a surprising statistic, a bold statement, or a relatable problem to immediately grab the reader's attention.
2.  **Use Accessible Language:** Write in clear, normal English. Avoid overly technical jargon.
3.  **Add Emojis:** Strategically use relevant emojis (2-4) to enhance readability and add personality.
4.  **Structure for readability:** Use short paragraphs and bullet points. For emphasis on key phrases, use standard Markdown for formatting: **bold**, *italic*, and ***bold-italic***. Use this formatting sparingly.
5.  **Provide value:** Offer insights, tips, or a unique perspective.
6.  **Engage the audience:** End with a clear call-to-action or a question.
7.  **Hashtags:** Include a block of 10-15 relevant hashtags at the end.
8.  **Length:** Keep the post well under the 3000-character LinkedIn limit.`;

  try {
    const textResponse = await ai.models.generateContent({
      model: 'gemini-2.5-pro',
      contents: fullTextPrompt,
      config: {
        systemInstruction: "You are an expert LinkedIn content creator specializing in viral growth for a software engineering audience. Your response must be only the post content itself, ready to be copied and pasted. Do not include any introductory phrases like 'Of course!' or 'Here is the post...'.",
      }
    });
    const postText = textResponse.text;
    
    let imageUrl = '';

    if (includeImage) {
      const imagePromptGeneratorPrompt = `Based on the following LinkedIn post, create a detailed prompt for an image generation model. The goal is a playful, creative, and eye-catching graphic that will appeal to a software engineering audience.

The prompt MUST describe:
- A central, clear metaphor or visual representation of the post's core message.
- A playful and creative doodle or sketch style. It should look vibrant and hand-drawn.
- A vibrant and colorful palette that pops.
- Themes should be relevant to software development: abstract representations of code, data structures, cloud infrastructure, APIs, developers collaborating, etc.
- Any text included should be minimal, legible, and specified clearly in quotes to avoid spelling errors.
- **Crucially, the image MUST include a small, unobtrusive watermark in the bottom right corner with the text "thevectorcamp.in". The watermark's style should match the doodle aesthetic of the image.**

The final output should be a direct prompt for the image model, without any extra conversation.

LinkedIn Post:
---
${postText}
---
`;
      const imagePromptResponse = await ai.models.generateContent({
          model: 'gemini-2.5-pro',
          contents: imagePromptGeneratorPrompt,
      });
      const finalImagePrompt = imagePromptResponse.text;

      const imageResponse = await ai.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents: {
          parts: [{ text: finalImagePrompt }],
        },
        config: {
          responseModalities: [Modality.IMAGE],
        },
      });

      for (const part of imageResponse.candidates[0].content.parts) {
        if (part.inlineData) {
          const base64ImageBytes: string = part.inlineData.data;
          imageUrl = `data:${part.inlineData.mimeType};base64,${base64ImageBytes}`;
          break;
        }
      }
      
      if (!imageUrl) {
        console.warn("Image generation was requested but no image data was found in the response.");
      }
    }

    return { imageUrl, text: postText };

  } catch (error) {
    console.error("Error generating full post:", error);
    throw new Error("Failed to generate the post. Please try again.");
  }
};