import React, { FC, useState } from 'react'
import { Key } from '../../types/piano'
import { Clef, HighlightKeys, Position } from '../../types/staff'
import { getReversedArray, getSubArray } from '../../utils/arrayHelper'
import { joinClassNames } from '../../utils/componentHelper'
import { CLEF_INTERVALS, KEYS, NOTES_BY_POSITION, POSITIONS, STAFF_NOTE_COLORS } from '../../utils/constants'
import styles from './Staff.module.scss'
import WholeNote from './WholeNote'

type StaffProps = {
    clef: Clef
    highlightKeys: HighlightKeys
}

const getStaffNotes = (clef: Clef) =>
    getReversedArray(
        getSubArray(
            [...KEYS], CLEF_INTERVALS[clef] as [Key, Key]
        )
    ).filter(note => !note.includes('#'))

const getPosition = (key: Key) =>
    Object.values(POSITIONS).find((position: Position) => NOTES_BY_POSITION[position].includes(key))

const getPositionStyle = (key: Key) => styles[String(getPosition(key))]

const Staff: FC<StaffProps> = ({
    clef,
    highlightKeys,
}) => {
    const staffNotes = getStaffNotes(clef)

    const [focussedNote, setFocussedNote] = useState<Key | null>(null)
    const [selectedNote, setSelectedNote] = useState<Key | null>(null)

    return (
        <div className={styles.staff}>
            { staffNotes
                .map(note => (
                    <div 
                        key={note} 
                        className={joinClassNames(getPositionStyle(note), styles.note)}
                        onMouseEnter={() => {setFocussedNote(note)}}
                        onMouseLeave={() => {setFocussedNote(null)}}
                    >
                        <WholeNote
                            isDisplayed={[selectedNote, focussedNote].includes(note)}
                            color={(highlightKeys && note in highlightKeys && highlightKeys[note]) 
                                || STAFF_NOTE_COLORS.GRAY}
                        />
                    </div>
                ))
            }
        </div>
    )
}

export default Staff
