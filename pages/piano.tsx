import { NextPage } from 'next'
import React, { useEffect, useRef, useState } from 'react'
import Piano, { HighlightKeys } from '../components/piano/Piano'
import Staff from '../components/staff/Staff'
import { Key } from '../types/piano'
import { KEYS } from '../utils/constants'

const PianoPage: NextPage = () => {
    
    const [currentKeys, setCurrentKeys] = useState<Key[]>([])
    const [highlightKeys, setHighlightKeys] = useState<HighlightKeys | undefined>(undefined)

    const ref = useRef<HTMLDivElement>(null)

    useEffect(() => {
        setHighlightKeys(currentKeys.reduce((acc, curr) => ({
            ...acc,
            [curr]: 'blue',
        }), {}))
    }, [currentKeys])

    const handleWheel = (e: Event)  => { e.preventDefault() }

    useEffect(() => {
        ref.current?.addEventListener('wheel', handleWheel, { passive: false })
        return () => ref.current?.removeEventListener('wheel', handleWheel)
    }, [])

    return (
        <div
            ref={ref}
            onWheel={e => {
                currentKeys[0] && setCurrentKeys([KEYS[KEYS.findIndex(key => key === currentKeys[0]) - e.deltaY / 100]])
            }}
        >
            <Staff clef="treble" />
            <Piano 
                showNotes={false}
                onClick={setCurrentKeys}
                highlightKeys={highlightKeys}
                enablePolyphony={true}
            />
            <div>
                <h1>{currentKeys.join('   ')}</h1>
            </div>
        </div>
    )
}

export default PianoPage
