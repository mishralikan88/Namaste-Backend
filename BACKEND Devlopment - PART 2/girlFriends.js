// using ECMA Script export statement

const gfName1 = "Mrs Shalini";
export const gfName2 = "Mrs Priyanka"; // Direct Named export
export const gfName3 = "Mrs Shalini"; //  Direct Named export

// Default export
export default gfName1;

// Named exports in bulk
// export {gfName2,gfName3}

export const generateLovePercent = () => {
  return `${Math.floor(Math.random()*100)}%`;
};
