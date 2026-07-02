
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
                        <motion.img src={home} style={{height:60, width:60}} whileHover={{ y: -4 }}></motion.img>
                </button>
                <button className="menu-icon" onClick={() => props.onMenuChange('submissions')}>
                        <motion.img src={submissions} style={{height:40, width:30}} whileHover={{ y: -4 }}></motion.img>
                </button>
                <button className="menu-icon" onClick={() => props.onMenuChange('addproblem')}>
                        <motion.img src={addProblem} style={{height:40, width:40}} whileHover={{ y: -4 }}></motion.img>
                </button>
            </div>
        </main>
        </>
    )
}