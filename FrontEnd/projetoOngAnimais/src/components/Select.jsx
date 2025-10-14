function Select({ className="", ...props})
{
    return (
        <select {...props} className={`${className || "bg-stone-100 text-stone-900 border border-white-800 outline-slate-400 px-4 py-2 rounded-md w-full"}`}>
            {props.children}
        </select>
    );
}

export default Select;