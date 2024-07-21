import React from "react";
import DOMPurify from "dompurify";

const LinksRender = ({ description }: any) => {
  // Sanitize the HTML to prevent XSS attacks
  const sanitizedHtml = DOMPurify.sanitize(description);

  return (
    <div className="text-gray-200 text-sm ">
      <div dangerouslySetInnerHTML={{ __html: sanitizedHtml }} />
    </div>
  );
};

export default LinksRender;
