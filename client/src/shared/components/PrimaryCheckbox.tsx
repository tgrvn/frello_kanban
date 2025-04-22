import {ReactNode} from "react";
import {Checkbox} from "@/shared/components/ui/checkbox.tsx";
import {Control, Path, Controller, FieldValues} from "react-hook-form";

interface IProps<T extends FieldValues> {
    name: Path<T>;
    control: Control<T>;
    children?: ReactNode;
    error?: string;
    id?: string;
}

const PrimaryCheckbox = <T extends FieldValues>({children, error, name, id, control}: IProps<T>) => {
    return (
        <Controller
            name={name}
            control={control}
            render={({field}) => (
                <div className="flex items-center space-x-2">
                    <Checkbox id={id || name} checked={field.value} onCheckedChange={field.onChange}/>
                    <label
                        htmlFor={id || name}
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                        {children}
                    </label>

                    {error && <p>{error}</p>}
                </div>
            )}
        />

    );
}
export default PrimaryCheckbox;