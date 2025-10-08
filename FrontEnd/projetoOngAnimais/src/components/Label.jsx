function Label ({ children, ...props })
{
    return(
        <label {...props} className="block text-stone-50 font-medium mb-2 select-none" >
            {children}
        </label>
    );
}

export default Label;