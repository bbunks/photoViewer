import React from "react";

const TitleContext = React.createContext({
    name: "Photo Viewer",
    returnPath: "/",
});

export default TitleContext;
