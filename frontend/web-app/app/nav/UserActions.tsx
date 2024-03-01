'use client'

import {Dropdown} from "flowbite-react";
import Link from "next/link";
import {User} from "next-auth";
import {HiCog, HiUser} from "react-icons/hi2";
import {AiFillCar, AiFillTrophy, AiOutlineLogout} from "react-icons/ai";
import {signOut} from "next-auth/react";
type Props = {
    user: Partial<User>
}
export default function UserActions({user}: Props) {
    return (
        <Dropdown label={`Welcome ${user.name}`} dismissOnClick={false}>
            <Dropdown.Item icon={HiUser}>
                <Link href='/'>My Auctions</Link>
            </Dropdown.Item>
            <Dropdown.Item icon={AiFillTrophy}>
                <Link href=''>Auctions Won</Link>
            </Dropdown.Item>
            <Dropdown.Item icon={AiFillCar}>
                <Link href='/auctions/create'>Sell my car</Link>
            </Dropdown.Item>
            <Dropdown.Item icon={HiCog}>
                <Link href='/session'>Session (dev only)</Link>
            </Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item icon={AiOutlineLogout} onClick={() => signOut({callbackUrl: '/'})}>
                Sign out
            </Dropdown.Item>
        </Dropdown>
    )
}