import React, { useEffect, useState } from 'react'

const LoginError = ({ error }) => {
return (
        <div className='w-72 bg-red-400 flex justify-center items-center'>
            <div>
                <h1 className='text-xl'>incorrect password or email address</h1>

            </div>
        </div>
    )
}

export default LoginError