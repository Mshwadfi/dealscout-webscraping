"use client";

import { useCallback, useState } from "react";
import Image from "next/image";

const ShareButton = () => {
//   const [showModal, setShowModal] = useState(false);

  const handleShare = useCallback(() => {
    if (navigator.share) {
      navigator
        .share({
          title: "Check out this product!",
          text: "I found this amazing product, take a look!",
          url: window.location.href,
        })
        .then(() => console.log("Shared successfully"))
        .catch((error) => console.error("Sharing failed", error));
    } else {
    //   setShowModal(true); // Fallback to custom modal
    }
  }, []);

  return (
    <>
      <div
        className="p-2 bg-white-200 rounded-10 cursor-pointer"
        onClick={handleShare}
      >
        <Image
          src="/assets/icons/share.svg"
          alt="share"
          width={20}
          height={20}
        />
      </div>
    </>
  );
};

export default ShareButton;
