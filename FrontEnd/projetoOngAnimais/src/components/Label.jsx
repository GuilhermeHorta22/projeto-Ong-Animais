function Label ({ children, className = "", ...props})
{
    return(
        <label {...props} className={`block  font-medium mb-0 select-none ${className || "text-stone-50"}`} >
            {children}
        </label>
    );
}

export default Label;