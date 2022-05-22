import React, { FC } from 'react'
import { KEYS } from '../../utils/constants'
import styles from './Staff.module.scss'
import { Key } from '../../types/piano'
import { getReversedArray, getSubArray } from '../../utils/arrayHelper'

type Clef = typeof CLEFS[keyof typeof CLEFS]

type Position = typeof POSITIONS[keyof typeof POSITIONS]

type StaffProps = {
    clef: Clef
}

const CLEFS = {
    TREBLE: 'treble',
    BASS: 'bass',
} as const

const CLEF_INTERVALS = {
    [CLEFS.BASS]: ['A0', 'C4'],
    [CLEFS.TREBLE]: ['C4', 'C8'],
} as const

const POSITIONS = {
    SPACE: 'space',
    LINE: 'line',
    LEDGER_LINE: 'ledgerLine'
} as const

const NOTES_BY_POSITION = {
    [POSITIONS.SPACE]: ['D2', 'F2', 'A2', 'C3', 'E3', 'G3', 'B3', 'D4', 'F4', 'A4', 'C5', 'E5', 'G5', 'B5'] as Key[],
    [POSITIONS.LINE]: ['G2', 'H2', 'D3', 'F3', 'A3', 'E4', 'G4', 'B4', 'D5', 'F5'] as Key[],
    [POSITIONS.LEDGER_LINE]: ['C2', 'E2', 'C4', 'A5', 'C6'] as Key[],
} as const

const getStaffNotes = (clef: Clef) =>
    getReversedArray(
        getSubArray(
            [...KEYS], CLEF_INTERVALS[clef] as [Key, Key]
        )
    ).filter(note => !note.includes('#'))

const getPosition = (key: Key) =>
    Object.values(POSITIONS).find((position: Position) => NOTES_BY_POSITION[position].includes(key))

const getPositionStyle = (key: Key) => styles[String(getPosition(key))]

const Staff: FC<StaffProps> = ({clef}) => {

    const staffNotes = getStaffNotes(clef)

    return (
        <div className={styles.staff}>
            { staffNotes
                .map(note => (
                    <div 
                        key={note} 
                        className={getPositionStyle(note)}
                    >
                        {note}
                    </div>
                ))
            }
        </div>
    )
}

export default Staff
