import { NextPage } from 'next'
import React, { useState } from 'react'
import Piano from '../components/piano/Piano'
import { Key } from '../types/piano'

const PianoPage: NextPage = () => {
    
    const [currentNote, setCurrentNote] = useState<Key | undefined>(undefined)
    
    return (
        <div>
            <Piano 
                showNotes={false}
                onClick={setCurrentNote}
            />
            <div>
                <h1>{currentNote}</h1>
            </div>
        </div>
    )
}

export default PianoPage
