import { DeleteIcon } from "../../icons/Delete"
import { DocumentIcon } from "../../icons/Document"
import { ShareIcon } from "../../icons/Share"
import { YTICON } from "../../icons/YouTube"
import { TwitterIcon } from "../../icons/Tweet"

interface CardInterface{
    title : string,
    type : string,
    link : string
}

export function Card({title , type , link} : CardInterface){
    return <div className="bg-white rounded-md border-1 border-black shadow-md outline-slate-200 w-72 min-height-48 p-2">
        
        <div className="flex justify-between items-center m-2">
            <div className="flex items-center text-xl font-semibold  font-stretch-condensed text-black">
                <div className="text-gray-500 pr-6">
                    {type === "Youtube" ? <YTICON /> : type === "Tweet" ? <TwitterIcon /> : <DocumentIcon />}

                </div>
                {title}
            </div>
            <div className="flex items-center ">
                <div className="text-gray-500 pr-6">
                    <ShareIcon/>
                </div>
                <div className="text-gray-500">
                    <DeleteIcon/>
                </div>               
            </div>
            
        </div>
        <div className="mt-4 mb-2 ml-2 mr-2 h-fit">
            {type === "Youtube" && <iframe className="w-full h-full" src={link.replace("watch", "embed").replace("?v=","/")} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>}
            {type === "Tweet" && <blockquote className="twitter-tweet h-30">
            <a href={link.replace("x.com","twitter.com")}></a> 
            </blockquote>}
            {type === "Document" && <p className="text-blue-500 underline underline-offset-2">
                <a href={link} target="_blank" rel="noopener noreferrer">
                    {link}
                </a>
            </p>}
            
        
        </div>
        
    </div>
}