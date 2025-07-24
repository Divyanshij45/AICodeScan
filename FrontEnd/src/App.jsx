import { useState, useEffect } from 'react'
import Editor from "react-simple-code-editor"
import prism from "prismjs"
import "prismjs/components/prism-javascript"
import "prismjs/themes/prism-tomorrow.css"
import Markdown from "react-markdown"
import rehypeHighlight from "rehype-highlight"
import "highlight.js/styles/github-dark.css"
import axios from 'axios'
import './App.css'

function App() {
  const [code, setCode] = useState(`function sum(a, b) {
  // Add two numbers
  return a + b
}`)

  const [review, setReview] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    prism.highlightAll()
  }, [])

  async function reviewCode() {
    if (!code.trim()) return
    
    setIsLoading(true)
    try {
      const response = await axios.post('http://localhost:3000/ai/get-review', { code })
      console.log('Review response:', response.data)
      setReview(response.data)
    } catch (error) {
      setReview('## Error\nFailed to get code review. Please try again.\n\n' + error.message)
      console.error('Review error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="app-container">
      <header>
        <div className="logo">AI Code Reviewer</div>
      </header>

      <main>
        <div className="editor-panel">
          <div className="panel-header">
            <span>Code Editor</span>
          </div>
          <div className="code-container">
            <Editor
              value={code}
              onValueChange={setCode}
              highlight={code => prism.highlight(code, prism.languages.javascript, "javascript")}
              padding={16}
              style={{
                fontFamily: '"Fira Code", monospace',
                fontSize: 14,
                height: '100%',
                backgroundColor: '#0c0c0c',
                color: '#f8f8f2'
              }}
            />
          </div>
        </div>

        <div className="review-panel">
          <div className="panel-header">
            <span>Code Review</span>
            <button 
              className="btn btn-primary"
              onClick={reviewCode}
              disabled={isLoading}
            >
              {isLoading ? 'Reviewing...' : 'Review Code'}
            </button>
          </div>
          <div className="review-content">
            {review ? (
              <Markdown rehypePlugins={[rehypeHighlight]}>{review}</Markdown>
            ) : (
              <div className="empty-state">
                {isLoading 
                  ? 'Analyzing your code...' 
                  : 'Click "Review Code" to analyze your code'}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}

export default App