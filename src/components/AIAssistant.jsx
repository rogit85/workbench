import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageCircle, X, Send, Sparkles, TrendingUp, Search, FileText, BarChart3 } from 'lucide-react'

const AIAssistant = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'assistant',
      content: 'Hello! I\'m Saira, your AI Underwriting Assistant. I can help you with:\n\n• Finding specific submissions\n• Generating analytics and insights\n• Answering questions about your portfolio\n• Providing risk assessments\n\nWhat would you like to know?',
      timestamp: new Date()
    }
  ])
  const [inputValue, setInputValue] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef(null)
  const inputRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isOpen])

  // Mock AI response generator
  const generateResponse = (userMessage) => {
    const lowerMessage = userMessage.toLowerCase()

    // Search for submissions
    if (lowerMessage.includes('find') || lowerMessage.includes('search') || lowerMessage.includes('show me')) {
      if (lowerMessage.includes('property') || lowerMessage.includes('properties')) {
        return {
          content: '🔍 I found 8 Property submissions:\n\n**High Priority:**\n• SOM-2024-001 - TechCorp Data Center ($5M) - Status: Rating\n• SOM-2024-005 - Hyperion Biotech ($460K) - Status: Appetite Check\n\n**Medium Priority:**\n• SOM-2024-002 - JX Research Limited ($1M) - Status: Appetite Check\n• SOM-2024-008 - Retail Plaza UK ($850K) - Status: Clearance\n\n**Recent Activity:**\n• 3 new submissions today\n• 2 pending peer review\n• Average processing time: 4.2 days\n\nWould you like to see detailed information on any of these?',
          type: 'search'
        }
      }
      if (lowerMessage.includes('high priority') || lowerMessage.includes('urgent')) {
        return {
          content: '⚡ High Priority Submissions (6 total):\n\n**Urgent - Expiring Soon:**\n1. SOM-2024-001 - TechCorp Data Center\n   • GWP: $5M | LOB: Property\n   • Status: Rating | Age: 2d\n   • ⏰ Quote needed by tomorrow\n\n2. SOM-2024-003 - Global Freight Ltd\n   • GWP: $420K | LOB: Marine\n   • Status: Clearance | Age: 6h\n   • 🔥 Broker requesting update\n\n3. SOM-2024-005 - Hyperion Biotech\n   • GWP: $460K | LOB: Life Sciences\n   • Status: Appetite Check | Age: 1d\n   • ⚠️ Complex risk profile\n\nShall I prioritize any of these for you?',
          type: 'search'
        }
      }
      return {
        content: '🔍 I can search for submissions by:\n\n• **Status** - "Find submissions in rating"\n• **LOB** - "Show me all casualty risks"\n• **Priority** - "Find high priority items"\n• **Broker** - "Search for Aon submissions"\n• **GWP Range** - "Find submissions over $1M"\n• **Age** - "Show submissions older than 5 days"\n\nWhat would you like to search for?',
        type: 'search'
      }
    }

    // Analytics queries
    if (lowerMessage.includes('analytic') || lowerMessage.includes('report') || lowerMessage.includes('statistics') || lowerMessage.includes('stats')) {
      return {
        content: '📊 **Quick Analytics Summary:**\n\n**Today\'s Performance:**\n• 12 new submissions received\n• 8 quotes issued ($3.2M total GWP)\n• 94% clearance approval rate\n• Avg. processing time: 3.8 days\n\n**This Month:**\n• 156 submissions processed\n• $42M in quoted premiums\n• 78% conversion rate\n• Top LOB: Property (34%)\n\n**Top Performers:**\n1. Jeremy Isaacs - 24 quotes | $8.2M GWP\n2. Sarah Chen - 19 quotes | $6.5M GWP\n3. Alex Morgan - 17 quotes | $5.8M GWP\n\n**Trending Risks:**\n📈 Property (+15%)\n📈 Cyber (+22%)\n📉 Marine (-8%)\n\nWould you like a detailed breakdown of any area?',
        type: 'analytics'
      }
    }

    // Portfolio questions
    if (lowerMessage.includes('how many') || lowerMessage.includes('total')) {
      return {
        content: '📈 **Current Portfolio Overview:**\n\n**Active Submissions:** 45 total\n• Received: 12\n• Clearance: 8\n• Appetite Check: 6\n• Sanctions: 3\n• Rating: 7\n• Peer Review: 4\n• Quoted: 5\n\n**By Line of Business:**\n• Property: 18 (40%)\n• Casualty: 12 (27%)\n• Marine: 7 (16%)\n• Specialty: 8 (17%)\n\n**Total GWP Pipeline:** $23.8M\n\n**Status Health:**\n✅ On Track: 32 (71%)\n⚠️ At Risk: 9 (20%)\n🔴 Delayed: 4 (9%)\n\nNeed more details on any category?',
        type: 'analytics'
      }
    }

    // Risk assessment
    if (lowerMessage.includes('risk') && (lowerMessage.includes('assess') || lowerMessage.includes('analysis'))) {
      return {
        content: '🛡️ **Risk Assessment Insights:**\n\n**Current Risk Distribution:**\n• Low Risk: 18 submissions (40%)\n• Moderate Risk: 21 submissions (47%)\n• High Risk: 6 submissions (13%)\n\n**Key Risk Factors:**\n⚠️ **High Concern:**\n• 3 submissions in Flood Zone A\n• 2 with elevated loss ratios (>70%)\n• 4 in high-volatility sectors\n\n✅ **Favorable Indicators:**\n• 12 with excellent broker tier ratings\n• 8 with strong risk mitigation\n• 15 renewal accounts with clean history\n\n**Recommendations:**\n1. Fast-track 5 low-risk renewals\n2. Request additional info on 3 high-risk items\n3. Consider declining 2 outside appetite\n\nWould you like details on specific risks?',
        type: 'analytics'
      }
    }

    // Specific submission lookup
    if (lowerMessage.includes('som-') || lowerMessage.includes('jx research') || lowerMessage.includes('techcorp')) {
      return {
        content: '📄 **Submission Details: JX Research Limited**\n\n**Reference:** SOM-2024-002\n**Status:** Appetite Check (3 days in stage)\n**Priority:** Medium\n\n**Key Information:**\n• **Insured:** JX Research Limited\n• **Broker:** Howden Insurance Brokers Ltd\n• **LOB:** Management Liability\n• **Coverage:** D&O Liability\n• **Limit:** $1,000,000 USD\n• **Inception:** 2025-10-03\n\n**Risk Profile:**\n• Blockchain technology sector\n• Cayman Islands domicile\n• $5.55M capital raised\n• Private entity, no revenue yet\n\n**Assessment:**\n🟡 **Moderate Risk**\n• Appetite Score: Medium\n• Sanctions: Clear ✓\n• Regulatory: Cayman Islands classification\n\n**Next Steps:**\n1. Complete appetite review\n2. HX rating required\n3. Peer review recommended\n\n**Assigned to:** Jeremy Isaacs\n\nWould you like to see the full submission or update the status?',
        type: 'submission'
      }
    }

    // Broker queries
    if (lowerMessage.includes('broker')) {
      return {
        content: '🤝 **Broker Performance Summary:**\n\n**Top Brokers (This Quarter):**\n\n1. **Aon** - Tier A\n   • 23 submissions | $8.5M GWP\n   • 82% quote rate\n   • Avg. quality score: 9.2/10\n\n2. **Willis Towers Watson** - Tier A\n   • 19 submissions | $6.8M GWP\n   • 79% quote rate\n   • Avg. quality score: 8.9/10\n\n3. **Howden Insurance** - Tier A\n   • 17 submissions | $5.2M GWP\n   • 76% quote rate\n   • Avg. quality score: 8.7/10\n\n**Recent Activity:**\n• 3 new broker relationships this month\n• Average submission quality improving (+12%)\n• Response time: 2.3 days average\n\nNeed information on a specific broker?',
        type: 'analytics'
      }
    }

    // Trends and insights
    if (lowerMessage.includes('trend') || lowerMessage.includes('insight') || lowerMessage.includes('pattern')) {
      return {
        content: '📈 **Market Trends & Insights:**\n\n**Volume Trends:**\n• Submissions up 18% vs. last month\n• Property sector leading growth (+24%)\n• Cyber insurance gaining momentum (+31%)\n\n**Pricing Trends:**\n• Property rates: +8% YoY\n• Casualty rates: +5% YoY\n• D&O rates: Softening (-3%)\n\n**Emerging Patterns:**\n🔥 **Hot Sectors:**\n• Technology/Data Centers\n• Life Sciences\n• Renewable Energy\n\n❄️ **Cooling Sectors:**\n• Traditional Manufacturing\n• Hospitality\n• Retail (physical)\n\n**Risk Appetite Shifts:**\n• Tightening on CAT-exposed properties\n• Expanding in cyber/tech E&O\n• Selective on M&A-active accounts\n\n**Recommendation:**\nFocus on tech/life sciences pipeline - high quality, strong margins.\n\nWant a detailed sector analysis?',
        type: 'analytics'
      }
    }

    // Performance metrics
    if (lowerMessage.includes('performance') || lowerMessage.includes('metrics') || lowerMessage.includes('kpi')) {
      return {
        content: '🎯 **Team Performance Metrics:**\n\n**Processing Speed:**\n• Clearance: 0.8 days avg (Target: 1 day) ✓\n• Appetite Check: 2.4 days avg (Target: 2 days) ⚠️\n• Rating: 3.2 days avg (Target: 3 days) ✓\n• Quote to Bind: 5.1 days avg (Target: 5 days) ✓\n\n**Conversion Metrics:**\n• Quote Rate: 78% (↑ 3%)\n• Bind Rate: 64% (↑ 5%)\n• Renewal Retention: 89% (↑ 2%)\n\n**Quality Metrics:**\n• Submission Completeness: 92%\n• Referral Rate: 15% (Target: <20%) ✓\n• Declined Rate: 7%\n\n**Top Performers:**\n🥇 Jeremy Isaacs - 142% of target\n🥈 Sarah Chen - 128% of target\n🥉 Alex Morgan - 119% of target\n\n**Areas for Improvement:**\n• Appetite check turnaround time\n• First-time submission quality from new brokers\n\nNeed department-specific metrics?',
        type: 'analytics'
      }
    }

    // Help and capabilities
    if (lowerMessage.includes('help') || lowerMessage.includes('what can you') || lowerMessage.includes('how do')) {
      return {
        content: '💡 **I can help you with:**\n\n**🔍 Search & Find:**\n• "Find all property submissions"\n• "Show high priority items"\n• "Search for submissions from Aon"\n\n**📊 Analytics & Reports:**\n• "Generate analytics report"\n• "Show me performance metrics"\n• "What are the current trends?"\n\n**📄 Submission Details:**\n• "Show me SOM-2024-002"\n• "Tell me about JX Research"\n• "What\'s the status of TechCorp?"\n\n**🎯 Portfolio Insights:**\n• "How many submissions do we have?"\n• "What\'s our broker performance?"\n• "Assess portfolio risk"\n\n**📈 Market Intelligence:**\n• "What sectors are trending?"\n• "Show me pricing trends"\n• "Market insights for Q4"\n\nJust ask me anything in natural language!',
        type: 'help'
      }
    }

    // Default response
    return {
      content: 'I understand you\'re asking about "' + userMessage + '". I can help with:\n\n• **Finding submissions** - Try "Find property submissions" or "Show high priority items"\n• **Analytics & reports** - Try "Generate analytics" or "Show performance metrics"\n• **Submission details** - Try "Show me SOM-2024-002"\n• **Market insights** - Try "What are the trends?"\n\nWhat specific information would you like?',
      type: 'general'
    }
  }

  const handleSend = () => {
    if (!inputValue.trim()) return

    const userMessage = {
      id: messages.length + 1,
      type: 'user',
      content: inputValue,
      timestamp: new Date()
    }

    setMessages([...messages, userMessage])
    setInputValue('')
    setIsTyping(true)

    // Simulate AI thinking time
    setTimeout(() => {
      const aiResponse = generateResponse(inputValue)
      const assistantMessage = {
        id: messages.length + 2,
        type: 'assistant',
        content: aiResponse.content,
        messageType: aiResponse.type,
        timestamp: new Date()
      }
      setMessages(prev => [...prev, assistantMessage])
      setIsTyping(false)
    }, 1000 + Math.random() * 1000)
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const quickActions = [
    { icon: Search, label: 'Find Submissions', query: 'Find high priority submissions' },
    { icon: BarChart3, label: 'Analytics', query: 'Generate analytics report' },
    { icon: TrendingUp, label: 'Trends', query: 'Show me current trends' },
    { icon: FileText, label: 'Portfolio', query: 'How many submissions do we have?' }
  ]

  const getMessageIcon = (messageType) => {
    switch (messageType) {
      case 'search': return <Search className="w-4 h-4" />
      case 'analytics': return <BarChart3 className="w-4 h-4" />
      case 'submission': return <FileText className="w-4 h-4" />
      default: return <Sparkles className="w-4 h-4" />
    }
  }

  return (
    <>
      {/* Floating Chat Button */}
      <motion.div className="fixed bottom-6 right-6 z-50">
        {/* Pulsing outer ring */}
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.4, 0.1, 0.4],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute inset-0 bg-sompo-red rounded-full"
          style={{ width: '56px', height: '56px' }}
        />

        {/* Sparkle effect */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute -top-1 -right-1 w-4 h-4"
        >
          <Sparkles className="w-4 h-4 text-sompo-red" />
        </motion.div>

        <motion.button
          animate={{
            boxShadow: [
              '0 4px 6px rgba(220, 38, 38, 0.3)',
              '0 10px 25px rgba(220, 38, 38, 0.5)',
              '0 4px 6px rgba(220, 38, 38, 0.3)',
            ]
          }}
          transition={{
            boxShadow: {
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }
          }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsOpen(!isOpen)}
          className="relative w-14 h-14 bg-gradient-to-br from-sompo-red via-red-600 to-sompo-dark-red text-white rounded-full flex items-center justify-center transition-all"
        >
          <AnimatePresence mode="wait">
            {isOpen ? (
              <motion.div
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
              >
                <X className="w-6 h-6" />
              </motion.div>
            ) : (
              <motion.div
                key="open"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
              >
                <MessageCircle className="w-6 h-6" />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>

        {/* AI Badge */}
        {!isOpen && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute -top-2 -left-2 px-2 py-0.5 bg-gradient-to-r from-sompo-red to-red-600 text-white text-[10px] font-bold rounded-full shadow-lg border-2 border-white flex items-center gap-1"
          >
            <Sparkles className="w-2.5 h-2.5 animate-pulse" />
            AI
          </motion.div>
        )}
      </motion.div>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-24 right-6 z-50 w-96 h-[600px] bg-white rounded-2xl shadow-2xl border border-gray-200 flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-sompo-red to-sompo-dark-red text-white p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-semibold">Saira AI Assistant</h3>
                  <p className="text-xs opacity-90">Powered by Saira</p>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            {messages.length === 1 && (
              <div className="p-4 border-b border-gray-200 bg-gray-50">
                <p className="text-xs text-gray-600 mb-2 font-medium">Quick Actions:</p>
                <div className="grid grid-cols-2 gap-2">
                  {quickActions.map((action, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        setInputValue(action.query)
                        setTimeout(() => handleSend(), 100)
                      }}
                      className="flex items-center gap-2 p-2 bg-white border border-gray-200 rounded-lg hover:border-sompo-red hover:bg-sompo-red/5 transition-colors text-left"
                    >
                      <action.icon className="w-4 h-4 text-sompo-red flex-shrink-0" />
                      <span className="text-xs font-medium text-gray-700">{action.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl p-3 ${
                      message.type === 'user'
                        ? 'bg-sompo-red text-white'
                        : 'bg-gray-100 text-gray-900'
                    }`}
                  >
                    {message.type === 'assistant' && message.messageType && (
                      <div className="flex items-center gap-2 mb-2 text-sompo-red">
                        {getMessageIcon(message.messageType)}
                        <span className="text-xs font-semibold uppercase tracking-wide">
                          {message.messageType}
                        </span>
                      </div>
                    )}
                    <p className="text-sm whitespace-pre-line">{message.content}</p>
                    <p className={`text-xs mt-1 ${message.type === 'user' ? 'text-white/70' : 'text-gray-500'}`}>
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </motion.div>
              ))}

              {/* Typing Indicator */}
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex justify-start"
                >
                  <div className="bg-gray-100 rounded-2xl p-3 flex items-center gap-2">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                    <span className="text-xs text-gray-500">Saira is thinking...</span>
                  </div>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 border-t border-gray-200 bg-white">
              <div className="flex gap-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask me anything..."
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-sompo-red focus:border-transparent"
                />
                <button
                  onClick={handleSend}
                  disabled={!inputValue.trim() || isTyping}
                  className="px-4 py-2 bg-sompo-red text-white rounded-xl hover:bg-sompo-dark-red transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default AIAssistant
