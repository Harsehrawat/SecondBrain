
interface InputProps{
    placeholder : string,
    ref? : any
}

export const Input=( props : InputProps)=>{
    return <div>
        <input type="text" placeholder={props.placeholder} ref={props.ref} className="px-4 py-2 border rounded-xl m-2" />
    </div>
}