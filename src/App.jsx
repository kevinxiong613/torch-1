import { useState } from "react";
import { useEffect } from "react";

import "tailwindcss/tailwind.css";

function App() {
    const [typedText, setTypedText] = useState("");
    const fullText1 = "Hello everybody!";
    const fullText2 = "My name is Kevin Xiong.";

    useEffect(() => {
        // Use effect to check if the typedText is equal to either "|" or "Hello everybody!|"
        if (typedText === "" || typedText === "Hello everybody!") {
            // Add CSS classes to either have an opacity animation or not
            document.getElementById("cursor").classList.add("fading-text");
        } else if (typedText === "My name is Kevin Xiong.") {
            document.getElementById("cursor").classList.remove("fading-text");
            document.getElementById("cursor").classList.add("empty-text");
        } else {
            document.getElementById("cursor").classList.remove("fading-text");
        }
    }, [typedText]);

    useEffect(() => {
        setTimeout(() => {
            typeText(fullText1, 0, () => {
                deleteText(fullText1, () => {
                    typeText(fullText2, 2, () => {
                        // All text typed and deleted, do any final cleanup here
                    });
                });
            });
        }, 2000);
    }, []);

    const typeText = (text, i, onComplete) => {
        let currentIndex = 0;
        const interval = setInterval(() => {
            setTypedText(text.substring(0, currentIndex)); // Set the typed text as we type it out
            currentIndex++; // Increase the index to add next time
            if (currentIndex > text.length) {
                clearInterval(interval); // End typing interval
                console.log(i);
                if (i === 2) {
                    // Manually get rid of the cursor once we're done
                    setTypedText(fullText2);
                }
                setTimeout(onComplete, 1000); // Schedule deletion after typing is finished, it will call the deleteText function in the useEffect, but wait a bit first
            }
        }, 50); // Adjust typing speed here, does the code inside setInterval in intervals of ms of whatever is set here
    };

    const deleteText = (text, onComplete) => {
        let currentIndex = text.length;
        const interval = setInterval(() => {
            setTypedText(text.substring(0, currentIndex)); // Set the text to be deleted
            currentIndex--; // Decrease the index to remove text
            if (currentIndex === -1) {
                clearInterval(interval); // End deletion interval
                setTimeout(onComplete, 1000); // Schedule next action after deletion is finished, it will call the typeText method in the useEffect, but wait a bit
            }
        }, 50); // Adjust deleting speed here
    };

    return (
        <>
            <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white">
                <img
                    src={"cropped.png"}
                    className="content-center mb-4"
                    alt="Profile"
                    width="400"
                    height="500"
                />
                <div className="text-center">
                    <h1 className="text-3xl">
                        <span className="arrow">&lt;</span>
                        <span className="text-blue">h1</span>
                        <span className="arrow">&gt;</span>
                        {typedText}
                        <span id="cursor" className="">
                            |
                        </span>
                        <span className="arrow">&lt;</span>
                        <span className="text-blue">h1</span>
                        <span className="arrow">&gt;</span>
                    </h1>
                </div>
            </div>
        </>
    );
}

export default App;
