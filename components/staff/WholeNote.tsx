import React, { FC } from 'react'
import { StaffNoteColor } from '../../types/staff'
import { joinClassNames } from '../../utils/componentHelper'
import styles from './WholeNote.module.scss'

type WholeNoteProps = {
    isDisplayed?: boolean
    color?: StaffNoteColor
}

const WholeNote: FC<WholeNoteProps> = ({
    isDisplayed = false,
    color,
}) => {
    return isDisplayed
    ? (
        <div className={joinClassNames(styles.wholeNote, color && styles[color])}>
            <div />
        </div>
    )
    : null
}

export default WholeNote
