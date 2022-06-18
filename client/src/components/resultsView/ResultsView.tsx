import React from "react";

interface ResultsViewProps {
    result: string;
}

const ResultsView = ({ result }: ResultsViewProps) => {
    return <div>{result}</div>;
};

export default ResultsView;
