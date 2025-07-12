'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

type TMessage = {
    id: string;
    role: 'user' | 'assistant';
    content: string;
    timestamp: Date;
};

type TPromptSession = {
    prompt: (text: string) => Promise<string>;
    promptStreaming: (text: string) => AsyncIterable<string>;
    destroy: () => void;
};

type TLanguageModelAPI = {
    availability: () => Promise<string>;
    create: (options?: {
        systemPrompt?: string;
        initialPrompts?: Array<{ role: string; content: string }>;
    }) => Promise<TPromptSession>;
};

declare global {
    const LanguageModel: TLanguageModelAPI;
}

const SYSTEM_PROMPT = `You are Milind's personal AI assistant. You are helpful, friendly, and professional. 

Here's comprehensive information about Milind Kumar Mishra:

**BASICS:**
- Full Name: Milind Kumar Mishra
- Role: Product Engineer
- Email: milindmishra.work@gmail.com
- Website: https://milindmishra.com
- Location: Bengaluru, Karnataka, India (BTM Layout)
- LinkedIn: https://linkedin.com/in/mishramilind
- GitHub: https://github.com/thatbeautifuldream
- Twitter: https://x.com/milindmishra_
- YouTube: https://youtube.com/milindmishra

**PROFESSIONAL SUMMARY:**
Milind is a product-focused engineer with full-stack expertise, passionate about building impactful AI, SaaS, and platform products. He has proven experience founding and leading technical initiatives, shipping scalable web applications, and optimizing UX for thousands of users. He's adept at rapid prototyping, collaborating across disciplines, and taking products from zero-to-one. Skilled in TypeScript, React/Next.js, and cloud infrastructure, with a track record of accelerating hiring, analytics, and real-time systems for startups and global teams.

**CURRENT WORK:**
- Currently working as Product Engineer at Merlin AI by Foyer (Feb 2025 - Present)
- Previously worked at SARAL - The Influencer OS (Jan 2025 - Feb 2025)
- Founded Proof-of-Skill Protocol as Founding Product Engineer (June 2024 - Dec 2024)

**KEY ACHIEVEMENTS:**
- Shipped ChatGPT Imports UI for 10,000+ users at Merlin AI
- Launched project-based chat history pages, increasing session retention by 15%
- Revamped Model Selector, boosting model adoption by 80%
- Led development of prompt enhancement feature for 2M+ users
- Built decentralized skill validation protocol at Proof-of-Skill
- Designed voting-based consensus algorithm for 150+ validators
- Scaled cloud infrastructure to support 5000+ platform actions

**TECHNICAL SKILLS:**
- Frontend: React, Next.js, TypeScript, Modern JavaScript, UI Architecture
- Product & UX: User Experience, UI/UX Design, Figma, Rapid Prototyping
- AI Integration: OpenAI APIs, AI-Driven UX, Prompt Engineering, Conversational Interfaces
- Cloud & DevOps: AWS (EC2, S3, CloudFront), GCP, CI/CD, Docker
- Collaboration: Product Management, Agile Delivery, Cross-functional Communication

**NOTABLE PROJECTS:**
1. **AI Roadmap Generator** - Web app generating personalized learning roadmaps, used by 5,600+ visitors
2. **Sideprojects Directory** - Platform for discovering open-source side projects
3. **JSON Visualizer** - Interactive tool for JSON visualization, adopted by hundreds of developers

**EDUCATION:**
- Short Term Research Program in Computer Software Engineering at National Yang Ming Chiao Tung University, Taiwan (2023)
- Bachelor of Engineering in Electronics and Communication from Visvesvaraya Technological University (2018-2022)

**RECENT TALKS:**
- "Building Real-Time Applications with Reactive Databases" at React Play x React Bangalore Meetup (May 2025)
- "AI for React Developers" at React Bangalore Meetup (April 2025)

**CERTIFICATIONS:**
- Next.js App Router Fundamentals (Vercel)
- Animations on the Web (animations.dev)
- AI for React Developers (LinkedIn Learning)
- React: Design Patterns & State Management (LinkedIn Learning)

You should be conversational and assist with coding questions, general tech topics, productivity, and answer any questions about Milind's background, experience, skills, and projects. Keep responses concise but informative, and feel free to reference specific details from his experience when relevant.`;

