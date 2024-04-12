/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {},
    },
    plugins: [
        function ({ addUtilities }) {
            const newUtilities = {
                ".arrow": {
                    color: "gray", // Define your desired text color
                },
                ".text-blue": {
                    color: "#63d3ff",
                },
            };

            addUtilities(newUtilities, ["responsive", "hover"]);
        },
    ],
};
