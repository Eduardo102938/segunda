import { useState, useEffect } from "react";
import { GoogleGenAI } from "@google/genai";

interface ScenarioImageProps {
  prompt: string;
  description: string;
  className?: string;
}

export default function ScenarioImage({ prompt, description, className }: ScenarioImageProps) {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const generateImage = async () => {
      try {
        setLoading(true);
        setError(false);
        const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
        
        const stylePrompt = "Minimalist 3D render, isometric perspective, clean white background. Characters are faceless gray mannequins (crash test dummies). Distinguishable only by size (children are small, adults medium, elderly slightly hunched) and simple symbolic clothing (e.g., a doctor's coat, a criminal's striped shirt, an executive's tie). Animals are simple low-poly gray shapes. No faces, no skin tones, no blood. Dramatic but clean lighting.";
        const fullPrompt = `${stylePrompt} Scene: ${prompt}.`;

        const response = await ai.models.generateContent({
          model: 'gemini-2.5-flash-image',
          contents: {
            parts: [{ text: fullPrompt }],
          },
          config: {
            imageConfig: {
              aspectRatio: "16:9",
            }
          }
        });

        const part = response.candidates?.[0]?.content?.parts?.find(p => p.inlineData);
        if (part?.inlineData?.data) {
          setImageUrl(`data:image/png;base64,${part.inlineData.data}`);
        } else {
          throw new Error("No image data returned");
        }
      } catch (err: any) {
        console.error("Error generating image:", err);
        setError(true);
        
        // Check if it's a quota error
        const isQuotaError = err?.message?.includes("quota") || err?.message?.includes("429");
        
        // Fallback to a themed placeholder service
        // We use a specific seed based on the description to keep it consistent
        const seed = description.length;
        const fallbackUrl = `https://picsum.photos/seed/moral-machine-${seed}/800/450?grayscale`;
        setImageUrl(fallbackUrl);
        
        if (isQuotaError) {
          console.warn("Gemini API Quota exceeded. Using fallback images.");
        }
      } finally {
        setLoading(false);
      }
    };

    generateImage();
  }, [prompt, description]);

  if (loading) {
    return (
      <div className={`${className} bg-zinc-800 animate-pulse flex items-center justify-center`}>
        <div className="text-zinc-500 text-xs font-bold uppercase tracking-widest">Gerando Cena...</div>
      </div>
    );
  }

  return (
    <div className={`${className} relative overflow-hidden group`}>
      {error && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-zinc-800/50 p-4 text-center z-10">
          <p className="text-[10px] text-zinc-400 uppercase tracking-widest mb-1">Limite de IA atingido</p>
          <p className="text-[8px] text-zinc-500 leading-tight">Usando imagem de reserva para este cenário.</p>
        </div>
      )}
      <img 
        src={imageUrl || ""} 
        alt={description}
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        referrerPolicy="no-referrer"
      />
    </div>
  );
}
