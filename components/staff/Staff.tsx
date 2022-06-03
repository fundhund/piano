import React, { FC, useEffect, useRef, useState } from 'react'
import { Key } from '../../types/piano'
import { Clef, HighlightKeys } from '../../types/staff'
import { joinClassNames } from '../../utils/componentHelper'
import { STAFF_NOTE_COLORS } from '../../utils/constants'
import {
    getAllNotesInClef,
    getPosition,
    getStaffNotes,
    isSharp,
    withoutSharp,
    withSharp
} from '../../utils/staffHelper'
import styles from './Staff.module.scss'
import WholeNote from './WholeNote'

type StaffProps = {
    clef: Clef
    isInteractive?: boolean
    highlightKeys?: HighlightKeys
}

const getPositionStyle = (key: Key) => styles[String(getPosition(key))]

const Staff: FC<StaffProps> = ({
    clef,
    isInteractive = false,
    highlightKeys,
}) => {
    const allNotesInClef = getAllNotesInClef(clef)
    const staffNotes = getStaffNotes(clef)
    
    const [focussedNote, setFocussedNote] = useState<Key | null>(null)
    const [selectedNote, setSelectedNote] = useState<Key | null>(null)

    const ref = useRef<HTMLDivElement>(null)

    const getHighlightColor = (note: Key) => {
        const result = !!highlightKeys
            && (note in highlightKeys || withSharp(note) in highlightKeys)
            && (highlightKeys[note] || highlightKeys[withSharp(note)])
        return result
    }
    
    const getColor = (note: Key) => getHighlightColor(note)
        || (note === withoutSharp(selectedNote)
            ?  STAFF_NOTE_COLORS.BLACK
            :  STAFF_NOTE_COLORS.GRAY
        )

    const isDisplayed = (note: Key) => !!getHighlightColor(note) 
        || !highlightKeys && (selectedNote
            ? withoutSharp(selectedNote) === note
            : withoutSharp(focussedNote) === note
        )

    const getMouseEvents = (note: Key) => isInteractive && !highlightKeys && !selectedNote
        ? {
            onMouseEnter: () => { setFocussedNote(note) },
            onMouseLeave: () => { setFocussedNote(null) },
        }
        : null

    const isDisplayedAsSharp = (note: Key) => isSharp(focussedNote)
        || isSharp(selectedNote)
        || !!highlightKeys && withSharp(note) in highlightKeys

    const changeNote = (step: number) => {
        if (!highlightKeys && focussedNote && !selectedNote) {
        const currentIndex = allNotesInClef.findIndex(note => note === focussedNote)
        const newIndex = currentIndex + step

            if (newIndex >= 0 && newIndex < allNotesInClef.length) {
                setFocussedNote(allNotesInClef[newIndex])
            }
        }
    }

    const selectNote = () => !highlightKeys && !selectedNote && setSelectedNote(focussedNote)

    return (
        <div
            tabIndex={0}
            ref={ref}
            className={styles.staff}
            onWheel={e => {
                changeNote(Math.round(e.deltaY / 100))
            }}
            onClick={() => {
                selectNote()
            }}
            onKeyDown={e => {
                e.preventDefault()
                switch (e.key) {
                    case 'ArrowUp':
                        changeNote(-1)
                        break
                    case 'ArrowDown':
                        changeNote(1)
                        break
                    case 'Enter':
                        selectNote()
                        break
                    default:
                        return
                }
            }}
            onMouseEnter={e => {
                ref.current?.focus()
            }}
        >
            { staffNotes
                .map(note => (
                    <div 
                        key={note}
                        id={`staff_${clef}_${note}`}
                        className={joinClassNames(getPositionStyle(note), styles.note)}
                        { ...getMouseEvents(note) }
                    >
                        <WholeNote
                            note={note}
                            isDisplayed={isDisplayed(note)}
                            color={getColor(note)}
                            isSharp={isDisplayedAsSharp(note)}
                        />
                    </div>
                ))
            }
        </div>
    )
}

export default Staff
