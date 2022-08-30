import { css } from 'lit';

export const textStyle = css`
    .main-text {
        font-size: 6em;
        font-weight: bold;
    }

    .sub-text {
        font-size: 3em;
    }

    .bot-text {
        font-size: 2em;
    }


     /* responsive */
     @media (max-width: 1200px) {
        .main-text {
            font-size: 5em;
        }
        .sub-text {
            font-size: 2.5em;
        }
        .bot-text {
            font-size: 1.5em;
        }
    }
    @media (max-width: 768px) {

        .main-text {
            font-size: 4em;
        }
        .sub-text {
            font-size: 2em;
        }
        .bot-text {
            font-size: 1.5em;
        }
    }
    @media (max-width: 480px) {
        .main-text {
            font-size: 3em;
        }
        .sub-text {
            font-size: 1.5em;
        }
        .bot-text {
            font-size: 1.5em;
        }
    }



`;