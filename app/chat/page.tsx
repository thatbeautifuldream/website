'use client';
import { useChat } from '@ai-sdk/react';
import { CopyIcon, RefreshCcwIcon } from 'lucide-react';
import { useState } from 'react';
import {
  Conversation,
  ConversationContent,
  ConversationScrollButton,
} from '@/components/ai-elements/conversation';

const SUGGESTED_PROMPTS = [
  "Tell me about Milind's experience",
  "What projects has Milind worked on?",
  "What are Milind's technical skills?",
  "How can I contact Milind?",
];
import { Loader } from '@/components/ai-elements/loader';
import {
  Message,
  MessageAction,
  MessageActions,
  MessageContent,
  MessageResponse,
} from '@/components/ai-elements/message';
import {
  PromptInput,
  PromptInputBody,
  PromptInputFooter,
  type PromptInputMessage,
  PromptInputSubmit,
  PromptInputTextarea,
  PromptInputTools,
} from '@/components/ai-elements/prompt-input';
import {
  Reasoning,
  ReasoningContent,
  ReasoningTrigger,
} from '@/components/ai-elements/reasoning';
import {
  Source,
  Sources,
  SourcesContent,
  SourcesTrigger,
} from '@/components/ai-elements/sources';

const ChatBotDemo = () => {
  const [input, setInput] = useState('');
  const { messages, sendMessage, status, regenerate } = useChat();
  const handleSubmit = (message: PromptInputMessage) => {
    const hasText = Boolean(message.text);
    const hasAttachments = Boolean(message.files?.length);
    if (!(hasText || hasAttachments)) {
      return;
    }
    sendMessage({
      text: message.text || 'Sent with attachments',
      files: message.files,
    });
    setInput('');
  };
  return (
    <div className="relative mx-auto size-full h-[83dvh] max-w-4xl sm:h-[85dvh]">
      <div className="flex h-full flex-col">
        <Conversation className="h-full">
          <ConversationContent>
            {messages.length === 0 && (
              <div className="flex h-full items-center justify-center">
                <div className="mx-auto max-w-2xl text-center">
                  <h2 className="mb-2 font-semibold text-2xl">
                    Hi, I'm Milind's AI Assistant
                  </h2>
                  <p className="mb-6 text-muted-foreground">
                    Ask me anything about Milind's work, experience, or projects
                  </p>
                  <div className="flex flex-wrap items-center justify-center gap-2">
                    {SUGGESTED_PROMPTS.map((prompt) => (
                      <button
                        className="cursor-pointer rounded-full border border-border bg-secondary/50 px-4 py-2 text-sm transition-colors hover:bg-secondary"
                        key={prompt}
                        onClick={() => setInput(prompt)}
                        type="button"
                      >
                        {prompt}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
            {messages.map((message) => (
              <div key={message.id}>
                {message.role === 'assistant' &&
                  message.parts.filter((part) => part.type === 'source-url')
                    .length > 0 && (
                    <Sources>
                      <SourcesTrigger
                        count={
                          message.parts.filter(
                            (part) => part.type === 'source-url'
                          ).length
                        }
                      />
                      {message.parts
                        .filter((part) => part.type === 'source-url')
                        .map((part, i) => (
                          <SourcesContent key={`${message.id}-${i}`}>
                            <Source
                              href={part.url}
                              key={`${message.id}-${i}`}
                              title={part.url}
                            />
                          </SourcesContent>
                        ))}
                    </Sources>
                  )}
                {message.parts.map((part, i) => {
                  switch (part.type) {
                    case 'text':
                      return (
                        <Message from={message.role} key={`${message.id}-${i}`}>
                          <MessageContent>
                            <MessageResponse>{part.text}</MessageResponse>
                          </MessageContent>
                          {message.role === 'assistant' &&
                            i === messages.length - 1 && (
                              <MessageActions>
                                <MessageAction
                                  label="Retry"
                                  onClick={() => regenerate()}
                                >
                                  <RefreshCcwIcon className="size-3" />
                                </MessageAction>
                                <MessageAction
                                  label="Copy"
                                  onClick={() =>
                                    navigator.clipboard.writeText(part.text)
                                  }
                                >
                                  <CopyIcon className="size-3" />
                                </MessageAction>
                              </MessageActions>
                            )}
                        </Message>
                      );
                    case 'reasoning':
                      return (
                        <Reasoning
                          className="w-full"
                          isStreaming={
                            status === 'streaming' &&
                            i === message.parts.length - 1 &&
                            message.id === messages.at(-1)?.id
                          }
                          key={`${message.id}-${i}`}
                        >
                          <ReasoningTrigger />
                          <ReasoningContent>{part.text}</ReasoningContent>
                        </Reasoning>
                      );
                    default:
                      return null;
                  }
                })}
              </div>
            ))}
            {status === 'submitted' && <Loader />}
          </ConversationContent>
          <ConversationScrollButton />
        </Conversation>
        <PromptInput multiple onSubmit={handleSubmit}>
          <PromptInputBody>
            <PromptInputTextarea
              onChange={(e) => setInput(e.target.value)}
              value={input}
            />
          </PromptInputBody>
          <PromptInputFooter>
            <PromptInputTools />
            <PromptInputSubmit disabled={!(input || status)} status={status} />
          </PromptInputFooter>
        </PromptInput>
      </div>
    </div>
  );
};
export default ChatBotDemo;
