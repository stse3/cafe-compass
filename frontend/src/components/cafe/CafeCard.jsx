// UI CARD --- displays cafe name and address
import Button from "../common/Button";
import {Link} from 'react-router-dom';


export default function CafeCard({cafe}){

    return (
                <div className="flex flex-col m-3 py-3 border border-charcoal shadow shadow-md rounded rounded-xl h-32 w-auto px-6 py-4">
            <p className ="text-xl font-bold">{cafe.name}</p>
            <p className ="text-sm">{cafe.address}</p>
            <div className="flex flex-row justify-end">
            <Link to={`/cafe/${cafe.id}`}>            
            
                <Button
                    label="See more"
                    type="secondary"
                ></Button>
            </Link>

            </div>

        </div>
        
     


    )
}

