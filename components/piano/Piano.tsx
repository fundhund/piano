import React, { Dispatch, FC, SetStateAction, useEffect } from 'react'
import { Key } from '../../types/piano'
import { joinClassNames } from '../../utils/componentHelper'
import { KEYS } from '../../utils/constants'
import { getKeyFromMidiCode } from '../../utils/midiHelper'
import { getKeyColor, getNoteFromKey } from '../../utils/noteHelper'
import styles from './Piano.module.scss'

export type HighlightKeys = {[key: string]: 'green' | 'red' | 'blue'}

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

    const onMIDISuccess = (midiAccess: WebMidi.MIDIAccess) => {
        Array.from(midiAccess?.inputs?.values())
            .forEach(input => input.onmidimessage = getMIDIMessage)
    }
    
    const getMIDIMessage = ({ data }: any) => {
        if (data.length < 2) return
        const [command, note] = data
        if (command === 144) {
            const key = getKeyFromMidiCode(note)
            onClick?.(key)
        }
    }

    const onMIDIFailure = () => {
        console.error('Could not access your MIDI devices.');
    }

    useEffect(() => {
        navigator.requestMIDIAccess?.()
            .then(onMIDISuccess, onMIDIFailure)
    }, [])

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
