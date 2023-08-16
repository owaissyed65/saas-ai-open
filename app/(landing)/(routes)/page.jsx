import { Button } from '@/components/ui/button'
import React from 'react'
import Link from "next/link"
const HomePage = () => {
  return (
    <div>HomePage(unprotected)
      <Link href="/sign-in">
      <Button>
        Signin
      </Button>
      </Link>
    </div>
  )
}

export default HomePage