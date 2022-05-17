import { NextPage } from 'next'
import React, { useEffect, useState } from 'react'
import Piano, { HighlightKeys } from '../components/piano/Piano'
import { Key } from '../types/piano'

const PianoPage: NextPage = () => {
    
    const [currentKeys, setCurrentKeys] = useState<Key[]>([])
    const [highlightKeys, setHighlightKeys] = useState<HighlightKeys | undefined>(undefined)

    useEffect(() => {
        setHighlightKeys(currentKeys.reduce((acc, curr) => ({
            ...acc,
            [curr]: 'blue',
        }), {}))
    }, [currentKeys])
    
    return (
        <div>
            <Piano 
                showNotes={false}
                onClick={setCurrentKeys}
                highlightKeys={highlightKeys}
                enablePolyphony={true}
            />
            <div>
                <h1>{currentKeys.join('   ')}</h1>
            </div>
        </div>
    )
}

export default PianoPage
