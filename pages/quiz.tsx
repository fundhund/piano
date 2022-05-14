import { NextPage } from 'next'
import React, { useEffect, useState } from 'react'
import NoteDisplay, { NoteDisplayColor, NOTE_DISPLAY_COLORS } from '../components/noteDisplay/NoteDisplay'
import Piano, { HighlightKeys } from '../components/piano/Piano'
import { Key, Note } from '../types/piano'
import { getRandomKey } from '../utils/noteHelper'

const PianoPage: NextPage = () => {
    
    const [currentKey, setCurrentKey] = useState<Key | undefined>(undefined)
    const [selectedKey, setSelectedKey] = useState<Key | undefined>(undefined)
    const [noteDisplayColor, setNoteDisplayColor] = useState<NoteDisplayColor | undefined>(undefined)
    const [highlightKeys, setHighlightKeys] = useState<HighlightKeys | undefined>(undefined)
    const [waitForInput, setWaitForInput] = useState<boolean>(false)

    const handleNoteDisplayClick = () => {
        if (!waitForInput) {
            setCurrentKey(getRandomKey())
            setSelectedKey(undefined)
            console.log({highlightKeys})
            setHighlightKeys(undefined)
            setWaitForInput(true)
        }
    }

    const handleKeyClick = (selectedKey: Key) => {
        if (selectedKey && waitForInput) {
            setSelectedKey(selectedKey) // remove?
            // set note display color?
            
            setHighlightKeys(selectedKey === currentKey
                ? {[currentKey]: 'green'}
                : {
                    [selectedKey]: 'red',
                    [currentKey as string]: 'green',
                })
                
            setWaitForInput(false)
        }
    }

    // TODO: Check if state is needed for selected note or handle key clicked is enough
    useEffect(() => {
        setNoteDisplayColor(!selectedKey
            ? NOTE_DISPLAY_COLORS.GREY
            : selectedKey === currentKey
                ? NOTE_DISPLAY_COLORS.GREEN
                : NOTE_DISPLAY_COLORS.RED
        )
    }, [currentKey, selectedKey])
    
    return (
        <div>
            <NoteDisplay
                placeholder="Click to start"
                note={currentKey}
                color={noteDisplayColor}
                onClick={handleNoteDisplayClick}
            />
            <Piano 
                showNotes={false}
                onClick={handleKeyClick}
                highlightKeys={highlightKeys}
            />
        </div>
    )
}

export default PianoPage
