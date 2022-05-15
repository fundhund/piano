import { NextPage } from 'next'
import React, { useEffect, useState } from 'react'
import Piano, { HighlightKeys } from '../components/piano/Piano'
import { Key } from '../types/piano'

const PianoPage: NextPage = () => {
    
    const [currentNote, setCurrentNote] = useState<Key | undefined>(undefined)
    const [highlightKeys, setHighlightKeys] = useState<HighlightKeys | undefined>(undefined)

    useEffect(() => {
        setHighlightKeys({[currentNote as string]: 'blue'})
    }, [currentNote])
    
    return (
        <div>
            <Piano 
                showNotes={false}
                onClick={setCurrentNote}
                highlightKeys={highlightKeys}
            />
            <div>
                <h1>{currentNote}</h1>
            </div>
        </div>
    )
}

export default PianoPage
