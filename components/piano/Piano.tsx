import React, { FC } from 'react'
import styles from './Piano.module.scss'

type PianoProps = {
    showNotes?: boolean
}

type KeyColor = 'black' | 'white'

const getKeyColor = (key: string): KeyColor => key.slice(0, key.length - 1).includes('#') ? 'black' : 'white'

const Piano: FC<PianoProps> = ({
    showNotes
}) => {

    const keys = ['C3', 'C#3', 'D3', 'D#3', 'E3', 'F3', 'F#3', 'G3']

    return (
        <div className={styles.pianoContainer}>
            {keys.map(key => (
                <div 
                    className={`${styles.key} ${styles[getKeyColor(key)]}`}
                    key={key}
                >
                    {showNotes && key.slice(0, key.length - 1)}
                </div>
            ))}
        </div>
    )
}

export default Piano
