"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Upload, Loader2, Download } from "lucide-react"

export default function Editor() {
  const [image, setImage] = useState<string | null>(null)
  const [prompt, setPrompt] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [generatedResult, setGeneratedResult] = useState<string | null>(null)
  const [generatedImage, setGeneratedImage] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [isPreviewOpen, setIsPreviewOpen] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleDownload = () => {
    if (!generatedImage) return

    // Create a link element and trigger download
    const link = document.createElement('a')
    link.href = generatedImage
    link.download = `generated-image-${Date.now()}.png`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const handlePreview = () => {
    setIsPreviewOpen(true)
  }

  const handleClosePreview = () => {
    setIsPreviewOpen(false)
  }

  const handleModalClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      handleClosePreview()
    }
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        setImage(event.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleGenerate = async () => {
    if (!image || !prompt) return

    setIsLoading(true)
    setError(null)
    setGeneratedResult(null)
    setGeneratedImage(null)

    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          image,
          prompt,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to generate response')
      }

      if (data.type === 'image' && data.imageUrl) {
        setGeneratedImage(data.imageUrl)
        setGeneratedResult(data.result || 'Image generated successfully!')
      } else {
        setGeneratedResult(data.result)
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <h2 className="text-4xl font-bold text-center mb-12 text-balance">Try The AI Image Generator</h2>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Input Section */}
        <div className="bg-secondary border border-border rounded-lg p-8">
          <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
            <span className="text-2xl">🎯</span> Prompt Engine
          </h3>

          <div className="space-y-6">
            {/* Image Upload */}
            <div>
              <label className="block text-sm font-medium mb-3">Upload Image</label>
              <div
                className="border-2 border-dashed border-border rounded-lg p-8 text-center cursor-pointer hover:border-primary transition"
                onClick={() => fileInputRef.current?.click()}
              >
                {image ? (
                  <div className="space-y-2">
                    <img
                      src={image || "/placeholder.svg"}
                      alt="Uploaded"
                      className="w-full h-40 object-cover rounded"
                    />
                    <p className="text-sm text-muted-foreground">Click to change image</p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <Upload className="mx-auto text-primary" size={32} />
                    <p className="font-medium">Click to upload or drag and drop</p>
                    <p className="text-sm text-muted-foreground">PNG, JPG, GIF up to 50MB</p>
                  </div>
                )}
              </div>
              <input ref={fileInputRef} type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
            </div>

            {/* Prompt Input */}
            <div>
              <label className="block text-sm font-medium mb-3">Describe Your Edit</label>
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="e.g., Change the background to a sunny beach, make the person smile..."
                className="w-full h-24 p-4 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            {/* Generate Button */}
            <button
              onClick={handleGenerate}
              disabled={!image || !prompt || isLoading}
              className="w-full bg-primary text-primary-foreground py-3 rounded-lg font-semibold hover:opacity-90 transition disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <Loader2 size={20} className="animate-spin" />
                  Generating...
                </>
              ) : (
                "Generate Now"
              )}
            </button>
          </div>
        </div>

        {/* Output Section */}
        <div className="bg-secondary border border-border rounded-lg p-8">
          <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
            <span className="text-2xl">🖼️</span> Generated Image
          </h3>

          <div className="bg-background rounded-lg p-8 text-center h-96 flex items-center justify-center">
            {isLoading ? (
              <div className="space-y-4">
                <Loader2 size={48} className="animate-spin mx-auto text-primary" />
                <p className="text-muted-foreground">Generating your image...</p>
              </div>
            ) : error ? (
              <div className="space-y-4">
                <div className="text-6xl">❌</div>
                <p className="text-red-500 font-medium">Error</p>
                <p className="text-sm text-muted-foreground">{error}</p>
              </div>
            ) : generatedResult ? (
              <div className="space-y-4 w-full">
                {generatedImage ? (
                  <div className="space-y-4">
                    <div
                      className="border-2 border-dashed border-border rounded-lg p-8 text-center cursor-pointer hover:border-primary transition"
                      onClick={handlePreview}
                    >
                      <div className="space-y-2">
                        <img
                          src={generatedImage}
                          alt="Generated"
                          className="w-full h-40 object-cover rounded"
                        />
                        <p className="text-sm text-muted-foreground">Click to preview</p>
                      </div>
                    </div>
                    <button
                      onClick={handleDownload}
                      className="w-full bg-green-500 text-white py-3 rounded-lg font-semibold hover:bg-green-600 transition flex items-center justify-center gap-2"
                    >
                      <Download size={20} />
                      Download Image
                    </button>
                  </div>
                ) : (
                  <div className="bg-secondary p-4 rounded-lg text-left max-h-64 overflow-y-auto">
                    <p className="text-sm whitespace-pre-wrap">{generatedResult}</p>
                  </div>
                )}
              </div>
            ) : (
              <div className="space-y-4">
                <div className="text-6xl">🍌</div>
                <p className="text-muted-foreground">Ready for instant generation</p>
                <p className="text-sm text-muted-foreground">Upload an image and describe your edit</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Preview Modal */}
      {isPreviewOpen && generatedImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-95 flex items-center justify-center z-50 cursor-pointer"
          onClick={handleModalClick}
        >
          <div className="relative max-w-[90vw] max-h-[90vh]">
            <img
              src={generatedImage}
              alt="Generated Preview"
              className="w-full h-full object-contain"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        </div>
      )}
    </section>
  )
}
