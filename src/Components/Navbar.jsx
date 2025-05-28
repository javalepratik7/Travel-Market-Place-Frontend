import React from 'react'
import { NavLink } from 'react-router-dom'
import { UserRound, ShoppingCart } from 'lucide-react';
import { useAppSelector } from '../../Redux/hooks';

function Navbar() {
    const log = useAppSelector((state) => state.auth)

    return (
        <>

            <div className="min-h-10 max-w-full flex flex-col font-sans bg-[#f8faf0] ">
                <div className="container mx-auto py-4 px-4 flex justify-between items-center">
                    <NavLink to='/'>
                        <div className="flex items-center">
                            <div className="mr-2 text-2xl font-bold flex items-center">
                                <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center text-white mr-2">
                                    ⦿
                                </div>
                                TravelMarket
                            </div>
                        </div>
                    </NavLink>

                    <div className="hidden md:flex items-center space-x-8 text-3xl ">
                        {log.isAuthenticate == false ?
                            <>
                                <NavLink className="text-sm font-medium" to="/">Home</NavLink>
                                <NavLink className="text-sm font-medium" to="/tours">Tours</NavLink>
                                <NavLink className="text-sm font-medium" to="/login">Login</NavLink>
                                <NavLink className="text-sm font-medium" to="/signin">Signin</NavLink>
                            </> :
                            <>
                                <NavLink className="text-sm font-medium" to="/">Home</NavLink>
                                <NavLink className="text-sm font-medium" to="/agentTour">Create Tours</NavLink>
                                <NavLink className="text-sm font-medium" to="/agentHistory">History</NavLink>
                                <NavLink className="text-sm font-medium" to="/login">Login</NavLink>
                            </>
                        }
                    </div>

                    <div className="flex items-center space-x-4">
                        <NavLink to="/profile">
                            <button className="bg-black text-white rounded-full px-6 py-2">Profile</button>
                        </NavLink>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Navbar
