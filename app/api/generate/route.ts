import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'

const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENROUTER_API_KEY,
  defaultHeaders: {
    "HTTP-Referer": "http://localhost:3000",
    "X-Title": "Nano Banana",
  },
})

export async function POST(request: NextRequest) {
  try {
    const { image, prompt } = await request.json()

    if (!image || !prompt) {
      return NextResponse.json(
        { error: 'Image and prompt are required' },
        { status: 400 }
      )
    }

    console.log('Sending request to Gemini API...')

    const completion = await openai.chat.completions.create({
      model: "google/gemini-2.5-flash-image",
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: prompt
            },
            {
              type: "image_url",
              image_url: {
                url: image
              }
            }
          ]
        }
      ],
      max_tokens: 4000,
      temperature: 0.7
    })

    console.log('API Response structure:', {
      choices: completion.choices?.length,
      firstChoice: completion.choices?.[0],
      messageContent: completion.choices?.[0]?.message?.content,
      messageImages: completion.choices?.[0]?.message?.images?.length
    })

    const message = completion.choices[0].message

    // Check if there are images in the response
    if (message.images && message.images.length > 0) {
      const imageUrl = message.images[0].image_url.url
      console.log('Generated image URL type:', typeof imageUrl)
      console.log('Generated image URL length:', imageUrl.length)

      return NextResponse.json({
        result: message.content,
        imageUrl: imageUrl,
        type: 'image'
      })
    } else {
      // Fallback to text content
      const result = message.content
      console.log('Generated result type:', typeof result)
      console.log('Generated result:', result)

      return NextResponse.json({
        result,
        type: 'text'
      })
    }
  } catch (error) {
    console.error('Error generating response:', error)
    return NextResponse.json(
      { error: `Failed to generate response: ${error instanceof Error ? error.message : 'Unknown error'}` },
      { status: 500 }
    )
  }
}