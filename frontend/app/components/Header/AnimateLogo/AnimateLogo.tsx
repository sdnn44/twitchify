import Image from 'next/image'
import React from 'react'

const AnimateLogo = () => {

    const numberOfElements = 20;

    const elements = Array.from({ length: numberOfElements }, (_, index) => index);

    return (
        <div className='logo-animation-container'>
            <ul className="logo-animation">
                {elements.map(index => (
                    <li key={index}>
                        <Image
                            src="/twitch.png"
                            alt="logo"
                            width={150}
                            height={150}
                            className=""
                        />
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default AnimateLogo