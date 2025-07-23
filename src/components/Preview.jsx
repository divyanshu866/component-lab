import React from "react";

const Preview = ({ finalHtml }) => {
  return (
    <div
      className="flex w-[50%] h-full justify-center items-center border border-neutral-600"
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
