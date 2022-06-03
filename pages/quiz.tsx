import { NextPage } from 'next'
import React, { useEffect, useRef, useState } from 'react'
import NoteDisplay, { NoteDisplayColor, NOTE_DISPLAY_COLORS } from '../components/noteDisplay/NoteDisplay'
import Piano from '../components/piano/Piano'
import { HighlightKeys, Key, Note } from '../types/piano'
import { getRandomKey } from '../utils/noteHelper'

const PianoPage: NextPage = () => {
    
    const [currentKey, setCurrentKey] = useState<Key | undefined>(undefined)
    const [selectedKeys, setSelectedKeys] = useState<Key[]>([])
    const [noteDisplayColor, setNoteDisplayColor] = useState<NoteDisplayColor | undefined>(undefined)
    const [highlightKeys, setHighlightKeys] = useState<HighlightKeys | undefined>(undefined)
    const [waitForInput, setWaitForInput] = useState<boolean>(false)

    const prevSelectedKey = useRef<any>()

    const handleNoteDisplayClick = () => {
        if (!waitForInput) {
            resetQuiz()
        }
    }

    const resetQuiz = () => {
        setCurrentKey(getRandomKey())
        setSelectedKeys([])
        setHighlightKeys(undefined)
        setWaitForInput(true)
        setNoteDisplayColor(NOTE_DISPLAY_COLORS.GREY)
    }

    useEffect(() => {
        const [selectedKey] = selectedKeys
        if (prevSelectedKey.current === selectedKey) return
        if (selectedKey && waitForInput) {
            setHighlightKeys(selectedKey === currentKey
                ? {[currentKey]: 'green'}
                : {
                    [selectedKey]: 'red',
                    [currentKey as string]: 'green',
                })
            setNoteDisplayColor(!selectedKeys
            ? NOTE_DISPLAY_COLORS.GREY
            : selectedKey === currentKey
                ? NOTE_DISPLAY_COLORS.GREEN
                : NOTE_DISPLAY_COLORS.RED
            )
            setWaitForInput(false)
        }
        prevSelectedKey.current = selectedKey
    }, [selectedKeys])

    useEffect(() => {
        document.addEventListener('keydown', (e: KeyboardEvent) => {
            if (e.key === ' ') {
                e.preventDefault()
                resetQuiz()
            }
        })
    }, [])
    
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
                onClick={setSelectedKeys}
                highlightKeys={highlightKeys}
                enablePolyphony={false}
            />
        </div>
    )
}

export default PianoPage
