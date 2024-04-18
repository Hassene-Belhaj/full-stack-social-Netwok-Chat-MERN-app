import PulseLoader  from "react-spinners/PulseLoader";
import {Div } from "../Components/Global/GlobalStyle";



function Spinner({Size}) {
  return (
          <Div  $display='flex' $jc='center' >
                <PulseLoader 
                    loading='true'
                    color="rgba(198, 198, 198, 1)"
                    margin={2}
                    size={Size || 10}
                />
          </Div>
  );
}

export default Spinner;