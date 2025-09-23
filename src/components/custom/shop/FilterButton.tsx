import React from "react";
import { IoFilter } from "react-icons/io5";
import { Button } from "@/components/ui/button";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { toggleSidebar, setDevice } from "@/redux/slices/filterSidebarSlice";
import { DeviceType } from "@/types/device";

interface FilterButtonProps {
  view: DeviceType;
}

const FilterButton = ({ view }: FilterButtonProps) => {
  const dispatch = useAppDispatch();

  return (
    <Button
      size="lg"
      className="h-fit text-xl shadow-md border "
      onClick={() => {
        dispatch(toggleSidebar());
        view == "desktop"
          ? dispatch(setDevice("desktop"))
          : dispatch(setDevice("mobile"));
      }}
    >
      <IoFilter className="text-lg" />
      <span>Filter</span>
      <div className="px-2 py-0.5 text-xs rounded-full bg-purple-100 text-purple-600 font-semibold">
        New
      </div>
    </Button>
  );
};

export default FilterButton;
