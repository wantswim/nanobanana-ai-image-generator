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
      messageImages: completion.choices?.[0]?.message?.images,
    })

    const message = completion.choices[0]?.message

    if (!message) {
      throw new Error('No message received from API')
    }

    // Check if there are images in the response
    if (message.images && Array.isArray(message.images) && message.images.length > 0) {
      console.log('Found images in response:', message.images.length)
      const firstImage = message.images[0]
      console.log('First image object:', firstImage)

      // Extract the actual image URL from the object structure
      let imageUrl = firstImage
      if (typeof firstImage === 'object' && firstImage.image_url && firstImage.image_url.url) {
        imageUrl = firstImage.image_url.url
      } else if (typeof firstImage === 'object' && firstImage.url) {
        imageUrl = firstImage.url
      }

      console.log('Extracted image URL:', typeof imageUrl === 'string' ? imageUrl.substring(0, 100) + '...' : imageUrl)

      return NextResponse.json({
        result: 'Image generated successfully!',
        imageUrl: imageUrl,
        type: 'image'
      })
    }

    // Fallback to text content
    const result = message.content
    console.log('Generated result type:', typeof result)
    console.log('Generated result:', result)

    return NextResponse.json({
      result,
      type: 'text'
    })
  } catch (error) {
    console.error('Error generating response:', error)
    return NextResponse.json(
      { error: `Failed to generate response: ${error instanceof Error ? error.message : 'Unknown error'}` },
      { status: 500 }
    )
  }
}