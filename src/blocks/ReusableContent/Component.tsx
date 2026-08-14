import React from 'react'
import { RenderBlocks } from '@/blocks/RenderBlocks'
import type { ReusableBlock as ReusableBlockProps, ReusableContent } from '@/payload-types'
import { queryLayoutBlocks } from '@/app/_fetches'
import { unstable_cache } from 'next/cache'

export const ReusableBlock: React.FC<ReusableBlockProps> = async({ reusableContent, customId, bg_style, padding_top, padding_bottom }) => {
    const layoutContent = await getCachedBlocks(reusableContent);

    if (typeof layoutContent === 'object' && layoutContent !== null) {
        return (
            <div {...(customId ? { id: customId } : {})} className={`mil-${bg_style}-section mil-p-${padding_top}-${padding_bottom}`}>
                <RenderBlocks blocks={layoutContent.layout} />
            </div>
        )
    }
}

const getCachedBlocks = async (reusableContent: string | ReusableContent) => unstable_cache(queryLayoutBlocks, ['block-reusable', `block-${reusableContent}`])(reusableContent)