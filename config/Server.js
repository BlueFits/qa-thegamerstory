const apis = {
    qa: "https://qa-thegamerstory.herokuapp.com/",
    development: "http://localhost:3000",
};
export const currentENV = "qa";
export const serverURL = apis[currentENV];