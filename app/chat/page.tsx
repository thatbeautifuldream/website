import type { Metadata } from 'next';
import { ChatInterface } from '@/components/chat-interface';
import { Section } from '@/components/section';

export const metadata: Metadata = {
    title: 'Chat | Milind Mishra',
    description:
        "Chat with Milind's AI assistant powered by Chrome's on-device AI",
};

const ChatPage = () => {
    return (
        <Section>
            <div className="flex h-screen flex-col space-y-6">
                <div className="flex-shrink-0 space-y-4">
                    <h1 className="font-bold text-2xl">Chat with AI Assistant</h1>
                    {/* <p className="text-foreground-secondary">
                        This chatbot uses Chrome's on-device AI (Gemini Nano) to provide
                        privacy-friendly assistance. Your conversations stay on your device
                        and are never sent to external servers.
                    </p> */}
                </div>
                <div className='min-h-0 flex-1'>
                    <ChatInterface />
                </div>
            </div>
        </Section>
    );
};

export default ChatPage;
