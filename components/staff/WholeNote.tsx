import React, { FC } from 'react'
import { StaffNoteColor } from '../../types/staff'
import { joinClassNames } from '../../utils/componentHelper'
import styles from './WholeNote.module.scss'

type WholeNoteProps = {
    isDisplayed?: boolean
    color?: StaffNoteColor
    isSharp?: boolean
}

const WholeNote: FC<WholeNoteProps> = ({
    isDisplayed = false,
    color,
    isSharp = false,
}) => {
    return isDisplayed
    ? (
        <div className={joinClassNames(
            styles.wholeNote,
            color && styles[color],
            isSharp && styles.sharp,
        )}>
            <div />
        </div>
    )
    : null
}

export default WholeNote
