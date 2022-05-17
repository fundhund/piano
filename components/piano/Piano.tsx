import React, { Dispatch, FC, SetStateAction, useEffect, useState } from 'react'
import { Key } from '../../types/piano'
import { joinClassNames } from '../../utils/componentHelper'
import { KEYS } from '../../utils/constants'
import { getKeyFromMidiCode, MIDI_COMMANDS } from '../../utils/midiHelper'
import { getKeyColor, getNoteFromKey } from '../../utils/noteHelper'
import styles from './Piano.module.scss'

export type HighlightKeys = {[key: string]: 'green' | 'red' | 'blue'}

export type PianoProps = {
    showNotes?: boolean
    onClick?: ((...args: Key[]) => void) | Dispatch<SetStateAction<any>>
    highlightKeys?: HighlightKeys
    enablePolyphony?: boolean
}

const Piano: FC<PianoProps> = ({
    showNotes,
    onClick,
    highlightKeys,
    enablePolyphony,
}) => {
    const [keys, setKeys] = useState<Key[]>([])

    const onMIDISuccess = (midiAccess: WebMidi.MIDIAccess) => {
        Array.from(midiAccess?.inputs?.values())
            .forEach(input => input.onmidimessage = getMIDIMessage)
    }
    
    const getMIDIMessage = ({ data }: any) => {
        if (data.length < 2) return
        
        const [command, note, velocity] = data
        const key = getKeyFromMidiCode(note)

        if (!enablePolyphony && command === MIDI_COMMANDS.NOTE_ON) {
            onClick?.([key])
        }

        if (enablePolyphony && [MIDI_COMMANDS.NOTE_OFF, MIDI_COMMANDS.NOTE_ON].includes(command)) {
            // console.log({data})
            // onClick?.([key])
            console.log({
                key,
                velocity,
                command,
            })
            if (command === MIDI_COMMANDS.NOTE_ON && velocity > 0) {
                setKeys(keys => Array.from(new Set([...keys, key])))
            } else {
                setKeys(keys => keys.filter(k => k !== key))
            }
        }
    }

    const onMIDIFailure = () => {
        console.error('Could not access your MIDI devices.');
    }

    useEffect(() => {
        navigator.requestMIDIAccess?.()
            .then(onMIDISuccess, onMIDIFailure)
    }, [])

    useEffect(() => {
        if (enablePolyphony) {
            onClick?.(keys)
        }
    }, [keys])

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
                    onClick={() => onClick?.([key])}
                >
                    {showNotes && getNoteFromKey(key)}
                </div>
            ))}
        </div>
    )
}

export default Piano
