import React from 'react'
import styles from '../styles/Footer.module.scss'

const Footer = () =>  (
    <div className={styles.footer}>&copy; {new Date().getFullYear()}</div>
)

export default Footer
