"use client"

import * as React from "react"
import Link from "next/link"
import { CircleCheckIcon, CircleHelpIcon, CircleIcon, Facebook, Instagram, TwitterIcon } from "lucide-react"

import { useIsMobile } from "@/hooks/use-mobile"
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { Button } from "../ui/button"
import { useRouter } from "next/navigation"

const components: { title: string; href: string; description: string }[] = [
    {
        title: "User Authentication",
        href: "/docs/features/authentication",
        description:
            "Secure login and signup flow using email, OTP, or social accounts to protect user identity.",
    },
    {
        title: "Real-time Messaging",
        href: "/docs/features/messaging",
        description:
            "Instant message delivery powered by WebSockets, enabling seamless one-on-one and group conversations.",
    },
    {
        title: "Media Sharing",
        href: "/docs/features/media-sharing",
        description:
            "Send and receive images, videos, and documents instantly within any chat.",
    },
    {
        title: "Online Presence",
        href: "/docs/features/online-status",
        description:
            "Show who’s online, typing, or last seen with real-time presence indicators.",
    },
    {
        title: "Message Encryption",
        href: "/docs/features/encryption",
        description:
            "End-to-end encryption ensures all messages and files stay private and secure.",
    },
    {
        title: "Notifications",
        href: "/docs/features/notifications",
        description:
            "Get instant push and in-app alerts for new messages, mentions, or friend requests.",
    },
]


export function Navbar() {
    const isMobile = useIsMobile();
    const router = useRouter();

    return (
        <NavigationMenu viewport={isMobile} className="mx-auto p-4 border border-neutral-400 rounded-full my-4 backdrop-blur-xl shadow-md ">
            <NavigationMenuList className="flex-wrap">
                <div className="text-4xl md:mr-10 bg-linear-to-r from-pink-500 via-pink-300 to-sky-400 bg-clip-text text-transparent">
                    ChatX
                </div>
                <NavigationMenuItem className="">
                    <NavigationMenuTrigger className="text-xl">Home</NavigationMenuTrigger>
                    <NavigationMenuContent className="z-10" >
                        <ul className="grid gap-2 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                            <li className="row-span-3">
                                <NavigationMenuLink asChild>
                                    <a
                                        className="from-muted/50 to-muted flex h-full w-full flex-col justify-end rounded-md bg-linear-to-b p-4 no-underline outline-hidden transition-all duration-200 select-none focus:shadow-md md:p-6"
                                        href="/"
                                    >
                                        <div className="mb-2 text-lg font-medium sm:mt-4">
                                            ChatX
                                        </div>
                                        <p className="text-muted-foreground text-sm leading-tight">
                                            Real-time messaging made simple, fast, and secure.
                                        </p>
                                    </a>
                                </NavigationMenuLink>
                            </li>
                            <ListItem href="/docs/get-started" title="Get Started">
                                Learn how to set up ChatX and start chatting instantly.
                            </ListItem>
                            <ListItem href="/docs/features" title="Core Features">
                                Explore real-time messaging, media sharing, and notifications.
                            </ListItem>
                            <ListItem href="/docs/security" title="Security & Privacy">
                                Understand how ChatX keeps your data encrypted and protected.
                            </ListItem>
                        </ul>
                    </NavigationMenuContent>

                </NavigationMenuItem>
                <NavigationMenuItem className="">
                    <NavigationMenuTrigger className="text-xl">About us</NavigationMenuTrigger>
                    <NavigationMenuContent>
                        <ul className="grid gap-2 sm:w-[400px] md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                            {components.map((component) => (
                                <ListItem
                                    key={component.title}
                                    title={component.title}
                                    href={component.href}
                                >
                                    {component.description}
                                </ListItem>
                            ))}
                        </ul>
                    </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                    <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                        <Button 
                        variant={"outline"}
                        className="rounded-full border-neutral-500 hover:bg-black hover:text-white cursor-pointer"
                        onClick={() => router.push('/chat')}
                        >
                            Chat Now
                        </Button>
                    </NavigationMenuLink>
                </NavigationMenuItem>

                <NavigationMenuItem className="hidden md:block">
                    <NavigationMenuTrigger className="text-xl">Connect</NavigationMenuTrigger>
                    <NavigationMenuContent>
                        <ul className="grid w-[200px] gap-4">
                            <li>
                                <NavigationMenuLink asChild>
                                    <Link href="#" className="flex-row items-center gap-2">
                                        <Instagram />
                                        Instagram
                                    </Link>
                                </NavigationMenuLink>
                                <NavigationMenuLink asChild>
                                    <Link href="#" className="flex-row items-center gap-2">
                                        <TwitterIcon />
                                        Twitter
                                    </Link>
                                </NavigationMenuLink>
                                <NavigationMenuLink asChild>
                                    <Link href="#" className="flex-row items-center gap-2">
                                        <Facebook />
                                        Facebook
                                    </Link>
                                </NavigationMenuLink>
                            </li>
                        </ul>
                    </NavigationMenuContent>
                </NavigationMenuItem>
            </NavigationMenuList>
        </NavigationMenu>
    )
}

function ListItem({
    title,
    children,
    href,
    ...props
}: React.ComponentPropsWithoutRef<"li"> & { href: string }) {
    return (
        <li {...props}>
            <NavigationMenuLink asChild>
                <Link href={href}>
                    <div className="text-sm leading-none font-medium">{title}</div>
                    <p className="text-muted-foreground line-clamp-2 text-sm leading-snug">
                        {children}
                    </p>
                </Link>
            </NavigationMenuLink>
        </li>
    )
}
