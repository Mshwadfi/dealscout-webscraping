import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

const navIcons = [
    {src: '/assets/icons/search.svg', alt: 'search'},
    {src: '/assets/icons/black-heart.svg', alt: 'black-heart'},
    {src: '/assets/icons/user.svg', alt: 'user'}
]
const Nav = () => {
  return (
    <header>
        <nav className='nav'>
            <Link href={'/'} className='flex items-center gap-1'>
                <Image src={'/assets/icons/logo.svg'} width={24} height={24} alt='logo' />
                <p className='nav-logo'>
                Deal<span className='text-primary'>Scout</span>
                </p>
            </Link>
            <div className='flex items-center gap-4'>
                {
                    navIcons.map((icon)=>(
                        <Image 
                        key={icon.alt}
                        src={icon.src}
                        height={24}
                        width={24}
                        alt={icon.alt}
                        className='cursor-pointer'
                        />
                    ))
                }
            </div>
        </nav>
    </header>
  )
}

export default Nav