import React, { FC, useEffect, useState } from 'react'
import { Key } from '../../types/piano'
import { Clef, HighlightKeys } from '../../types/staff'
import { joinClassNames } from '../../utils/componentHelper'
import { STAFF_NOTE_COLORS } from '../../utils/constants'
import { getAllNotesInClef, getPosition, getStaffNotes, isSharp, withoutSharp } from '../../utils/staffHelper'
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

    const getMouseEvents = (note: Key) => isInteractive 
        ? {
            onMouseEnter: () => { setFocussedNote(note) },
            onMouseLeave: () => { setFocussedNote(null) },
        }
        : null

    useEffect(() => {console.log({focussedNote, selectedNote})}, [focussedNote])

    return (
        <div
            className={styles.staff}
            onWheel={e => {
                if (focussedNote && !selectedNote) {
                    const currentIndex = allNotesInClef.findIndex(note => note === focussedNote)
                    const newIndex = currentIndex + e.deltaY / 100

                    if (newIndex >= 0 && newIndex < allNotesInClef.length) {
                        setFocussedNote(allNotesInClef[newIndex])
                    }
                }
            }}
            onClick={() => {
                setSelectedNote(focussedNote)
            }}
        >
            { staffNotes
                .map(note => (
                    <div 
                        key={note} 
                        className={joinClassNames(getPositionStyle(note), styles.note)}
                        { ...getMouseEvents(note) }
                    >
                        <WholeNote
                            isDisplayed={selectedNote
                                ? withoutSharp(selectedNote) === note
                                : withoutSharp(focussedNote) === note
                            }
                            color={(highlightKeys && note in highlightKeys && highlightKeys[note]) 
                                || note === withoutSharp(selectedNote)
                                    ?  STAFF_NOTE_COLORS.BLACK
                                    :  STAFF_NOTE_COLORS.GRAY
                            }
                            isSharp={isSharp(focussedNote) || isSharp(selectedNote)}
                        />
                    </div>
                ))
            }
        </div>
    )
}

export default Staff
