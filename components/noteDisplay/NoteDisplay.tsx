import React, { FC } from 'react'
import { Key, Note } from '../../types/piano'
import { joinClassNames } from '../../utils/componentHelper'
import styles from './NoteDisplay.module.scss'

export type NoteDisplayColor = typeof NOTE_DISPLAY_COLORS[keyof typeof NOTE_DISPLAY_COLORS]

type NoteDisplayProps = {
    placeholder?: string
    note?: Key | Note
    color?: NoteDisplayColor
    onClick?: (...args: any[]) => void
}

export const NOTE_DISPLAY_COLORS = {
    GREEN: 'green',
    GREY: 'grey',
    RED: 'red',
} as const

const NoteDisplay: FC<NoteDisplayProps> = ({
    placeholder,
    note,
    color = 'grey',
    onClick,
}) => {
    return (
        <div className={styles.noteDisplayContainer}>
            <div 
                className={joinClassNames(styles.noteDisplay, styles[color])}
                onClick={onClick}
            >
                {note ?? placeholder}
            </div>
        </div>
    )
}

export default NoteDisplay
