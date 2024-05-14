import React from 'react'

type Props = { command: string };

function LineBreak({ command }: Props) {
    return (
        <div className="text-green-800">
            <span className="text-red-800">[</span> hamza
            <span className="text-red-800">@</span>debian  <span className="text-red-800">]</span> #
            {' '}<span className={'text-white'}>{command}</span>
        </div>
    )
}

export default LineBreak