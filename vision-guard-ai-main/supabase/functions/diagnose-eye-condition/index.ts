import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { medicalHistory, symptoms, image } = await req.json();
    const GEMINI_API_KEY = Deno.env.get('GEMINI_API_KEY');

    if (!GEMINI_API_KEY) {
      throw new Error('GEMINI_API_KEY is not configured');
    }

    // Prepare the prompt
    let prompt = `You are an expert ophthalmologist AI assistant. Analyze the following information and provide a preliminary eye health assessment.

IMPORTANT: This is for educational purposes only and should not replace professional medical advice.

Medical History: ${medicalHistory || 'Not provided'}
Current Symptoms: ${symptoms || 'Not provided'}

Please provide:
1. Possible conditions based on the symptoms
2. Severity assessment (mild, moderate, severe)
3. Recommended next steps
4. When to seek immediate medical attention

Keep the response clear, professional, and easy to understand.`;

    // Prepare request body
    const requestBody: any = {
      contents: [{
        parts: [{ text: prompt }]
      }]
    };

    // Add image if provided
    if (image) {
      const base64Data = image.split(',')[1];
      requestBody.contents[0].parts.push({
        inline_data: {
          mime_type: "image/jpeg",
          data: base64Data
        }
      });
      requestBody.contents[0].parts[0].text += "\n\nAn image of the eye has been provided. Please analyze it for any visible conditions.";
    }

    console.log('Sending request to Gemini API...');

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent?key=${GEMINI_API_KEY}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Gemini API error:', response.status, errorText);
      throw new Error(`Gemini API error: ${response.status}`);
    }

    const data = await response.json();
    console.log('Gemini API response received');

    const diagnosis = data.candidates?.[0]?.content?.parts?.[0]?.text || 
      'Unable to generate diagnosis. Please try again.';

    return new Response(
      JSON.stringify({ diagnosis }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in diagnose-eye-condition:', error);
    return new Response(
      JSON.stringify({ 
        error: error instanceof Error ? error.message : 'Unknown error occurred' 
      }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});
