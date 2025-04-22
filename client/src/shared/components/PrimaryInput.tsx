import {Input} from "@/shared/components/ui/input.tsx";
import {Label} from "@/shared/components/ui/label.tsx";
import {InputHTMLAttributes, ReactNode} from "react";

interface IProps extends InputHTMLAttributes<HTMLInputElement> {
    children?: ReactNode;
    id?: string;
    error?: string;
    className?: string;
}

const PrimaryInput = ({children, id, error, ...props}: IProps) => {
    return (
        <div>
            {children && <Label className={"w-full cursor-pointer mb-2"} htmlFor={id}>{children}</Label>}
            <Input id={id} {...props}/>
            {error && <p>*{error}</p>}
        </div>
    )
}
export default PrimaryInput;
