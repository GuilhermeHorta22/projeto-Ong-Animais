function Label ({ children, ...props })
{
    return(
        <label {...props} className="block text-slate-700 font-medium mb-2 select-none" >
            {children}
        </label>
    );
}

export default Label;