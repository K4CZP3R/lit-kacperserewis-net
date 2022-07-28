import { css } from "lit";

export const slideUp = css`

    @keyframes slideUp {
            0% {
                transform: translateY(250px);
            }
            100% {
                transform: translateY(0px);
            }
        }

`

export const appear = css`
    @keyframes appear {
        0% {
            opacity: 0;
        }
        100% {
            opacity: 1;
        }
    }
`

export const appearSlideUp = css`
    @keyframes appearSlideUp {
        0% {
            opacity: 0;
                transform: translateY(250px);
            }
            100% {
                opacity: 1;
                transform: translateY(0px);
            }
    }
`