function Button (props) // props = proprieties 
{
    return(
        <button {...props} className="bg-slate-500 hover:bg-slate-700 text-white font-semibold py-3 px-8 rounded-xl shadow-md transition-all duration-200 transform hover:scale-105 mx-auto block" >
            {props.children}
        </button>
    );
}

export default Button;