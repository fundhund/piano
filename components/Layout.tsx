import styles from '../styles/Layout.module.scss'
import Footer from './Footer'
import Nav from './Nav'

type LayoutProps = {
    children: React.ReactNode
}

const Layout = ({ children }: LayoutProps) => {
    return (
        <div className={styles.layout}>
            <Nav />
            <main className={styles.main}>
                { children }
            </main>
            <Footer />
        </div>
    )
}

export default Layout
