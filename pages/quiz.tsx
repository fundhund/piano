import { NextPage } from 'next'
import React, { useEffect, useState } from 'react'
import NoteDisplay, { NoteDisplayColor, NOTE_DISPLAY_COLORS } from '../components/noteDisplay/NoteDisplay'
import Piano from '../components/piano/Piano'
import { Key, Note } from '../types/piano'
import { getRandomKey } from '../utils/noteHelper'

const PianoPage: NextPage = () => {
    
    const [currentNote, setCurrentNote] = useState<Key | undefined>(undefined)
    const [selectedNote, setSelectedNote] = useState<Key | undefined>(undefined)
    const [noteDisplayColor, setNoteDisplayColor] = useState<NoteDisplayColor | undefined>(undefined)

    const handleNoteDisplayClick = () => {
        setCurrentNote(getRandomKey())
        setSelectedNote(undefined)
    }

    useEffect(() => {
        setNoteDisplayColor(!selectedNote
            ? NOTE_DISPLAY_COLORS.GREY
            : selectedNote === currentNote
                ? NOTE_DISPLAY_COLORS.GREEN
                : NOTE_DISPLAY_COLORS.RED
        )
    }, [currentNote, selectedNote])
    
    return (
        <div>
            <NoteDisplay
                placeholder="Click to start"
                note={currentNote}
                color={noteDisplayColor}
                onClick={handleNoteDisplayClick}
            />
            <Piano 
                showNotes={false}
                onClick={setSelectedNote}
            />
            {selectedNote}
            {currentNote}
            {String(currentNote === selectedNote)}
            {String(!selectedNote
                    ? NOTE_DISPLAY_COLORS.GREY
                    : selectedNote === currentNote
                        ? NOTE_DISPLAY_COLORS.GREEN
                        : NOTE_DISPLAY_COLORS.RED)}
        </div>
    )
}

export default PianoPage
