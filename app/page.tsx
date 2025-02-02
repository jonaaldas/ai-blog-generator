"use client"

import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { useToast } from "@/hooks/use-toast"

export default function Home() {
  const [keywords, setKeywords] = useState("")
  const [article, setArticle] = useState("")
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()
  const { toast } = useToast()

  useEffect(() => {
    setMounted(true)
  }, [])

  const generateArticle = () => {
    // Validate input
    if (!keywords.trim()) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please enter at least one keyword",
      })
      return
    }

    // Check if keywords contain actual words (not just spaces or special characters)
    const validKeywords = keywords
      .split(",")
      .map((word) => word.trim())
      .filter((word) => /^[a-zA-Z]+$/.test(word))

    if (validKeywords.length === 0) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please enter valid keywords (letters only)",
      })
      return
    }

    const loremIpsum =
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."

    const generatedArticle = `Article about ${validKeywords.join(" and ")}:\n\n${loremIpsum}`
    setArticle(generatedArticle)

    toast({
      title: "Success!",
      description: "Your article has been generated",
    })
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      generateArticle()
    }
  }

  if (!mounted) return null

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted transition-all duration-300">
      <div className="absolute right-4 top-4">
        <Button variant="ghost" size="icon" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
          {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          <span className="sr-only">Toggle theme</span>
        </Button>
      </div>

      <div className="container mx-auto px-4 py-16 max-w-3xl">
        <div className="space-y-8">
          <div className="space-y-2 text-center">
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl">AI Article Generator</h1>
            <p className="text-muted-foreground">Enter keywords and let AI create an article for you</p>
          </div>

          <Card className="backdrop-blur-sm bg-card/50">
            <CardContent className="space-y-4 p-6">
              <div className="space-y-2">
                <Label htmlFor="keywords">Keywords</Label>
                <Input
                  id="keywords"
                  value={keywords}
                  onChange={(e) => setKeywords(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="e.g., rich, leverage debt"
                  className="bg-background/50"
                />
                <p className="text-xs text-muted-foreground">Separate multiple keywords with commas</p>
              </div>
              <Button
                onClick={generateArticle}
                className="w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white"
              >
                Generate Article
              </Button>
            </CardContent>
          </Card>

          {article && (
            <Card className="backdrop-blur-sm bg-card/50">
              <CardHeader>
                <CardTitle>Generated Article</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="prose prose-sm dark:prose-invert max-w-none">
                  <p className="whitespace-pre-wrap">{article}</p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}

