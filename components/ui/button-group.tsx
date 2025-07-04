import type { ReactNode } from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface ButtonGroupItem {
    label: string | ReactNode;
    value?: string;
    onClick?: () => void;
    disabled?: boolean;
    variant?:
    | 'default'
    | 'secondary'
    | 'destructive'
    | 'outline'
    | 'ghost'
    | 'link';
}

interface ButtonGroupProps {
    items: ButtonGroupItem[];
    orientation?: 'horizontal' | 'vertical';
    className?: string;
    size?: 'sm' | 'default' | 'lg';
    variant?:
    | 'default'
    | 'secondary'
    | 'destructive'
    | 'outline'
    | 'ghost'
    | 'link';
    onItemClick?: (item: ButtonGroupItem, index: number) => void;
}

const ButtonGroup = ({
    items,
    orientation = 'horizontal',
    className,
    size = 'default',
    variant = 'default',
    onItemClick,
}: ButtonGroupProps) => {
    const isHorizontal = orientation === 'horizontal';

    const handleItemClick = (item: ButtonGroupItem, index: number) => {
        if (item.onClick) {
            item.onClick();
        }
        if (onItemClick) {
            onItemClick(item, index);
        }
    };

    return (
        <div
            className={cn(
                'inline-flex',
                isHorizontal ? 'flex-row' : 'flex-col',
                'rounded-md',
                'border border-input',
                'overflow-hidden',
                className
            )}
        >
            {items.map((item, index) => {
                const isLast = index === items.length - 1;

                return (
                    <Button
                        className={cn(
                            'relative rounded-none border-0',
                            // Horizontal orientation styling
                            isHorizontal && !isLast && 'border-input border-r',
                            // Vertical orientation styling
                            !(isHorizontal || isLast) && 'border-input border-b',
                            // Hover styling
                            'hover:z-10'
                        )}
                        disabled={item.disabled}
                        key={item.value || index}
                        onClick={() => handleItemClick(item, index)}
                        size={size}
                        variant={item.variant || variant}
                    >
                        {item.label}
                    </Button>
                );
            })}
        </div>
    );
};

export default ButtonGroup;
