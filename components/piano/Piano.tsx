import React, { Dispatch, FC, SetStateAction } from 'react'
import { Key, KeyColor, Note } from '../../types/piano'
import { KEYS } from '../../utils/constants'
import { getKeyColor, getNoteFromKey } from '../../utils/noteHelper'
import styles from './Piano.module.scss'

export type HighlightKeys = {[key in Key]: 'red' | 'green'}

export type PianoProps = {
    showNotes?: boolean
    onClick?: ((...args: Key[]) => void) | Dispatch<SetStateAction<any>>
    highlightKeys?: HighlightKeys
}

const Piano: FC<PianoProps> = ({
    showNotes,
    onClick
}) => {

    return (
        <div className={styles.pianoContainer}>
            {KEYS.map(key => (
                <div 
                    className={`${styles.key} ${styles[getKeyColor(key)]}`}
                    key={key}
                    onClick={() => onClick?.(key)}
                >
                    {showNotes && getNoteFromKey(key)}
                </div>
            ))}
        </div>
    )
}

export default Piano
