"use client";

import { cn } from "@/lib/utils";
import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";

const Lottie = dynamic(() => import("lottie-react"), { ssr: false });

const InfiniteMovingCards = ({
    items = [],
    direction = "left",
    speed = "fast",
    pauseOnHover = true,
    className
}) => {
    const containerRef = React.useRef(null);
    const scrollerRef = React.useRef(null);

    useEffect(() => {
        addAnimation();
    }, []);
    const [start, setStart] = useState(false);
    function addAnimation() {
        if (containerRef.current && scrollerRef.current) {
            const scrollerContent = Array.from(scrollerRef.current.children);

            scrollerContent.forEach((item) => {
                const duplicatedItem = item.cloneNode(true);
                if (scrollerRef.current) {
                    scrollerRef.current.appendChild(duplicatedItem);
                }
            });

            getDirection();
            getSpeed();
            setStart(true);
        }
    }
    const getDirection = () => {
        if (containerRef.current) {
            if (direction === "left") {
                containerRef.current.style.setProperty("--animation-direction", "forwards");
            } else {
                containerRef.current.style.setProperty("--animation-direction", "reverse");
            }
        }
    };
    const getSpeed = () => {
        if (containerRef.current) {
            if (speed === "fast") {
                containerRef.current.style.setProperty("--animation-duration", "20s");
            } else if (speed === "normal") {
                containerRef.current.style.setProperty("--animation-duration", "40s");
            } else {
                containerRef.current.style.setProperty("--animation-duration", "80s");
            }
        }
    };

    return (
        <div
            ref={containerRef}
            className={cn(
                "scroller absolute left-0 z-20 max-w-[40vw] overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)] perspective-[800px]",
                className
            )}
        >
            <ul
                ref={scrollerRef}
                className={cn(
                    "flex min-w-full shrink-0 gap-4 py-4 w-max flex-nowrap",
                    start && "animate-scroll",
                    pauseOnHover && "hover:[animation-play-state:paused]"
                )}
            >
                {items.map((item, idx) => (
                    <Card key={idx} item={item} index={idx} totalItems={items.length}/>
                ))}
            </ul>
        </div>
    );
};

const Card = ({ item,index,totalItems}) => {
    const [animationData, setAnimationData] = useState(null);

    useEffect(() => {
        const loadAnimation = async () => {
            const response = await fetch(item.animation);
            const data = await response.json();
            setAnimationData(data);
        };

        loadAnimation();
    }, [item.animation]);


    return (
        <li
            className="w-[280px] h-[350px] md:w-[350px] md:h-[400px] max-w-full relative rounded-2xl border border-b-0 flex-shrink-0 border-slate-700 px-6 py-6 md:px-6 md:py-8"
            style={{
                background: "linear-gradient(180deg, var(--slate-800), var(--slate-900))",
                transform: `rotateY(${index % 2 === 0 ? "15deg" : "-15deg"})`, // Alternate rotation
                transformOrigin: "center",
            }}
        >
            <blockquote>
                <div className="relative z-20 text-sm leading-[1.6] text-gray-100 font-normal">
                    {item.quote}
                </div>
                <div className="relative z-20 mt-6 flex flex-row items-center">
                    <span className="flex flex-col gap-1">
                        <span className="text-sm leading-[1.6] text-gray-400 font-normal">
                            {item.name}
                        </span>
                    </span>
                </div>
                {animationData && (
                    <div className="w-[10vw] h-[10vw] mt-4">
                        <Lottie animationData={animationData} loop autoplay />
                    </div>
                )}
            </blockquote>
        </li>
    );
};


export default InfiniteMovingCards; 
