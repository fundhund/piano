import React, { FC } from 'react'
import { KEYS } from '../../utils/constants'
import styles from './Staff.module.scss'
import { Key } from '../../types/piano'
import { getReversedArray, getSubArray } from '../../utils/arrayHelper'

type Clef = typeof CLEFS[keyof typeof CLEFS]

type StaffProps = {
    clef: Clef
}

const CLEFS = {
    TREBLE: 'treble',
    BASS: 'bass',
} as const

const CLEF_INTERVALS = {
    [CLEFS.BASS]: ['C2', 'C4'],
    [CLEFS.TREBLE]: ['C4', 'C6'],
} as const

const POSITIONS = {
    SPACE: ['']
} as const

const getStaffNotes = (clef: Clef) =>
    getReversedArray(getSubArray([...KEYS], CLEF_INTERVALS[clef] as [Key, Key]))

const Staff: FC<StaffProps> = ({clef}) => {

    const staffNotes = getStaffNotes(clef)

    return (
        <div className={styles.staff}>
            { staffNotes
                .map(note => (
                    <div 
                        key={note} 
                        className={styles.position}
                    >
                        {note}
                    </div>
                ))
            }
        </div>
    )
}

export default Staff
