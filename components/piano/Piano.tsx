import React, { Dispatch, FC, SetStateAction } from 'react'
import { Key } from '../../types/piano'
import { joinClassNames } from '../../utils/componentHelper'
import { KEYS } from '../../utils/constants'
import { getKeyColor, getNoteFromKey } from '../../utils/noteHelper'
import styles from './Piano.module.scss'

export type HighlightKeys = {[key: string]: 'green' | 'red'}

export type PianoProps = {
    showNotes?: boolean
    onClick?: ((...args: Key[]) => void) | Dispatch<SetStateAction<any>>
    highlightKeys?: HighlightKeys
}

const Piano: FC<PianoProps> = ({
    showNotes,
    onClick,
    highlightKeys,
}) => {

    return (
        <div className={styles.pianoContainer}>
            {KEYS.map(key => (
                <div 
                    className={joinClassNames(
                        styles.key,
                        styles[getKeyColor(key)],
                        highlightKeys && styles.noHover,
                        highlightKeys && key in highlightKeys && styles[highlightKeys[key]]
                    )}
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
