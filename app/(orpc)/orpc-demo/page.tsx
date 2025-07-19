'use client';

import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import { Section } from '@/components/section';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { orpc } from '@/lib/orpc';

export default function OrpcDemoPage() {
    const [name, setName] = useState('');

    const helloMutation = useMutation(orpc.hello.mutationOptions({
        context: { cache: true },
    }));

    const handleClick = () => {
        if (!name.trim()) {
            return;
        }

        helloMutation.mutate({ name: name.trim() });
    };

    return (
        <div className="space-y-8">
            <Section>
                <h1 className='font-semibold text-2xl text-foreground'>ORPC Demo</h1>
                <p className="text-foreground-lighter text-sm">
                    Test the ORPC client-server communication
                </p>
            </Section>

            <Section delay={0.2}>
                <div className='space-y-4 rounded-lg border border-border/50 bg-card p-6'>
                    <div className="space-y-2">
                        <label
                            className='font-medium text-foreground text-sm'
                            htmlFor="name-input"
                        >
                            Enter your name
                        </label>
                        <Input
                            id="name-input"
                            onChange={(e) => setName(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' && name.trim()) {
                                    handleClick();
                                }
                            }}
                            placeholder="Type your name here..."
                            value={name}
                        />
                    </div>

                    <Button
                        className="w-full sm:w-auto"
                        disabled={!name.trim() || helloMutation.isPending}
                        onClick={handleClick}
                    >
                        {helloMutation.isPending ? 'Sending...' : 'Say Hello'}
                    </Button>
                </div>
            </Section>

            {helloMutation.error && (
                <Section delay={0.2}>
                    <div className="rounded-lg border border-destructive/50 bg-destructive/10 p-4">
                        <h3 className='mb-2 font-medium text-destructive text-sm'>
                            Error:
                        </h3>
                        <p className="text-destructive text-sm">
                            Failed to get response. Please try again.
                        </p>
                    </div>
                </Section>
            )}

            {helloMutation.data && (
                <Section delay={0.2}>
                    <div className="rounded-lg border border-border/50 bg-secondary/30 p-4">
                        <h3 className='mb-2 font-medium text-foreground text-sm'>
                            Response:
                        </h3>
                        <p className="text-foreground text-sm">{helloMutation.data}</p>
                    </div>
                </Section>
            )}
        </div>
    );
}
