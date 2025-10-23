import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { Button } from "@/components/ui/button";
import {
  selectOpenSelects,
  toggleSelect,
} from "@/redux/slices/filterSidebarSlice";
import { FaAngleDown } from "react-icons/fa";

interface Option {
  title: string;
  value: string | number;
}

interface CustomSelectProps {
  title: string;
  options: Option[];
  selectedValues: (string | number)[];
  onSelect: (value: string | number) => void;
}

export default function CustomSelect({
  title,
  options,
  selectedValues,
  onSelect,
}: CustomSelectProps) {
  // const isOpen = useAppSelector(selectIsSelectOpen);
  const dispatch = useAppDispatch();
  const openSelects = useAppSelector(selectOpenSelects);

  // check if THIS select is open
  const isOpen = openSelects.includes(title);

  const handleToggleOpen = () => {
    dispatch(toggleSelect(title)); // title = unique identifier for this select
  };

  return (
    <div className="w-full">
      <Button
        onClick={handleToggleOpen}
        size={"lg"}
        className="w-full flex items-center justify-between hover:bg-accent/50  rounded-lg transition-colors"
      >
        <span className="text-lg font-bold text-primary-foreground">
          {title}
        </span>

        <FaAngleDown
          size={6}
          className={` transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
        />
      </Button>

      {isOpen && (
        <div className="flex flex-wrap gap-6 py-3 mb-4">
          {options.map((option: Option) => (
            <Button
              key={option.value}
              className=" px-6"
              variant={
                selectedValues.includes(option.value) ? "secondary" : "default"
              }
              onClick={() => onSelect(option.value)}
            >
              {option.title}
            </Button>
          ))}
        </div>
      )}
    </div>
  );
}
