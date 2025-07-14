import React from "react";

const Preview = ({ finalHtml }) => {
  return (
    <div
      className="flex w-[50%] justify-center items-center"
      //   dangerouslySetInnerHTML={{ __html: html }}
    >
      <iframe
        srcDoc={finalHtml}
        sandbox="allow-scripts"
        className="w-full h-full"
      />
    </div>
  );
};

export default Preview;
