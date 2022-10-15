import { FormInputLabel, Input, Group } from "./from-input.style";

const FormInput = ( {label, ...otherProps }) => {
    return (
    <Group>

        <Input 
            // instead of this > use spread operator
            // type="text" required onChange={handleChange} name="displayName" value={displayName}
            { ...otherProps }
        />
        
        {/* if label exist, then render this */}
        { label && (  
        
        <FormInputLabel
            // if value.length not zero, means it exists (=user typed sth) then I want the label to shrink
            // className={`${
            //     otherProps.value.length ? "shrink" : ""
            //     } form-input-label`}
            shrink={otherProps.value.length}>
            {label}
        </FormInputLabel>
        )}
        
    </Group>
    );
};

export default FormInput