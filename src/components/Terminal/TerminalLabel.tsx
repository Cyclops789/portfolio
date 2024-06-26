import React from 'react'
import tw from 'twin.macro';

type Props = { children: React.ReactNode }

function TerminalLabel({ children }: Props) {
    return (
        <label htmlFor="terminal">
            <div css={tw`bg-[rgb(21,29,36)] w-full h-full cursor-text overflow-auto rounded-b-lg`}>
                {children}
            </div>
        </label>
    )
}

export default TerminalLabel;