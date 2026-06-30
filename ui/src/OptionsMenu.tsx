
import { motion } from 'motion/react'
import addProblem from './assets/addProblem.png'
import home from './assets/home.png'
import submissions from './assets/submissions.png'

interface MenuProps{
    onMenuChange: (opt: string) => void
 }


export default function OptionsMenu(props : MenuProps){
    return(
        <>
        <main className="main-menu">
            <div className="options-group">
                <button className="menu-icon" onClick={() => props.onMenuChange('home')}>
                        <motion.img src={home} whileHover={{ y: -4 }}></motion.img>
                </button>
                <button className="menu-icon" onClick={() => props.onMenuChange('submissions')}>
                        <motion.img src={submissions} whileHover={{ y: -4 }}></motion.img>
                </button>
                <button className="menu-icon" onClick={() => props.onMenuChange('addproblem')}>
                        <motion.img src={addProblem} whileHover={{ y: -4 }}></motion.img>
                </button>
            </div>
        </main>
        </>
    )
}