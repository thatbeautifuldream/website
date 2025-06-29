'use client';

import { CheckIcon, CopyIcon } from 'lucide-react';
import type { ReactNode } from 'react';
import { useState } from 'react';
import { cn } from '@/lib/utils';

type CodeBlockProps = {
    readonly children: ReactNode;
    readonly className?: string;
    readonly title?: string;
    readonly showCopyButton?: boolean;
};

export const CodeBlock = ({
    children,
    className,
    title,
    showCopyButton = false,
}: CodeBlockProps) => {
    const [copied, setCopied] = useState(false);

    const copyToClipboard = async () => {
        if (!children || typeof children !== 'object') {
            return;
        }

        // Extract text content from the code element
        const codeElement = (children as { props?: { children?: unknown } })?.props?.children;
        let textContent = '';

        if (typeof codeElement === 'string') {
            textContent = codeElement;
        } else if (Array.isArray(codeElement)) {
            textContent = codeElement
                .map((child) =>
                    typeof child === 'string' ? child : (child as { props?: { children?: string } })?.props?.children || ''
                )
                .join('');
        } else if (typeof codeElement === 'object' && codeElement && 'props' in codeElement) {
            textContent = (codeElement as { props: { children?: string } }).props.children || '';
        }

        try {
            await navigator.clipboard.writeText(textContent.trim());
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch {
            // Silently fail if clipboard API is not available
        }
    };

    return (
        <div className='group relative'>
            <pre className={cn('shiki', className)} title={title}>
                {children}
            </pre>
            {showCopyButton && (
                <button
                    aria-label="Copy code to clipboard"
                    className={cn(
                        'absolute top-6 right-2 rounded-md p-2 transition-all duration-200',
                        'bg-secondary/50 hover:bg-secondary',
                        'border border-border/50 hover:border-border',
                        'opacity-0 group-hover:opacity-100',
                        'focus:opacity-100 focus:outline-none focus:ring-2 focus:ring-border'
                    )}
                    onClick={copyToClipboard}
                    type="button"
                >
                    {copied ? (
                        <CheckIcon className="text-green-500" size={14} />
                    ) : (
                        <CopyIcon
                            className="text-foreground-lighter hover:text-foreground"
                            size={14}
                        />
                    )}
                </button>
            )}
        </div>
    );
};
