import {
    IconSquareRoundedArrowRight,
    IconSearch,
    IconEyeSpark,
    IconReportAnalytics,
} from "@tabler/icons-react";

const INFO = {
    main: {
        title: "Glow",
        name: "Glow",
        email: "yihchernglin8883@gmail.com",
        logo: "../logo.png",
    },

    socials: {
        cv: "https://github.com/",
        github: "https://github.com/linarthurlin",
        linkedin: "https://www.linkedin.com/in/yih-cherng-lin-8aa404268/",
        instagram: "https://instagram.com/",
        facebook: "https://facebook.com/",
    },

    cards: [
        {
            title: "Intent-Aware Navigation",
            description:
                'The assistant doesn\'t just keyword-match—it understands user intent using natural language processing. Whether someone types "change my card" or "update billing info," it knows they mean the same thing and routes accordingly.',
            icon: IconSearch,
        },
        {
            title: "Real-Time Visual Guidance",
            description:
                'The assistant doesn\'t just keyword-match—it understands user intent using natural language processing. Whether someone types "change my card" or "update billing info," it knows they mean the same thing and routes accordingly.',
            icon: IconEyeSpark,
        },
        {
            title: "User Struggle Analytics",
            description:
                'The assistant doesn\'t just keyword-match—it understands user intent using natural language processing. Whether someone types "change my card" or "update billing info," it knows they mean the same thing and routes accordingly.',
            icon: IconReportAnalytics,
        },
    ],
};

export default INFO;
