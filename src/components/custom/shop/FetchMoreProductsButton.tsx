import { Button } from "@/components/ui/button";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import React from "react";

const FetchMoreProductsButton = ({
  loading,
  onClick,
}: {
  loading: boolean;
  onClick: () => void;
}) => {
  return (
    <Button
      disabled={loading}
      onClick={onClick}
      variant="secondary"
      size={"lg"}
      // className="flex gap-2 items-center justify-center"
    >
      {loading ? (
        <div className="flex gap-2 items-center ">
          <AiOutlineLoading3Quarters />
          <div className="">Loading</div>
        </div>
      ) : (
        "Show More"
      )}
      {/* Show More */}
    </Button>
  );
};

export default FetchMoreProductsButton;
