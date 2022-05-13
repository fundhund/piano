import React, { Dispatch, FC, Key, SetStateAction } from 'react'
import { KeyColor, KEYS } from '../../types/piano'
import styles from './Piano.module.scss'

export type PianoProps = {
    showNotes?: boolean
    onClick?: ((...args: Key[]) => void) | Dispatch<SetStateAction<any>>
}

const getKeyColor = (key: Key & string): KeyColor => key.slice(0, key.length - 1).includes('#') ? 'black' : 'white'

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
                    {showNotes && key.slice(0, key.length - 1)}
                </div>
            ))}
        </div>
    )
}

export default Piano
