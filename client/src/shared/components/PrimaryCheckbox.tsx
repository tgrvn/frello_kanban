import {ReactNode} from "react";
import {Checkbox} from "@/shared/components/ui/checkbox.tsx";

interface IProps {
    id: string;
    children?: ReactNode;
}

const PrimaryCheckbox = ({children, id}: IProps) => {
    return (
        <div className="flex items-center space-x-2">
            <Checkbox id={id}/>
            <label
                htmlFor={id}
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
                {children}
            </label>
        </div>
    );
}
export default PrimaryCheckbox;