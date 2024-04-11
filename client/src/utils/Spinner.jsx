import PulseLoader  from "react-spinners/PulseLoader";
import { Container, Div } from "../Components/Global/GlobalStyle";



function Spinner({Size}) {
  return (
      // <Container $height='calc(100vh-60px)'> 
          <Div  $display='flex' $jc='center' >
                <PulseLoader 
                    loading='true'
                    color="rgba(191, 198, 190, 1)"
                    margin={2}
                    size={Size || 10}
                />
          </Div>
      // </Container>       
  );
}

export default Spinner;