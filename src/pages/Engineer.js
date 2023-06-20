import Sidebar from '../components/Sidebar'
import Status from '../components/Status'
import Fetchtickethook from '../customhooks/Fetchtickethook'

function Engineer(){


    const [ticket]= Fetchtickethook();
    console.log(ticket)
  

    return (
        <div>
      <Sidebar />
    
       <div>
    
          <Status ticketdetails={ticket} />

        </div>
        </div>
    )
}

export default Engineer

