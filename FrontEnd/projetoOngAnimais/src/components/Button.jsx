function Button (props) // props = proprieties 
{
    return(
        <button {...props} className="bg-slate-600 p-2 rounded-md text-white" >
            {props.children}
        </button>
    );
}

export default Button;