export const ChatInterface = () => {
    const [messages, setMessages] = useState<TMessage[]>([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [apiAvailable, setApiAvailable] = useState<boolean | null>(null);
    const [session, setSession] = useState<TPromptSession | null>(null);
    const [isStreaming, setIsStreaming] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = useCallback(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, []);

    const initializeSession = useCallback(async () => {
        console.log('🔍 [DEBUG] Initializing session...');
        try {
            if (typeof LanguageModel === 'undefined') {
                console.log(
                    '❌ [DEBUG] LanguageModel not available in initializeSession'
                );
                return;
            }

            console.log('🔍 [DEBUG] Creating session with system prompt...');
            const newSession = await LanguageModel.create({
                initialPrompts: [{ role: 'system', content: SYSTEM_PROMPT }],
            });
            console.log('✅ [DEBUG] Session created successfully:', newSession);
            setSession(newSession);
        } catch (error) {
            console.error('❌ [DEBUG] Session initialization failed:', error);
        }
    }, []);

    const checkApiAvailability = useCallback(async () => {
        console.log('🔍 [DEBUG] Starting API availability check...');

        try {
            // Check if LanguageModel exists
            console.log(
                '🔍 [DEBUG] LanguageModel exists:',
                typeof LanguageModel !== 'undefined'
            );
            if (typeof LanguageModel === 'undefined') {
                console.log('❌ [DEBUG] LanguageModel is not available');
                setApiAvailable(false);
                return;
            }

            // Check availability
            console.log('🔍 [DEBUG] Checking LanguageModel availability...');
            const availability = await LanguageModel.availability();
            console.log('🔍 [DEBUG] Availability response:', availability);

            const isReady = availability === 'available';
            console.log('🔍 [DEBUG] Is API ready?', isReady);

            setApiAvailable(isReady);

            if (isReady) {
                console.log('✅ [DEBUG] API is ready, initializing session...');
                await initializeSession();
            } else {
                console.log('⚠️ [DEBUG] API not ready. Status:', availability);
                if (availability === 'downloadable') {
                    console.log('📥 [DEBUG] Model needs to be downloaded');
                } else if (availability === 'downloading') {
                    console.log('⏳ [DEBUG] Model is currently downloading');
                }
            }
        } catch (error) {
            console.error('❌ [DEBUG] Error during API availability check:', error);
            setApiAvailable(false);
        }
    }, [initializeSession]);

    useEffect(() => {
        // Debug browser and environment info
        console.log('🔍 [DEBUG] Browser info:', {
            userAgent: navigator.userAgent,
            isChrome: /Chrome/.test(navigator.userAgent),
            chromeVersion: navigator.userAgent.match(/Chrome\/(\d+)/)?.[1],
            platform: navigator.platform,
        });

        checkApiAvailability();
    }, [checkApiAvailability]);

    // useEffect(() => {
    //     scrollToBottom();
    // }, [messages, scrollToBottom]);

    const handleSendMessage = async () => {
        if (!(input.trim() && session) || isLoading) {
            return;
        }

        const userMessage: TMessage = {
            id: Date.now().toString(),
            role: 'user',
            content: input.trim(),
            timestamp: new Date(),
        };

        setMessages((prev) => [...prev, userMessage]);
        setInput('');
        setIsLoading(true);
        setIsStreaming(true);

        try {
            const assistantMessage: TMessage = {
                id: (Date.now() + 1).toString(),
                role: 'assistant',
                content: '',
                timestamp: new Date(),
            };

            setMessages((prev) => [...prev, assistantMessage]);

            console.log('🔍 [DEBUG] Starting streaming...');
            const stream = session.promptStreaming(userMessage.content);
            let fullResponse = '';
            let chunkCount = 0;

            for await (const chunk of stream) {
                chunkCount++;
                console.log(`🔍 [DEBUG] Chunk ${chunkCount}:`, chunk);
                console.log('🔍 [DEBUG] Chunk length:', chunk.length);

                // According to Chrome docs, each chunk contains the full response so far
                // But from logs it appears to be incremental, so let's handle both cases
                if (chunk.length > fullResponse.length) {
                    // Chunk contains full response so far (expected behavior)
                    fullResponse = chunk;
                } else {
                    // Chunk is incremental content (what we're actually seeing)
                    fullResponse += chunk;
                }

                console.log('🔍 [DEBUG] Full response length:', fullResponse.length);
                console.log(
                    '🔍 [DEBUG] Full response preview:',
                    fullResponse.substring(0, 50) + '...'
                );

                setMessages((prev) =>
                    prev.map((msg) =>
                        msg.id === assistantMessage.id
                            ? { ...msg, content: fullResponse }
                            : msg
                    )
                );
            }

            console.log(`🔍 [DEBUG] Streaming complete. Total chunks: ${chunkCount}`);
            console.log('🔍 [DEBUG] Final response:', fullResponse);
            console.log('🔍 [DEBUG] Final response length:', fullResponse.length);

            // Ensure final response is persisted in state
            if (fullResponse) {
                console.log('🔍 [DEBUG] Setting final response in state');
                setMessages((prev) =>
                    prev.map((msg) =>
                        msg.id === assistantMessage.id
                            ? { ...msg, content: fullResponse }
                            : msg
                    )
                );
            } else {
                console.log('❌ [DEBUG] No final response to set!');
            }
        } catch {
            const errorMessage: TMessage = {
                id: (Date.now() + 2).toString(),
                role: 'assistant',
                content: 'Sorry, I encountered an error. Please try again.',
                timestamp: new Date(),
            };
            setMessages((prev) => [...prev, errorMessage]);
        } finally {
            setIsLoading(false);
            setIsStreaming(false);
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    const clearChat = () => {
        setMessages([]);
    };

    if (apiAvailable === null) {
        return (
            <div className="flex h-64 items-center justify-center">
                <div className="h-8 w-8 animate-spin rounded-full border-foreground border-b-2" />
            </div>
        );
    }

    if (apiAvailable === false) {
        return (
            <div className="rounded-lg border border-amber-200 bg-amber-50 p-4 dark:border-amber-800 dark:bg-amber-950">
                <h3 className="font-medium text-amber-800 dark:text-amber-200">
                    Chrome Built-in AI Not Available
                </h3>
                <div className="mt-2 text-amber-700 text-sm dark:text-amber-300">
                    <p>To use this chat feature, you need:</p>
                    <ul className="mt-2 list-inside list-disc space-y-1">
                        <li>Chrome Dev or Canary (version 127+)</li>
                        <li>
                            Enable <code>chrome://flags/#prompt-api-for-gemini-nano</code>
                        </li>
                        <li>
                            Enable{' '}
                            <code>chrome://flags/#optimization-guide-on-device-model</code>
                        </li>
                        <li>
                            Download the model from <code>chrome://components</code>
                        </li>
                        <li>
                            Wait for model download to complete (may take several minutes)
                        </li>
                    </ul>
                    <p className="mt-2">
                        <a
                            className="text-amber-800 underline hover:text-amber-900 dark:text-amber-200 dark:hover:text-amber-100"
                            href="https://developer.chrome.com/docs/ai/built-in"
                            rel="noopener noreferrer"
                            target="_blank"
                        >
                            Learn more about Chrome's Built-in AI
                        </a>
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="flex h-[75vh] flex-col space-y-4">
            {/* Chat Messages */}
            <div className="flex-1 space-y-4 overflow-y-auto rounded-lg border bg-background p-4">
                {messages.length === 0 ? (
                    <div className="flex h-full items-center justify-center text-foreground-secondary">
                        <p>Start a conversation with Milind's AI assistant!</p>
                    </div>
                ) : (
                    messages.map((message) => (
                        <div
                            className={cn(
                                'flex',
                                message.role === 'user' ? 'justify-end' : 'justify-start'
                            )}
                            key={message.id}
                        >
                            <div
                                className={cn(
                                    'max-w-xs rounded-lg px-4 py-2 lg:max-w-md',
                                    message.role === 'user'
                                        ? 'bg-blue-600 text-white'
                                        : 'bg-secondary text-foreground'
                                )}
                            >
                                {message.role === 'assistant' ? (
                                    <div className="prose prose-sm dark:prose-invert max-w-none text-sm">
                                        <ReactMarkdown>{message.content}</ReactMarkdown>
                                    </div>
                                ) : (
                                    <p className="whitespace-pre-wrap text-sm">
                                        {message.content}
                                    </p>
                                )}
                                <p className="mt-1 text-xs opacity-70">
                                    {message.timestamp.toLocaleTimeString()}
                                </p>
                            </div>
                        </div>
                    ))
                )}
                {isStreaming && (
                    <div className="flex justify-start">
                        <div className="max-w-xs rounded-lg bg-secondary px-4 py-2 text-foreground lg:max-w-md">
                            <div className="flex items-center space-x-2">
                                <div className="animate-pulse">●</div>
                                <span className="text-sm">Thinking...</span>
                            </div>
                        </div>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className='flex flex-shrink-0 space-x-2'>
                <textarea
                    className="max-h-32 min-h-[60px] flex-1 resize-none rounded-lg border border-input bg-background px-3 py-2 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-ring"
                    disabled={isLoading}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Type your message... (Enter to send, Shift+Enter for new line)"
                    value={input}
                />
                <div className="flex flex-col space-y-2">
                    <Button
                        disabled={!input.trim() || isLoading}
                        onClick={handleSendMessage}
                        size="sm"
                    >
                        {isLoading ? 'Sending...' : 'Send'}
                    </Button>
                    <Button
                        disabled={messages.length === 0}
                        onClick={clearChat}
                        size="sm"
                        variant="outline"
                    >
                        Clear
                    </Button>
                </div>
            </div>
        </div>
    );
};
