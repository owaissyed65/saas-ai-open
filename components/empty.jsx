import Image from 'next/image'
import React from 'react'

const Empty = ({label}) => {
  return (
    <div className="px-20 flex flex-col justify-center items-center h-full">
        <div className="h-80 w-80 relative">
            <Image
            src="/empty.png"
            alt="image"
            fill
            />
        </div>
        <p className="text-muted-foreground text-sm">{label}</p>
    </div>
  )
}

export default Empty