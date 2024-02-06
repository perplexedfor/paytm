import {Appbar} from "../components/Appbar"
import {Balance} from "../components/Balance"
import {Users} from "../components/Users"
export const Dashboard = () =>{
    return <div className="flex flex-col mt-4 mx-2">
        <div className="">
            <Appbar/>
        </div>
        <div className=" mx-4">
            <Balance/>
        </div>
        <div className=" mx-4">
            <Users/>
        </div>
    </div>
}