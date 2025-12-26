import { useState, useEffect, useRef } from 'react';
import { MessageCircle, X, Send, User, Bot, Sparkles, Minus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface Message {
  id: string;
  role: 'user' | 'bot';
  content: string;
  timestamp: Date;
}

const FAQ_RESPONSES: Record<string, string> = {
  'wedding': "Our Wedding Photography includes full-day coverage, multiple photographers, pre-ceremony prep, and high-resolution edited images. We work discreetly to capture every special moment.",
  'pricing': "Pricing depends on the service and duration. For a detailed quote, please reach out via our contact page or let me know which service you're interested in!",
  'services': "We provide Wedding Photography, Pre-Wedding Sessions, Event Photography, Portrait sessions, and Commercial photography. Which one would you like to know more about?",
  'contact': "You can reach us through our Contact page, or by emailing us at hello@jdphotomoments.com. We're also available for a call!",
  'location': "We are based in Chennai, India, but we are happy to travel for destination weddings and events!",
  'default': "I'm here to help! You can ask about our services (Weddings, Portraits, Events), pricing, or how to contact us. How can I assist you today?"
};

const SUGGESTIONS = [
  "💍 Wedding Packages",
  "💸 Pricing details",
  "📸 Portrait sessions",
  "📞 Get in touch"
];

const SYSTEM_PROMPT = `You are JD Assistant, a helpful and professional AI representative for JD Photomoments, a premium photography studio in Chennai, India. 
JD Photomoments specializes in:
- Wedding Photography: Full-day coverage, multiple photographers, high-resolution edited images.
- Pre-Wedding Sessions & Portraits.
- Event & Commercial Photography.
Location: Based in Chennai, India (travels globally for destination weddings).
Contact: hello@jdphotomoments.com
Founders: Joseph Ramki & Esa Beaula.
Aesthetic: Luxurious, emotional, and timeless.

Guidelines:
1. Be polite, friendly, and professional.
2. Keep responses concise but helpful.
3. If asked about pricing, mention it depends on the specific project and suggest contacting via email or the contact page.
4. Maintain a "free-flow" natural conversation style.
5. Provide specific details about JD Photomoments services when asked.`;

export function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'bot',
      content: "Hi there! 👋 I'm your JD Photomoments assistant. How can I help you capture your special moments today?",
      timestamp: new Date(),
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSuggestion = (suggestion: string) => {
    setInputValue(suggestion.replace(/^[^\s]+\s/, '')); // Remove emoji
  };

  const handleSend = async (contentOverride?: string) => {
    const content = contentOverride || inputValue.trim();
    if (!content || isTyping) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: content,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    const groqKey = import.meta.env.VITE_GROQ_API_KEY;

    if (!groqKey || groqKey.includes('your_')) {
      // Simulation fallback if no API key is set
      setTimeout(() => {
        const lowerInput = userMessage.content.toLowerCase();
        let botResponse = FAQ_RESPONSES.default;

        for (const [key, response] of Object.entries(FAQ_RESPONSES)) {
          if (lowerInput.includes(key) && key !== 'default') {
            botResponse = response;
            break;
          }
        }

        const botMessage: Message = {
          id: (Date.now() + 1).toString(),
          role: 'bot',
          content: botResponse,
          timestamp: new Date(),
        };

        setMessages(prev => [...prev, botMessage]);
        setIsTyping(false);
      }, 1000);
      return;
    }

    try {
      const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${groqKey}`,
        },
        body: JSON.stringify({
          messages: [
            { role: "system", content: SYSTEM_PROMPT },
            ...messages.map(m => ({
              role: m.role === 'user' ? 'user' : 'assistant',
              content: m.content
            })),
            { role: "user", content: userMessage.content }
          ],
          model: "llama-3.3-70b-versatile",
          stream: true,
        }),
      });

      if (!response.ok) {
        throw new Error('API request failed');
      }

      const reader = response.body?.getReader();
      if (!reader) throw new Error('No reader available');

      const botMessageId = (Date.now() + 1).toString();
      const botMessage: Message = {
        id: botMessageId,
        role: 'bot',
        content: '',
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);

      const decoder = new TextDecoder();
      let fullContent = '';
      let buffer = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split('\n');
        buffer = lines.pop() || '';

        for (const line of lines) {
          const trimmedLine = line.trim();
          if (trimmedLine.startsWith('data: ') && trimmedLine !== 'data: [DONE]') {
            try {
              const jsonStr = trimmedLine.replace(/^data: /, '');
              const data = JSON.parse(jsonStr);
              const content = data.choices[0]?.delta?.content || '';
              if (content) {
                fullContent += content;
                setMessages(prev => prev.map(m =>
                  m.id === botMessageId ? { ...m, content: fullContent } : m
                ));
              }
            } catch (e) {
              console.warn('Error parsing stream line:', trimmedLine, e);
            }
          }
        }
      }
    } catch (error) {
      console.error('Chat Error:', error);
      const errorMessage: Message = {
        id: (Date.now() + 2).toString(),
        role: 'bot',
        content: "I'm having a bit of trouble connecting to my brain right now. Please try again in a moment, or email us at hello@jdphotomoments.com!",
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, errorMessage]);
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="fixed bottom-8 left-8 z-50 flex flex-col items-start lg:items-end lg:left-auto lg:right-8">
      {/* Chat Window */}
      {isOpen && (
        <div
          className={cn(
            "mb-4 w-[calc(100vw-2rem)] sm:w-[350px] bg-white/80 dark:bg-zinc-950/80 backdrop-blur-xl border border-white/20 dark:border-white/10 rounded-2xl shadow-2xl overflow-hidden transition-all duration-500 ease-in-out transform origin-bottom-right",
            isMinimized ? "h-14" : "h-[520px] flex flex-col"
          )}
        >
          {/* Header */}
          <div className="bg-zinc-900 dark:bg-zinc-900 p-4 pb-6 flex items-center justify-between border-b border-white/10 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-transparent pointer-events-none" />
            <div className="flex items-center gap-2 relative">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-primary-foreground flex items-center justify-center shadow-lg transform rotate-3 scale-110">
                <Sparkles className="h-4 w-4 text-white" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h3 className="font-bold text-white text-sm tracking-tight">JD Assistant</h3>
                  <div className="bg-primary/20 text-primary-foreground text-[8px] px-1.5 py-0.5 rounded-full font-bold uppercase tracking-widest border border-primary/30">Verified</div>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-[10px] text-zinc-400 uppercase tracking-widest font-bold">Live & Ready</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-1 relative">
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-white/60 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                onClick={() => setIsMinimized(!isMinimized)}
              >
                <Minus className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-white/60 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                onClick={() => setIsOpen(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {!isMinimized && (
            <>
              {/* Messages Area */}
              <div className="flex-1 overflow-y-auto p-5 space-y-6 bg-transparent">
                <div className="space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={cn(
                        "flex gap-4 max-w-[90%] transition-all animate-in fade-in slide-in-from-bottom-2",
                        message.role === 'user' ? "ml-auto flex-row-reverse" : ""
                      )}
                    >
                      <div className={cn(
                        "w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 mt-1 shadow-md transition-transform hover:scale-105",
                        message.role === 'user'
                          ? "bg-zinc-900 dark:bg-primary"
                          : "bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700"
                      )}>
                        {message.role === 'user' ? (
                          <User className="h-4 w-4 text-white" />
                        ) : (
                          <Sparkles className="h-4 w-4 text-primary" />
                        )}
                      </div>
                      <div className="flex flex-col gap-1">
                        <div className={cn(
                          "p-3 rounded-2xl text-[12px] leading-relaxed shadow-sm transition-all",
                          message.role === 'user'
                            ? "bg-zinc-900 text-white rounded-tr-none"
                            : "bg-white dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 border border-zinc-100 dark:border-zinc-700 rounded-tl-none"
                        )}>
                          {message.content}
                        </div>
                        <span className={cn(
                          "text-[9px] uppercase tracking-widest font-bold opacity-30 mt-1 px-1",
                          message.role === 'user' ? "text-right" : ""
                        )}>
                          {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
                {isTyping && (
                  <div className="flex gap-4 max-w-[90%] animate-pulse">
                    <div className="w-8 h-8 rounded-lg bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 flex items-center justify-center shadow-sm">
                      <Sparkles className="h-4 w-4 text-primary" />
                    </div>
                    <div className="bg-white dark:bg-zinc-800 border border-zinc-100 dark:border-zinc-700 p-3 rounded-2xl rounded-tl-none flex gap-1 items-center shadow-sm">
                      <span className="w-1 h-1 rounded-full bg-primary/40 animate-bounce" />
                      <span className="w-1 h-1 rounded-full bg-primary/40 animate-bounce [animation-delay:0.2s]" />
                      <span className="w-1 h-1 rounded-full bg-primary/40 animate-bounce [animation-delay:0.4s]" />
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} className="h-4" />
              </div>

              {/* Suggestions Chips */}
              {messages.length === 1 && (
                <div className="p-4 pt-0 flex flex-wrap gap-2 animate-in fade-in slide-in-from-bottom-2 duration-500">
                  {SUGGESTIONS.map((suggestion) => (
                    <button
                      key={suggestion}
                      onClick={() => handleSuggestion(suggestion)}
                      className="text-[10px] px-3 py-1.5 bg-white/50 dark:bg-zinc-900/50 hover:bg-primary hover:text-white border border-zinc-200 dark:border-zinc-800 rounded-full transition-all duration-300 transform hover:scale-105 hover:shadow-lg backdrop-blur-sm font-medium"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              )}

              {/* Input Area */}
              <div className="p-4 bg-white/50 dark:bg-zinc-900/50 backdrop-blur-md border-t border-zinc-200 dark:border-zinc-800">
                <div className="relative flex items-center gap-2">
                  <textarea
                    rows={1}
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        handleSend();
                      }
                    }}
                    placeholder="Describe your vision..."
                    className="flex-1 max-h-32 min-h-[44px] py-3 px-4 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl text-[12px] focus:outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary resize-none transition-all shadow-inner"
                  />
                  <Button
                    size="icon"
                    className="h-[44px] w-[44px] rounded-xl shadow-xl shrink-0 bg-primary hover:bg-primary/90 text-white transition-all transform active:scale-90 hover:scale-105"
                    onClick={() => handleSend()}
                    disabled={!inputValue.trim() || isTyping}
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
                <div className="mt-4 flex items-center justify-center gap-2 opacity-40">
                  <span className="w-8 h-px bg-zinc-400" />
                  <p className="text-[9px] uppercase tracking-[0.2em] font-black text-zinc-500">
                    Next-Gen AI Experience
                  </p>
                  <span className="w-8 h-px bg-zinc-400" />
                </div>
              </div>
            </>
          )}
        </div>
      )}

      {/* Floating Button */}
      <Button
        onClick={() => {
          setIsOpen(!isOpen);
          setIsMinimized(false);
        }}
        className={cn(
          "rounded-[20px] w-14 h-14 p-0 shadow-[0_20px_50px_rgba(0,0,0,0.3)] transition-all duration-700 transform hover:scale-110 hover:shadow-primary/30 group relative overflow-hidden",
          isOpen ? "bg-zinc-900 border border-white/20 rotate-180" : "bg-primary"
        )}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        {isOpen ? (
          <X className="h-6 w-6 text-white" />
        ) : (
          <div className="relative flex flex-col items-center">
            <MessageCircle className="h-6 w-6 text-white animate-in zoom-in-50 duration-500" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-500 border-2 border-primary rounded-full animate-pulse shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
          </div>
        )}
      </Button>
    </div>
  );
}
