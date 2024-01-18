// src/Components/Pages.jsx
import { loremIpsum } from 'lorem-ipsum';

const BuildPage = (index) => (
  <>
    <h3>Page {index}</h3>
    <div>
      Page {index} content: { loremIpsum({ count: 5 })}
    </div>
  </>
);

export const PageOne = () => BuildPage(1);
export const PageTwo = () => BuildPage(2);
export const PageThree = () => BuildPage(3);
export const PageFour = () => BuildPage(4);
export const PageFive = () => BuildPage(5);
