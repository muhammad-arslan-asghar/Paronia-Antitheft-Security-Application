import React from 'react'

export default function Footer() {
    return (
     <footer style={{ position:'absolute',
        bottom:0,
        width:'100%',
        height:'60px',   /* Height of the footer */
        background:'#6cf'}}className="bg-dark text-white mt-5 p-4 text-center">

        Paronia Anti-theft &copy;{new Date().getFullYear()}

     </footer>      
    )
}
